#website_newsong/backend/api/views.py

from rest_framework import generics
from rest_framework import mixins

from .models import Profile, Song
from .serializers import ProfileSerializer, SingerSerializer, SongSerializer

class SongListAPI(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = SongSerializer

    def get_queryset(self):
        return Song.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class SongDetailAPI(generics.GenericAPIView, mixins.RetrieveModelMixin):
    serializer_class = SongSerializer

    def get_queryset(self):
        return Song.objects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

class BySingerAPI(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = SongSerializer

    def get_queryset(self):
        id = self.kwargs['singer_id']
        return Song.objects.filter(singer_id=id).order_by('id')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class SingerListAPI(generics.GenericAPIView, mixins.ListModelMixin):
    serializer_class = SingerSerializer

    def get_queryset(self):
        return Profile.objects.all().order_by('id')

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

class ProfileAPI(generics.GenericAPIView, mixins.RetrieveModelMixin):
    serializer_class = ProfileSerializer

    def get_queryset(self):
        return Profile.objects.all()

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)