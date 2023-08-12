from django.contrib import admin
from .models import Hotel, Room, Customer, Reservation, Feedback, Price

@admin.register(Hotel)
class HotelAdmin(admin.ModelAdmin):
    list_display = ('name', 'city', 'rating')

@admin.register(Room)
class RoomAdmin(admin.ModelAdmin):
    list_display = ('hotel', 'room_number', 'category')

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'email')

@admin.register(Reservation)
class ReservationAdmin(admin.ModelAdmin):
    list_display = ('customer', 'room', 'start_date', 'end_date', 'adults', 'children', 'total_price')

@admin.register(Feedback)
class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('customer', 'content')

@admin.register(Price)
class PriceAdmin(admin.ModelAdmin):
    list_display = ('category', 'price')

# Register the User model as well if you want to manage users in the admin interface
# from django.contrib.auth.models import User
# admin.site.register(User)
