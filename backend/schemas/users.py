from pydantic import ConfigDict, EmailStr

from backend.schemas.core import BaseSchema, PagingMeta


class UserBase(BaseSchema):
    user_name: str | None = None
    age: int | None = None


class UserCreate(UserBase):
    password: str


# Properties to receive via API on update
class UserUpdate(UserBase):
    password: str | None = None


class UserResponse(UserBase):
    model_config = ConfigDict(from_attributes=True)
    id: str


class UsersPagedResponse(BaseSchema):
    data: list[UserResponse] | None
    meta: PagingMeta | None
