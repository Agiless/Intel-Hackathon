from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .otp import send_sms_via_twilio
from .models import User  # Import the User model
import random

@api_view(['POST'])
def create_product(request):
    name = request.data.get('name')
    mobile_number = request.data.get('mobile_number')  # Assuming 'price' is the mobile number in your current structure
    
    if not name or not mobile_number:
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
    
    # Check if the mobile number already exists in the database
    try:
        user = User.objects.get(mobile_number=mobile_number)
        # If user is found, send a "verified" response
        return Response({'response': 'verified', 'name': user.username, 'mobile_number': user.mobile_number}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        # If the mobile number doesn't exist, save the user and send OTP
        otp = random.randint(100000, 999999)
        
        # Save the new user to the database
        new_user = User(username=name, mobile_number=mobile_number)
        new_user.save()
        
        # Send OTP via Twilio
        send_sms_via_twilio(f"+91{mobile_number}", f"Your OTP is {otp}")

        # Return the response with the OTP
        return Response({'otp': otp, 'name': name, 'mobile_number': mobile_number}, status=status.HTTP_201_CREATED)
