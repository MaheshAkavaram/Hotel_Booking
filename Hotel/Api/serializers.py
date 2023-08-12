from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Hotel, Room, Customer, Reservation, Feedback, Price


class PriceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Price
        fields = '__all__'


class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = '__all__'


class RoomSerializer(serializers.ModelSerializer):
    category = PriceSerializer()

    class Meta:
        model = Room
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()

    class Meta:
        model = Customer
        fields = '__all__'


class ReservationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reservation
        fields = '__all__'


class FeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feedback
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
