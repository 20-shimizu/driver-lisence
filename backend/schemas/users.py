from pydantic import ConfigDict, EmailStr

from backend.schemas.core import BaseSchema, PagingMeta
from pydantic import Field


class UserBase(BaseSchema):
    user_name: str = Field(..., max_length=50, description="ユーザー名(50文字以下)")
    age: int = Field(..., ge=18, le=100, description="年齢(18歳以上100歳以下)")


class UserCreate(UserBase):
    password: str = Field(..., min_length=8, description="パスワード(8文字以上)")


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: str = Field(..., min_length=8, description="パスワード(8文字以上)")


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    user_id: int = Field(alias="user_id")


class UsersPagedResponse(BaseSchema):
    data: list[UserResponse] | None
    meta: PagingMeta | None
