# website_newsong/backend/data_scrap/models.py
from django.db import models

class Profile(models.Model):
    singer = models.CharField(max_length=30, unique=True)
    profile = models.CharField(max_length=200, null=True)

    def __str__(self):
        return f'[{self.pk}] {self.singer}'

class Song(models.Model):
    link = models.CharField(max_length=50, unique=True)
    singer = models.CharField(max_length=30)
    title = models.CharField(max_length=50)
    image = models.CharField(max_length=200)
    singer_id = models.ForeignKey(Profile, on_delete=models.CASCADE, db_column="singer_id")
    
    def __str__(self):
        return f'[{self.pk}] {self.title}'