from sqlalchemy import Column, DateTime, func

class TimestampMixin:
    created_at = Column(DateTime, default=func.now(), nullable=False, comment="作成日時")
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False, comment="更新日時")
