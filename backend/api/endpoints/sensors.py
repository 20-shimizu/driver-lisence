from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend import crud, models, schemas
from backend.core.database import get_async_db
from backend.exceptions.core import APIException
from backend.exceptions.error_messages import ErrorMessage


router = APIRouter()

@router.get("/{report_id}")
async def get_sensor(
    report_id: int,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.SensorResponse:
    sensor = await crud.sensor.get_by_report_id(db, report_id=report_id)
    if not sensor:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    return sensor

@router.post("")
async def create_sensor(
    data_in: schemas.SensorBase,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.SensorResponse:
    return await crud.sensor.create(db, obj_in=data_in)
    