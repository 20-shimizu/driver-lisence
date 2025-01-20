from fastapi import APIRouter, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
import smtplib
from email.mime.base import MIMEBase
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email import encoders

from backend import schemas
from backend.core.config import settings
from backend.exceptions.core import APIException
from backend.exceptions.error_messages import ErrorMessage

router = APIRouter()


@router.post("/send")
async def send_mail(
    email: schemas.EmailSend,
):
    msg = MIMEMultipart()
    msg["From"] = settings.MAIL_FROM
    msg["To"] = ", ".join(email.to)
    msg["Subject"] = email.subject
    msg.attach(MIMEText(email.body, "plain"))

    if email.attachment:
        attachment_file = schemas.EmailSend.validate_attachment(email.attachment)
        try:
            part = MIMEBase("application", "octet-stream")
            part.set_payload(attachment_file.file.read())
            encoders.encode_base64(part)
            part.add_header(
                "Content-Disposition",
                f"attachment; filename={attachment_file.filename}",
            )
            msg.attach(part)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"添付ファイルの処理中にエラーが発生しました: {str(e)}")

    with smtplib.SMTP(settings.MAIL_SERVER, settings.MAIL_PORT) as server:
        server.starttls()
        server.login(settings.MAIL_FROM, settings.MAIL_PASSWORD)
        server.send_message(msg)

    return {"message": "Email has been sent"}
