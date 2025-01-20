from pydantic import ConfigDict, EmailStr
from datetime import datetime
from backend.schemas.core import BaseSchema, PagingMeta
from pydantic import Field

from pydantic import field_validator

class SensorBase(BaseSchema):
    report_id: int = Field(...)
    started_at: datetime = Field(...)
    ended_at: datetime = Field(...)
    milage: int = Field(..., ge=0)
    average_speed: int = Field(..., ge=0)
    journey_time: int = Field(..., ge=0)
    longest_continuous_drive: int = Field(..., ge=0)
    idling_time: int = Field(..., ge=0)
    max_speed: int = Field(..., ge=0)
    acceralation_count: int = Field(..., ge=0)
    braking_count: int = Field(..., ge=0)
    cornering_count: int = Field(..., ge=0)
    
    @field_validator("started_at", "ended_at", mode="before")
    def parse_datetime(cls, value):
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value.replace("Z", "+00:00"))
            except ValueError:
                raise ValueError(f"Invalid datetime format: {value}")
        return value

class SensorResponse(SensorBase):
    sensor_id: int
    
class SensorPagedResponse(BaseSchema):
    data: list[SensorResponse] | None
    meta: PagingMeta | None
