from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from .mixin import TimestampMixin

class Family(Base, TimestampMixin):
    __tablename__ = 'families'

    family_id = Column(Integer, primary_key=True, autoincrement=True)
    family_name = Column(String(50), nullable=False, unique=True)
    email = Column(String(50), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)

    user = relationship("User", back_populates="families")
