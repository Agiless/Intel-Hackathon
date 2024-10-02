import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Replace with your SendGrid API key
SENDGRID_API_KEY = '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'

def send_email(recipient_email, subject, content):
    message = Mail(
        from_email='agilessshobika@gmail.com',  # Replace with your verified SendGrid email
        to_emails=recipient_email,
        subject=subject,
        plain_text_content=content
    )
    
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        print(f"Email sent successfully! Status Code: {response.status_code}")
    except Exception as e:
        print(f"Error sending email: {e}")

# Usage
recipient_email = "nakul10905@gmail.com"  # Replace with recipient's email
subject = "Toy Delivery!!"
content = "62 inch toy arriving soon!!!"

send_email(recipient_email, subject, content)

























