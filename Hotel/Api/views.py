from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login
from rest_framework.authtoken.models import Token

from .models import Hotel, Room, Customer, Reservation, Feedback, Price
from .serializers import (
    HotelSerializer,
    RoomSerializer,
    CustomerSerializer,
    ReservationSerializer,
    FeedbackSerializer,
    PriceSerializer,
    UserSerializer,
)


# Hotel Views

@api_view(['GET', 'POST'])
def hotels(request):
    if request.method == 'GET':
        hotels = Hotel.objects.all()
        hotel_data = []
        for hotel in hotels:
            room_data = None
            if hotel.room_set.exists():  # Check if the hotel has associated rooms
                room = hotel.room_set.first()  # Get the first room (you can modify this based on your logic)
                room_data = {
                    'room_number': room.room_number,
                    'price': room.category.price
                }
            hotel_data.append({
                'id': hotel.id,
                'name': hotel.name,
                'city': hotel.city,
                'country': hotel.country,
                'image': hotel.image.url,
                'room': room_data,
                'price': hotel.price,
                'rating': hotel.rating
            })
        return Response(hotel_data)
    elif request.method == 'POST':
        serializer = HotelSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)



# Room Views

@api_view(['GET', 'POST'])
def rooms(request):
    if request.method == 'GET':
        rooms = Room.objects.all()
        serializer = RoomSerializer(rooms, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = RoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# Customer Views
"""

@api_view(['POST'])
@permission_classes([AllowAny])
def registration_view(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "Successfully registered new user."
            data['username'] = user.username
            data['email'] = user.email
            # Create a customer (user) here
            customer = Customer.objects.create(user=user)
            data['customer_id'] = customer.id
            data['customer_phone'] = customer.phone_number
            data['customer_email'] = customer.email
            token = Token.objects.get(user=user).key
            data['token'] = token
        else:
            data = serializer.errors
        return Response(data)
"""
# Reservation Views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_reservation(request):
    if request.method == 'POST':
        data = request.data
        data['customer'] = request.user.customer.id

        room_category_id = data.pop('room_category')  # Assuming room_category is provided in the request
        room_category = Price.objects.get(id=room_category_id)
        data['total_price'] = room_category.price * calculate_number_of_nights(data['start_date'], data['end_date'])

        serializer = ReservationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


# Feedback Views

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_feedback(request):
    if request.method == 'POST':
        data = request.data
        data['customer'] = request.user.customer.id

        serializer = FeedbackSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


"""
@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(username=username, password=password)
    if user:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

"""



from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Hotel, Room, Customer, Reservation, Feedback, Price
from .serializers import (
    HotelSerializer,
    RoomSerializer,
    CustomerSerializer,
    ReservationSerializer,
    FeedbackSerializer,
    PriceSerializer,
)
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

# ... your other views
@api_view(['POST'])
@permission_classes([AllowAny])
def registration(request):
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        data = {}
        if serializer.is_valid():
            user = serializer.save()
            data['response'] = "Successfully registered new user."
            data['username'] = user.username
            data['email'] = user.email

            # Create a Customer instance
            customer = Customer.objects.create(
                user=user,
                phone_number=request.data.get('phone_number'),
                email=request.data.get('email'),
                address=request.data.get('address')
            )

            data['customer_id'] = customer.id
            data['customer_phone'] = customer.phone_number
            data['customer_email'] = customer.email

            # Generate and save the token for the user
            token, created = Token.objects.get_or_create(user=user)
            data['token'] = token.key  # Use token.key to get the actual token key
        else:
            data = serializer.errors
            print('Registration errors:', data)
        return Response(data)

from rest_framework.authtoken.models import Token

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    if request.method == 'POST':
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)

        if user:
            login(request, user)

            # Create or retrieve the Token for the user
            token, created = Token.objects.get_or_create(user=user)

            return Response({
                'response': 'Login successful',
                'token': token.key,
            })
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)



from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def sort_hotels(request, category_id, sort_criteria):
    # Validate sort_criteria and fetch hotels based on the selected criteria
    if sort_criteria == 'by_city':
        hotels = Hotel.objects.filter(category=category_id).order_by('city')
    elif sort_criteria == 'by_pin_code':
        hotels = Hotel.objects.filter(category=category_id).order_by('pin_code')
    elif sort_criteria == 'by_location':
        hotels = Hotel.objects.filter(category=category_id).order_by('location')
    # Add other sorting criteria as needed
    else:
        return Response({'error': 'Invalid sorting criteria'}, status=400)

    serializer = HotelSerializer(hotels, many=True)
    return Response(serializer.data)


from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Q


@api_view(['GET'])
def search_hotels(request):
    query = request.query_params.get('query', '')

    if query:
        hotels = Hotel.objects.filter(Q(name__icontains=query) | Q(city__icontains=query))
        serializer = HotelSerializer(hotels, many=True)
        return Response(serializer.data)
    else:
        return Response([])
