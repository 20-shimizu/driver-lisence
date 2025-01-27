from fastapi import APIRouter, Depends, Security
from sqlalchemy.ext.asyncio import AsyncSession

from backend import crud, models, schemas
from backend.core.database import get_async_db
from backend.exceptions.core import APIException
from backend.exceptions.error_messages import ErrorMessage
from typing import Optional, Union

router = APIRouter()


@router.get("/users/{user_id}", response_model=Optional[list[schemas.FamilyResponse]])
async def get_families_by_user_id(
    user_id: int,
    db: AsyncSession = Depends(get_async_db),
)-> Union[list[schemas.FamilyResponse], None]:
    try: 
        families = await crud.family.get_families_by_user_id(db, user_id=user_id)
        if not families:
            return None
        family_responses = [schemas.FamilyResponse.model_validate(family) for family in families]
        return family_responses
    except Exception as e:
        raise e

@router.get("/{id}")
async def get_family(
    id: int,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.FamilyResponse:
    family = await crud.family.get_family_by_id(db, id=id)
    if not family:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    return family

@router.post("/register")
async def create_family(
    data_in: schemas.FamilyCreate,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.FamilyResponse:
    user = await crud.user.get_db_obj_by_id(db, id=data_in.user_id)
    if not user:
        raise APIException(ErrorMessage.ID_NOT_FOUND)

    family = await crud.family.get_by_family_name(db, family_name=data_in.family_name)
    if family:
        raise APIException(ErrorMessage.ALREADY_REGISTED_USER_NAME)
    return await crud.family.create(db, obj_in=data_in)

@router.put("/{id}")
async def update_family(
    id: int,
    data_in: schemas.FamilyUpdate,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.FamilyResponse:
    family = await crud.family.get_family_by_id(db, id=id)
    if not family:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    return await crud.family.update(db, db_obj=family, obj_in=data_in)

@router.delete("/{id}")
async def delete_family(
    id: int,
    db: AsyncSession = Depends(get_async_db),
) -> None:
    family = await crud.family.get_family_by_id(db, id=id)
    print(f"Deleting family: {family.family_id}")
    if not family:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    return await crud.family.delete(db, db_obj=family)
