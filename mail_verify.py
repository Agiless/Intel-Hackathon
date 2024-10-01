import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

# Replace with your SendGrid API key
SENDGRID_API_KEY = 'YOUR_SENDGRID_API_KEY'

def send_email(recipient_email, subject, content):
    message = Mail(
        from_email='your_email@example.com',  # Replace with your verified SendGrid email
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
recipient_email = "recipient@example.com"  # Replace with recipient's email
subject = "Test Email from SendGrid"
content = "This is a test email sent using SendGrid."

send_email(recipient_email, subject, content)
