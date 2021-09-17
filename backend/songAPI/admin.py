from django.contrib import admin
from .models import Profile, Song

admin.site.register(Song)
admin.site.register(Profile)