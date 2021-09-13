# website_newsong/backend/data_scrap/models.py
from django.db import models

class Song(models.Model):
    link = models.CharField(max_length=50, unique=True)
    singer = models.CharField(max_length=30)
    title = models.CharField(max_length=50)
    image = models.ImageField(blank=True, null=True, upload_to="media/image")

    def __str__(self):
        return self.title