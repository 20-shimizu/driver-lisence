from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.sql import select

from backend import models, schemas
from backend.crud.base import CRUDBase
from backend.core.utils import generate_report_comment, generate_report_category

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

    async def create(self, db: AsyncSession, obj_in: schemas.SensorResponse) -> models.Report:
        result_comment = await generate_report_comment(sensor_data=obj_in)
        result_category = await generate_report_category(report_comment=str(result_comment))
        
        db_obj = models.Report(
            user_id=obj_in.user_id,
            sensor_id=obj_in.sensor_id,
            driving_type=result_category["driving_type"],
            evaluation_status=result_category["evaluation_status"],
            overall_summary=result_comment["overall_summary"],
            acceralation_comment=result_comment["acceralation_comment"],
            braking_comment=result_comment["braking_comment"],
            cornering_comment=result_comment["cornering_comment"],
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
