from pydantic import ConfigDict, Field, field_validator
from backend.schemas.core import BaseSchema, PagingMeta
from enum import Enum
from typing import Optional

class ReportDrivingType(int, Enum):
    RAPID_ACCELERATION_DECELERATION = 1  # 急加速・急減速
    SUDDEN_STEERING = 2  # 急ハンドル
    SPEEDING = 3  # 速度超過
    LOW_SPEED = 4  # 速度低
    SHORT_FOLLOWING_DISTANCE = 5  # 車間距離不足

class ReportEvaluationStatus(int, Enum):
    SAFE = 1  # 安全
    WARNING = 2  # 警告

class ReportBase(BaseSchema):
    user_id: int = Field(..., description="ユーザーID")
    driving_type: ReportDrivingType = Field(..., description="運転タイプ（ENUMの候補）")
    evaluation_status: ReportEvaluationStatus = Field(..., description="評価ステータス（ENUMの候補）")
    overall_summary: Optional[str] = Field(None, description="レポートの全体的な概要")
    acceralation_comment: Optional[str] = Field(None, description="加速に関するコメント")
    braking_comment: Optional[str] = Field(None, description="ブレーキに関するコメント")
    cornering_comment: Optional[str] = Field(None, description="コーナリングに関するコメント")

class ReportResponse(ReportBase):
    model_config = ConfigDict(from_attributes=True)
    
    @field_validator("driving_type", mode="before")
    @classmethod
    def validate_driving_type(cls, value):
        if isinstance(value, int):
            return ReportDrivingType(value)
        return value
    
    @field_validator("evaluation_status", mode="before")
    @classmethod
    def validate_evaluation_status(cls, value):
        if isinstance(value, int):
            return ReportEvaluationStatus(value)
        return value

class ReportsPagedResponse(BaseSchema):
    data: list[ReportResponse] | None
    meta: PagingMeta | None
