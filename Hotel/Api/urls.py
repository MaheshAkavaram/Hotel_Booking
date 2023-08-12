from django.urls import path
from . import views

urlpatterns = [
    # Hotel URLs
    path('hotels/', views.hotels),

    # Room URLs
    path('rooms/', views.rooms),

    # Customer URLs
    path('registration/', views.registration),

    # Reservation URLs
    path('create_reservation/', views.create_reservation),

    # Feedback URLs
    path('submit_feedback/', views.submit_feedback),

    # Login URL
    path('login/', views.login),

    path('hotels/category/<int:category_id>/sort/<str:sort_criteria>/', views.sort_hotels),


    path('hotels/serach/', views.sort_hotels),
]

