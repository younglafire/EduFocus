from django.db import models
from django.contrib.auth.models import User
import json


class PomodoroSession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    duration = models.PositiveIntegerField()  # in minutes
    is_break = models.BooleanField(default=False)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        session_type = "Break" if self.is_break else "Work"
        return f"{self.user.username} - {session_type} ({self.duration}min)"
    
    class Meta:
        ordering = ['-created_at']


class TodoItem(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.CharField(max_length=500)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.text[:50]}"
    
    class Meta:
        ordering = ['-created_at']


class StickyNote(models.Model):
    COLOR_CHOICES = [
        ('bg-yellow-200 border-yellow-300', 'Yellow'),
        ('bg-pink-200 border-pink-300', 'Pink'),
        ('bg-blue-200 border-blue-300', 'Blue'),
        ('bg-green-200 border-green-300', 'Green'),
        ('bg-purple-200 border-purple-300', 'Purple'),
        ('bg-orange-200 border-orange-300', 'Orange'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.TextField()
    color = models.CharField(max_length=50, choices=COLOR_CHOICES, default='bg-yellow-200 border-yellow-300')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.content[:50]}"
    
    class Meta:
        ordering = ['-created_at']


class StudySession(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateField()
    duration = models.PositiveIntegerField()  # in minutes
    subject = models.CharField(max_length=200, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.date} ({self.duration}min)"
    
    class Meta:
        ordering = ['-date', '-created_at']


class CalendarEvent(models.Model):
    COLOR_CHOICES = [
        ('bg-blue-500', 'Blue'),
        ('bg-green-500', 'Green'),
        ('bg-purple-500', 'Purple'),
        ('bg-red-500', 'Red'),
        ('bg-yellow-500', 'Yellow'),
        ('bg-pink-500', 'Pink'),
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    date = models.DateField()
    time = models.TimeField()
    description = models.TextField(blank=True, null=True)
    color = models.CharField(max_length=20, choices=COLOR_CHOICES, default='bg-blue-500')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.title} ({self.date})"
    
    class Meta:
        ordering = ['date', 'time']