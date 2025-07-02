from django.db import models
from django.contrib.auth.models import User


class ContactMessage(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    subject = models.CharField(max_length=200)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.name} - {self.subject}"
    
    class Meta:
        ordering = ['-created_at']


class Newsletter(models.Model):
    email = models.EmailField(unique=True)
    subscribed_at = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    
    def __str__(self):
        return self.email
    
    class Meta:
        ordering = ['-subscribed_at']


class Resource(models.Model):
    RESOURCE_TYPES = [
        ('ebook', 'E-book'),
        ('video', 'Video'),
        ('audio', 'Audio'),
        ('document', 'Document'),
        ('image', 'Image'),
        ('template', 'Template'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    type = models.CharField(max_length=20, choices=RESOURCE_TYPES)
    category = models.CharField(max_length=100)
    file_size = models.CharField(max_length=20)
    file_format = models.CharField(max_length=10)
    download_count = models.PositiveIntegerField(default=0)
    is_free = models.BooleanField(default=True)
    thumbnail = models.URLField()
    download_url = models.URLField()
    preview_url = models.URLField(blank=True, null=True)
    tags = models.CharField(max_length=500, help_text="Comma-separated tags")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
    
    class Meta:
        ordering = ['-created_at']