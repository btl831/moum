#website_newsong/backend/api/views.py

from rest_framework import generics
from rest_framework import mixins

from .models import Song
from .serializers import SongSerializer

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