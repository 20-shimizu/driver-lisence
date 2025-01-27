from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select

from backend import models, schemas
from backend.crud.base import CRUDBase

class CRUDSensor(
    CRUDBase[
        models.Sensor,
        schemas.SensorResponse,
        schemas.SensorBase,
        schemas.SensorBase,
        schemas.SensorResponse,
    ]
):
    async def get_by_report_id(self, db:AsyncSession, *, report_id: int) -> models.Sensor | None:
        stmt = select(models.Sensor).where(models.Sensor.report_id == report_id)
        return (await db.execute(stmt)).scalars().first()
    
    async def get_newest_sensor_by_user_id(self, db: AsyncSession, *, user_id: int) -> models.Sensor | None:
        stmt = (
            select(models.Sensor)
            .where(models.Sensor.user_id == user_id)
            .order_by(models.Sensor.created_at.desc())  # 最新順にソート
            .limit(1)  # 最初の1件を取得
        )
        return (await db.execute(stmt)).scalars().first()

    async def create(self, db: AsyncSession, obj_in: schemas.SensorBase) -> models.Sensor:
        db_obj = models.Sensor(
            user_id=obj_in.user_id,
            started_at=obj_in.started_at,
            ended_at=obj_in.ended_at,
            milage=obj_in.milage,
            average_speed=obj_in.average_speed,
            journey_time=obj_in.journey_time,
            longest_continuous_drive=obj_in.longest_continuous_drive,
            idling_time=obj_in.idling_time,
            max_speed=obj_in.max_speed,
            acceralation_count=obj_in.acceralation_count,
            braking_count=obj_in.braking_count,
            cornering_count=obj_in.cornering_count
        )
        db.add(db_obj)
        await db.flush()
        await db.refresh(db_obj)
        return db_obj
    

sensor = CRUDSensor(
    models.Sensor,
    response_schema_class=schemas.SensorResponse,
    list_response_class=schemas.SensorPagedResponse,
)