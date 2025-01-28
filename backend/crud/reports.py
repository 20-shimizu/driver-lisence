from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select

from backend import models, schemas
from backend.crud.base import CRUDBase

class CRUDReport(
    CRUDBase[
        models.Report,
        schemas.ReportResponse,
        schemas.ReportBase,
        schemas.ReportBase,
        schemas.ReportResponse,
    ]
):
    async def get_reports_by_user_id(self, db: AsyncSession, *, user_id: int) -> list[models.Report]:
        stmt = select(models.Report).where(models.Report.user_id == user_id)
        return (await db.execute(stmt)).scalars().all()
    
    async def get_report_by_id(self, db: AsyncSession, *, report_id: int) -> models.Report | None:
        stmt = select(models.Report).where(models.Report.report_id == report_id)
        return (await db.execute(stmt)).scalars().first()

    async def create(self, db: AsyncSession, obj_in: schemas.ReportBase) -> models.Report:
        db_obj = models.Report(
            user_id=obj_in.user_id,
            sensor_id=obj_in.sensor_id,
            driving_type=obj_in.driving_type,
            evaluation_status=obj_in.evaluation_status,
            overall_summary=obj_in.overall_summary,
            acceralation_comment=obj_in.acceralation_comment,
            braking_comment=obj_in.braking_comment,
            cornering_comment=obj_in.cornering_comment,
        )
        db.add(db_obj)
        await db.flush()
        await db.refresh(db_obj)
        return db_obj
    

report = CRUDReport(
    models.Report,
    response_schema_class=schemas.ReportResponse,
    list_response_class=schemas.ReportsPagedResponse,
)
