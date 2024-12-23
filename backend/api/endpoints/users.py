from fastapi import APIRouter, Depends, Security
from sqlalchemy.ext.asyncio import AsyncSession

from backend import crud, models, schemas
from backend.core.auth import get_current_user
from backend.core.database import get_async_db
from backend.exceptions.core import APIException
from backend.exceptions.error_messages import ErrorMessage

router = APIRouter()


@router.get("/me")
async def get_user_me(
    current_user: models.User = Depends(get_current_user),
) -> schemas.UserResponse:
    return current_user


@router.get(
    "/{id}",
    dependencies=[Security(get_current_user, scopes=["admin"])],
)
async def get_user(
    id: str,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.UserResponse:
    user = await crud.user.get_db_obj_by_id(db, id=id)
    if not user:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    return user


@router.post("")
async def create_user(
    data_in: schemas.UserCreate,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.UserResponse:
    user = await crud.user.get_by_user_name(db, user_name=data_in.user_name)
    if user:
        raise APIException(ErrorMessage.ALREADY_REGISTED_USER_NAME)
    return await crud.user.create(db, obj_in=data_in)


@router.put(
    "/{id}",
    dependencies=[Security(get_current_user, scopes=["admin"])],
)
async def update_user(
    id: str,
    data_in: schemas.UserUpdate,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.UserResponse:
    user = await crud.user.get_db_obj_by_id(db, id=id)
    if not user:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    return await crud.user.update(db, db_obj=user, obj_in=data_in)