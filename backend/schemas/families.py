from pydantic import ConfigDict, EmailStr
from backend.schemas.core import BaseSchema, PagingMeta
from pydantic import Field


class FamilyBase(BaseSchema):
    family_name: str = Field(..., max_length=50, description="家族・関係者名(50文字以下)")
    email: EmailStr = Field(..., max_length=50, description="メールアドレス(50文字以内)")


class FamilyCreate(FamilyBase):
    user_id: int = Field(..., description="ユーザーID")

# Properties to receive via API on update
class FamilyUpdate(FamilyBase):
    pass

class FamilyResponse(FamilyBase):
    model_config = ConfigDict(from_attributes=True)
    family_id: int = Field(alias="family_id")


class FamiliesPagedResponse(BaseSchema):
    data: list[FamilyResponse] | None
    meta: PagingMeta | None
