from sqlalchemy import Column, Integer, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from database import Base
from .mixin import TimestampMixin

class Sensor(Base, TimestampMixin):
    __tablename__ = 'sensors'

    sensor_id = Column(Integer, primary_key=True, autoincrement=True)
    report_id = Column(Integer, ForeignKey('reports.report_id'), nullable=False)
    started_at = Column(DateTime, nullable=False)
    ended_at = Column(DateTime, nullable=False)
    milage = Column(Integer, nullable=False)
    average_speed = Column(Integer, nullable=False)
    journey_time = Column(Integer, nullable=False)
    longest_continuous_drive = Column(Integer, nullable=False)
    idling_time = Column(Integer, nullable=False)
    max_speed = Column(Integer, nullable=False)
    acceralation_count = Column(Integer, nullable=False)
    braking_count = Column(Integer, nullable=False)
    cornering_count = Column(Integer, nullable=False)

    report = relationship("Report", back_populates="drive_sensor_data")
