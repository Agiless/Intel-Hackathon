from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .otp import send_sms_via_twilio
from .mail_verify import send_email
from .models import User, Seller  # Import the User and Seller models
import random

@api_view(['POST'])
def create_product(request):
    name = request.data.get('name')
    mobile_number = request.data.get('mobile_number')  # Fixed variable names
    
    if not name or not mobile_number:
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)
    
    try:
        # Check if the mobile number already exists
        user = User.objects.get(mobile_number=mobile_number)
        return Response({'response': 'verified', 'name': user.username, 'mobile_number': user.mobile_number}, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        # If mobile number doesn't exist, create a new User and send OTP
        otp = random.randint(100000, 999999)
        new_user = User(username=name, mobile_number=mobile_number)
        new_user.save()
        
        # Send OTP via Twilio
        send_sms_via_twilio(f"+91{mobile_number}", f"Your OTP is {otp}")
        
        return Response({'otp': otp, 'name': name, 'mobile_number': mobile_number}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def create_shop(request):
    owner_name = request.data.get("owner_name")  # Fixed to match 'name' in Seller model
    shop_domain = request.data.get("shop_domain")  # Fixed to match 'domain' in Seller model
    shop_contact_number = request.data.get("shop_contact_number")
    shop_description = request.data.get("shop_description")
    email = request.data.get("email")
    gst_id = request.data.get("gst_id")

    # Validate required fields
    if not owner_name or not shop_domain or not shop_contact_number or not shop_description or not email or not gst_id:
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)

    # Check if email already exists in the Seller model
    try:
        seller = Seller.objects.get(email=email)
        return Response({'response': 'verified',"name":seller.name}, status=status.HTTP_200_OK)
    except Seller.DoesNotExist:
        # Generate OTP and save new seller
        otp = random.randint(100000, 999999)
        new_seller = Seller(
            name=owner_name,
            domain=shop_domain,
            mobile_number=shop_contact_number,
            description=shop_description,
            email=email,
            GST_ID=gst_id
        )
        new_seller.save()

        # Send email with OTP
        send_email(email, otp)

        return Response({'otp': otp, 'owner_name': owner_name, 'shop_contact_number': shop_contact_number}, status=status.HTTP_201_CREATED)
