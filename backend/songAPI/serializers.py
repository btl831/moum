# /backend/songAPI/serializers.py

from rest_framework import serializers
from .models import Profile, Song

class SongSerializer(serializers.ModelSerializer):
    class Meta:
        model = Song
        fields = ['id', 'link', 'singer', 'title', 'image']

class SingerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['id', 'singer']

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'