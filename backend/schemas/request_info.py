from pydantic import ConfigDict

from backend.schemas.core import BaseSchema


class RequestInfoResponse(BaseSchema):
    model_config = ConfigDict(from_attributes=True)
    ip_address: str | None
    host: str | None
