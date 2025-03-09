from django.db import models

# Create your models here.
class Test(models.Model):
    title = models.CharField(max_length=200)
    desc= models.TextField(blank = True)
    url = models.CharField(max_length=100, null = True)
    image = models.ImageField(upload_to= 'static/questions/', null = True)
    duration= models.DurationField()
    questions = models.JSONField()




