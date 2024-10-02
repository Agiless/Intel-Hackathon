import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

SENDGRID_API_KEY = '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'

def send_email(recipient_email, content, subject="Verification for mall app"):
    message = Mail(
        from_email='agilessshobika@gmail.com',  
        to_emails=recipient_email,
        subject=subject,
        plain_text_content=f"Your OPT is {content}"
    )
    
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"Email sent successfully! Status Code: {response.status_code}")
    except Exception as e:
        print(f"Error sending email: {e}")





























