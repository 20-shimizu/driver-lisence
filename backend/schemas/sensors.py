from pydantic import ConfigDict, EmailStr
from datetime import datetime
from backend.schemas.core import BaseSchema, PagingMeta
from pydantic import Field

from pydantic import field_validator

class SensorBase(BaseSchema):
    report_id: int
    started_at: datetime
    ended_at: datetime
    milage: int
    average_speed: int
    journey_time: int
    longest_continuous_drive: int
    idling_time: int
    max_speed: int
    acceralation_count: int
    braking_count: int
    cornering_count: int
    
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
