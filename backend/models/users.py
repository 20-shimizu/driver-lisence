from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import relationship
from database import Base
from .mixin import TimestampMixin

class User(Base, TimestampMixin):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(50), nullable=False, unique=True)
    password = Column(String, nullable=False)
    age = Column(Integer, nullable=False)

    families = relationship("Family", back_populates="user")
    drive_reports = relationship("Report", back_populates="user")
