from pydantic import EmailStr, Field
from typing import List, Optional
from fastapi import UploadFile, HTTPException
import base64
import tempfile
import imghdr

from backend.schemas.core import BaseSchema


class EmailSend(BaseSchema):
    to: List[EmailStr] = Field(...)
    subject: str = Field(..., max_length=100)
    body: str = Field(...)
    attachment: Optional[str] = Field(None)

    @staticmethod
    def validate_attachment(attachment: Optional[str]):
        if not attachment:
            return None

        # ファイルサイズ制限（例: 5MB）
        max_file_size = 5 * 1024 * 1024  # 5MB
        # 許可される拡張子
        allowed_formats = {"pdf", "png", "jpg", "jpeg", "docx", "txt"}

        try:
            # デコードしてバイナリデータを取得
            header, data = attachment.split(",", 1)
            file_data = base64.b64decode(data)

            # サイズチェック
            if len(file_data) > max_file_size:
                raise ValueError("添付ファイルのサイズは5MB以下である必要があります。")

            # MIMEタイプや拡張子を推測
            if "image" in header:
                ext = imghdr.what(None, file_data)
                if ext not in allowed_formats:
                    raise ValueError(f"添付ファイルの形式は次のいずれかである必要があります: {', '.join(allowed_formats)}")
            else:
                ext = header.split(";")[0].split("/")[-1]
                if ext not in allowed_formats:
                    raise ValueError(f"添付ファイルの形式は次のいずれかである必要があります: {', '.join(allowed_formats)}")
            
            # 一時ファイルに保存（UploadFile互換のオブジェクトとして扱う）
            temp_file = tempfile.NamedTemporaryFile(delete=False)
            temp_file.write(file_data)
            temp_file.close()

            return UploadFile(
                filename=f"decoded_file.{ext}",
                file=open(temp_file.name, "rb")
            )

        except (ValueError, base64.binascii.Error) as e:
            raise HTTPException(status_code=400, detail=str(e))
