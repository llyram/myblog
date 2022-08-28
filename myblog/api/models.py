from random import random
import string
from django.db import models

def generate_unique_code():
    length=6
    
    while True:
        code = ''.join(random.choices(string.ascii_lowercase, k=length))
        if Post.objects.filter(code=code).count() == 0:
            break

        return code

# Create your models here.
class Post(models.Model):
    code = models.CharField(max_length=8, default="", unique=True)
    title = models.CharField(max_length=255)
    intro = models.TextField()
    body = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)