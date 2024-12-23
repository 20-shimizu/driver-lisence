from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text, func
from sqlalchemy.orm import relationship
from database import Base

class TimestampMixin:
    created_at = Column(DateTime, default=func.now(), nullable=False, comment="作成日時")
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False, comment="更新日時")

# Usersテーブル
class User(Base, TimestampMixin):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    user_name = Column(String(50), nullable=False, unique=True)
    password = Column(String, nullable=False)
    age = Column(Integer, nullable=False)

    families = relationship("Family", back_populates="user")
    drive_reports = relationship("DriveReport", back_populates="user")

# Familiesテーブル
class Family(Base, TimestampMixin):
    __tablename__ = 'families'

    family_id = Column(Integer, primary_key=True, autoincrement=True)
    family_name = Column(String(50), nullable=False, unique=True)
    email = Column(String(50), nullable=False, unique=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)

    user = relationship("User", back_populates="families")

# Reportsテーブル
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

    user = relationship("User", back_populates="reports")
    drive_sensor_data = relationship("Sensor", back_populates="report")

# Sensorsテーブル
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

    drive_report = relationship("Report", back_populates="sensor")
