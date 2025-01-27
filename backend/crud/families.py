from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select

from backend import models, schemas
from backend.crud.base import CRUDBase


class CRUDFamily(
    CRUDBase[
        models.Family,
        schemas.FamilyResponse,
        schemas.FamilyCreate,
        schemas.FamilyUpdate,
        schemas.FamilyResponse,
    ]
):
    async def get_by_family_name(self, db: AsyncSession, *, family_name: str) -> models.Family | None:
        stmt = select(models.Family).where(models.Family.family_name == family_name)
        return (await db.execute(stmt)).scalars().first()
    
    async def get_families_by_user_id(self, db: AsyncSession, *, user_id: int) -> list[models.Family]:
        stmt = select(models.Family).where(models.Family.user_id == user_id)
        return (await db.execute(stmt)).scalars().all()
    
    async def get_family_by_id(self, db: AsyncSession, *, id: int) -> models.Family | None:
        stmt = select(models.Family).where(models.Family.family_id == id)
        return (await db.execute(stmt)).scalars().first()

    async def create(self, db: AsyncSession, obj_in: schemas.FamilyCreate) -> models.Family:
        db_obj = models.Family(
            family_name=obj_in.family_name,
            email=obj_in.email,
            user_id=obj_in.user_id,
        )
        db.add(db_obj)
        await db.flush()
        await db.refresh(db_obj)
        return db_obj

    async def update(  # type: ignore[override]
        self, db: AsyncSession, *, db_obj: models.Family, obj_in: schemas.FamilyUpdate
    ) -> models.Family:
        return await super().update(db, db_obj=db_obj, update_schema=obj_in)

    async def delete(self, db, *, db_obj):
        return await super().real_delete(db, db_obj=db_obj)

family = CRUDFamily(
    models.Family,
    response_schema_class=schemas.FamilyResponse,
    list_response_class=schemas.FamiliesPagedResponse,
)