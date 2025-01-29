import socket
from dotenv import load_dotenv
from datetime import datetime
import os, json

import ulid
from fastapi import Request
from backend.core.prompt.prompts import SYSTEM_PROMPT_COMMENT, SYSTEM_PROMPT_ENUM
from backend.schemas import SensorResponse
from openai import OpenAI

load_dotenv()

client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

def get_ulid() -> str:
    return ulid.new().str


def get_request_info(request: Request) -> str:
    return request.client.host


def get_host_by_ip_address(ip_address: str) -> str:
    return socket.gethostbyaddr(ip_address)[0]


async def generate_report_comment(client=client, *,sensor_data: SensorResponse) -> dict:
    values = {
        "急加速回数": sensor_data.acceralation_count,
        "急ブレーキ回数": sensor_data.braking_count,
        "急ハンドル回数": sensor_data.cornering_count,
        "運転開始時刻": sensor_data.started_at.strftime("%Y/%m/%d-%H:%M") if isinstance(sensor_data.started_at, datetime) else sensor_data.started_at,
        "運転終了時刻": sensor_data.ended_at.strftime("%Y/%m/%d-%H:%M") if isinstance(sensor_data.ended_at, datetime) else sensor_data.ended_at,
        "総運転距離": sensor_data.milage,
        "平均走行速度": sensor_data.average_speed,
        "総運転時間": sensor_data.journey_time,
        "最大連続運転時間": sensor_data.longest_continuous_drive,
        "アイドリング時間": sensor_data.idling_time,
        "最高速度": sensor_data.max_speed,
    }

    formatted_prompt = SYSTEM_PROMPT_COMMENT.format(**values)
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "developer", "content": formatted_prompt}
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "report_comment_schema",
                "schema": {
                    "type": "object",
                    "properties": {
                        "acceralation_comment": {
                            "description": "急加速に関するコメント",
                            "type": "string"
                        },
                        "braking_comment": {
                            "description": "急ブレーキに関するコメント",
                            "type": "string"
                        },
                        "cornering_comment": {
                            "description": "急ハンドルに関するコメント",
                            "type": "string"
                        },
                        "overall_summary": {
                            "description": "全体のコメント",
                            "type": "string"
                        }
                    }
                }

            }
        }
    )
    
    return json.loads(completion.choices[0].message.content)
    
async def generate_report_category(client=client, *, report_comment: str) -> dict:
    formatted_prompt = SYSTEM_PROMPT_ENUM.format(result=report_comment)
    completion = client.chat.completions.create(
        model="gpt-4o",
        messages=[
            {"role": "developer", "content": formatted_prompt}
        ],
        response_format={
            "type": "json_schema",
            "json_schema": {
                "name": "type_and_eval_schema",
                "schema": {
                    "type": "object",
                    "properties": {
                        "driving_type": {
                            "description": "ユーザーの運転タイプ分類",
                            "type": "integer"
                        },
                        "evaluation_status": {
                            "description": "ユーザーの運転全体に関する評価結果",
                            "type": "integer"
                        }
                    }
                }

            }
        }
    )
    
    return json.loads(completion.choices[0].message.content)
