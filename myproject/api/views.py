from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .otp import send_sms_via_twilio
import random

name = price = ""
@api_view(['GET'])
def product_list(request):
    send_sms_via_twilio("+919791957112",name+" "+price)
    return Response({"name":name,"price":price})

@api_view(['POST'])
def create_product(request):
    global name
    global price
    name = request.data.get('name')
    price = request.data.get('price')
    otp = random.randint(100000,999999)
    send_sms_via_twilio("+919791957112",f"Your OPT is {otp}")
    # Here, you can save data to the database or perform other actions
    if name and price:
        # For demonstration purposes, let's assume we're just returning the received data
        return Response({'otp': otp, 'name': name, 'price': price}, status=status.HTTP_201_CREATED)
    else:
        return Response({'error': 'Invalid data'}, status=status.HTTP_400_BAD_REQUEST)