# website_newsong/backend/api/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.SongListAPI.as_view()),
    path('<int:pk>/', views.SongDetailAPI.as_view()),
    path('s=<int:singer_id>/', views.BySingerAPI.as_view()),
    path('s=list/', views.SingerListAPI.as_view()),
    path('s=<int:pk>/profile/', views.ProfileAPI.as_view()),
]