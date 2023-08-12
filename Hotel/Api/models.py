from django.db import models
from django.contrib.auth.models import User

class Price(models.Model):
    category = models.CharField(max_length=50, unique=True)
    price = models.DecimalField(max_digits=10, decimal_places=2)

class Hotel(models.Model):
    name = models.CharField(max_length=100)
    city = models.CharField(max_length=50)
    pin_code = models.CharField(max_length=10)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=True)
    location = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    rating = models.FloatField()
    image = models.ImageField(upload_to='hotel_images/')

class Room(models.Model):
    hotel = models.ForeignKey(Hotel, on_delete=models.CASCADE)
    room_number = models.CharField(max_length=10)
    category = models.ForeignKey(Price, on_delete=models.CASCADE)


class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    address = models.TextField()

    def __str__(self):
        return self.user.username


class Reservation(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    adults = models.PositiveIntegerField()
    children = models.PositiveIntegerField()
    total_price = models.DecimalField(max_digits=10, decimal_places=2)

class Feedback(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    content = models.TextField()
