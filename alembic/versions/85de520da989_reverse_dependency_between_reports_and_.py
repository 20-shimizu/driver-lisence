"""Reverse dependency between reports and sensors

Revision ID: 85de520da989
Revises: 0c19701b15de
Create Date: 2025-01-27 14:00:01.989823

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '85de520da989'
down_revision: Union[str, None] = '0c19701b15de'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # 既存のテーブルを削除
    op.drop_table('reports')
    op.drop_table('sensors')

    # sensors テーブルを新しいスキーマで作成
    op.create_table(
        'sensors',
        sa.Column('sensor_id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id'), nullable=False),  # user_id を追加
        sa.Column('started_at', sa.DateTime(), nullable=False),
        sa.Column('ended_at', sa.DateTime(), nullable=False),
        sa.Column('milage', sa.Integer(), nullable=False),
        sa.Column('average_speed', sa.Integer(), nullable=False),
        sa.Column('journey_time', sa.Integer(), nullable=False),
        sa.Column('longest_continuous_drive', sa.Integer(), nullable=False),
        sa.Column('idling_time', sa.Integer(), nullable=False),
        sa.Column('max_speed', sa.Integer(), nullable=False),
        sa.Column('acceralation_count', sa.Integer(), nullable=False),
        sa.Column('braking_count', sa.Integer(), nullable=False),
        sa.Column('cornering_count', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False, comment='作成日時'),
        sa.Column('updated_at', sa.DateTime(), nullable=False, comment='更新日時'),
    )

    # reports テーブルを新しいスキーマで作成
    op.create_table(
        'reports',
        sa.Column('report_id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id'), nullable=False),
        sa.Column('sensor_id', sa.Integer(), sa.ForeignKey('sensors.sensor_id'), nullable=True),
        sa.Column('driving_type', sa.Integer(), nullable=False),
        sa.Column('evaluation_status', sa.Integer(), nullable=False),
        sa.Column('overall_summary', sa.Text(), nullable=True),
        sa.Column('acceralation_comment', sa.Text(), nullable=True),
        sa.Column('braking_comment', sa.Text(), nullable=True),
        sa.Column('cornering_comment', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, comment='作成日時'),
        sa.Column('updated_at', sa.DateTime(), nullable=False, comment='更新日時'),
    )


def downgrade() -> None:
    # 既存のテーブルを削除
    op.drop_table('reports')
    op.drop_table('sensors')

    # 元の sensors テーブルを作成
    op.create_table(
        'sensors',
        sa.Column('sensor_id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('started_at', sa.DateTime(), nullable=False),
        sa.Column('ended_at', sa.DateTime(), nullable=False),
        sa.Column('milage', sa.Integer(), nullable=False),
        sa.Column('average_speed', sa.Integer(), nullable=False),
        sa.Column('journey_time', sa.Integer(), nullable=False),
        sa.Column('longest_continuous_drive', sa.Integer(), nullable=False),
        sa.Column('idling_time', sa.Integer(), nullable=False),
        sa.Column('max_speed', sa.Integer(), nullable=False),
        sa.Column('acceralation_count', sa.Integer(), nullable=False),
        sa.Column('braking_count', sa.Integer(), nullable=False),
        sa.Column('cornering_count', sa.Integer(), nullable=False),
        sa.Column('created_at', sa.DateTime(), nullable=False, comment='作成日時'),
        sa.Column('updated_at', sa.DateTime(), nullable=False, comment='更新日時'),
    )

    # 元の reports テーブルを作成
    op.create_table(
        'reports',
        sa.Column('report_id', sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column('user_id', sa.Integer(), sa.ForeignKey('users.user_id'), nullable=False),
        sa.Column('sensor_id', sa.Integer(), sa.ForeignKey('sensors.sensor_id'), nullable=True),
        sa.Column('driving_type', sa.Integer(), nullable=False),
        sa.Column('evaluation_status', sa.Integer(), nullable=False),
        sa.Column('overall_summary', sa.Text(), nullable=True),
        sa.Column('acceralation_comment', sa.Text(), nullable=True),
        sa.Column('braking_comment', sa.Text(), nullable=True),
        sa.Column('cornering_comment', sa.Text(), nullable=True),
        sa.Column('created_at', sa.DateTime(), nullable=False, comment='作成日時'),
        sa.Column('updated_at', sa.DateTime(), nullable=False, comment='更新日時'),
    )
