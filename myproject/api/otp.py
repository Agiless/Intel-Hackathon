import sys
from twilio.rest import Client

# Twilio credentials (Get these from your Twilio dashboard)
account_sid = 'AC6030c478672f5b909f62d01958ee25f0'
auth_token = '0f2ae15b65cf40ae5645e536825accbc'
client = Client(account_sid, auth_token)

def send_sms_via_twilio(to_number, message):
    message = client.messages.create(
        body=message,
        from_='+13148889310',  # Your Twilio number
        to=to_number
    )
    return message.sid

if __name__ == "__main__":
    # Get arguments passed from Node.js
    to_number = sys.argv[1]  # First argument
    message = sys.argv[2]  # Second argument

    response = send_sms_via_twilio(to_number, message)
    print(f"Message SID: {response}")
