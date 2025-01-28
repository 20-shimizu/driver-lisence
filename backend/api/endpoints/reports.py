from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from backend import crud, models, schemas
from backend.core.database import get_async_db
from backend.exceptions.core import APIException
from backend.exceptions.error_messages import ErrorMessage


router = APIRouter()

@router.get("/users/{user_id}", response_model=list[schemas.ReportResponse])
async def get_reports_by_user_id(
    user_id: int,
    db: AsyncSession = Depends(get_async_db),
) -> list[schemas.ReportResponse]:
    reports = await crud.report.get_reports_by_user_id(db, user_id=user_id)
    if not reports:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    report_responses = [schemas.ReportResponse.model_validate(report) for report in reports]
    return report_responses

@router.get("/{id}")
async def get_report(
    id: int,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.ReportResponse:
    report = await crud.report.get_report_by_id(db, report_id=id)
    if not report:
        raise APIException(ErrorMessage.ID_NOT_FOUND)
    
    print("Driving Type:", report.driving_type)
    print("Evaluation Status:", report.evaluation_status)
    return report

@router.post("")
async def create_report(
    data_in: schemas.ReportBase,
    db: AsyncSession = Depends(get_async_db),
) -> schemas.ReportResponse:
    return await crud.report.create(db, obj_in=data_in)
    