# website_newsong/backend/backend/urls.py

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/song/', include('songAPI.urls')),
]
