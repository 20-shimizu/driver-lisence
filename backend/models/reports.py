from sqlalchemy import Column, Integer, Text, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from .mixin import TimestampMixin

class Report(Base, TimestampMixin):
    __tablename__ = 'reports'

    report_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    driving_type = Column(Integer, nullable=False)  # ENUM候補
    evaluation_status = Column(Integer, nullable=False)  # ENUM候補
    overall_summary = Column(Text)
    acceralation_comment = Column(Text)
    braking_comment = Column(Text)
    cornering_comment = Column(Text)

    user = relationship("User", back_populates="drive_reports")
    drive_sensor_data = relationship("Sensor", back_populates="report")
