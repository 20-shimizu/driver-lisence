from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select

from backend import models, schemas
from backend.core.auth import get_password_hash, verify_password
from backend.crud.base import CRUDBase


class CRUDUser(
    CRUDBase[
        models.User,
        schemas.UserResponse,
        schemas.UserCreate,
        schemas.UserUpdate,
        schemas.UserResponse,
    ]
):
    async def get_by_user_name(self, db: AsyncSession, *, user_name: str) -> models.User | None:
        stmt = select(models.User).where(models.User.user_name == user_name)
        return (await db.execute(stmt)).scalars().first()

    async def create(self, db: AsyncSession, obj_in: schemas.UserCreate) -> models.User:
        db_obj = models.User(
            # email=obj_in.email,
            user_name=obj_in.user_name,
            password=get_password_hash(obj_in.password),
            age=obj_in.age,
        )
        db.add(db_obj)
        await db.flush()
        await db.refresh(db_obj)
        return db_obj

    async def update(  # type: ignore[override]
        self, db: AsyncSession, *, db_obj: models.User, obj_in: schemas.UserUpdate
    ) -> models.User:
        if obj_in.password:
            hashed_password = get_password_hash(obj_in.password)
            db_obj.password = hashed_password
        return await super().update(db, db_obj=db_obj, update_schema=obj_in)

    async def authenticate(self, db: AsyncSession, *, user_name: str, password: str) -> models.User | None:
        user = await self.get_by_user_name(db, user_name=user_name)
        if not user:
            return None
        if not verify_password(password, user.password):
            return None
        return user


user = CRUDUser(
    models.User,
    response_schema_class=schemas.UserResponse,
    list_response_class=schemas.UsersPagedResponse,
)
