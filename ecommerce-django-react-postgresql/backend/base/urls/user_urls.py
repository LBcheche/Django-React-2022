from django.urls import path
from base.views import user_views as views

# ADDITION: Added to allow Simple JWT - Remove if you have its view.
# from rest_framework_simplejwt.views import (TokenObtainPairView,)

urlpatterns = [
    # Added to allow Simple JWT
    path('login', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('register', views.registerUser, name="register"),
    path('', views.getUsers, name="users"),
    path('profile/update', views.updateUserProfile, name="user-profile-update"),
    path('profile', views.getUserProfile, name="users-profile"),
    path('<str:pk>', views.getUserById, name="user"),
    path('update/<str:pk>', views.updateUser, name="user-update"),
    path('delete/<str:pk>', views.deleteUser, name="user-delete"),
    
]
