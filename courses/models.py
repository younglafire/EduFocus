from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class Course(models.Model):
    LEVEL_CHOICES = [
        ('beginner', 'Cơ bản'),
        ('intermediate', 'Trung cấp'),
        ('advanced', 'Nâng cao'),
    ]
    
    title = models.CharField(max_length=200)
    description = models.TextField()
    instructor_name = models.CharField(max_length=100)
    instructor_avatar = models.URLField(default='https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=150')
    instructor_bio = models.TextField(blank=True)
    duration = models.CharField(max_length=50)  # e.g., "40 giờ"
    students_count = models.PositiveIntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=1, default=4.5)
    price = models.DecimalField(max_digits=10, decimal_places=0, default=0)  # VND
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES)
    category = models.CharField(max_length=100)
    thumbnail = models.URLField()
    tags = models.CharField(max_length=500, help_text="Comma-separated tags")
    lessons_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    language = models.CharField(max_length=50, default='Tiếng Việt')
    certificate = models.BooleanField(default=True)
    last_updated = models.DateField(auto_now=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('courses:detail', kwargs={'pk': self.pk})
    
    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
    
    def get_level_display_vietnamese(self):
        level_map = {
            'beginner': 'Cơ bản',
            'intermediate': 'Trung cấp',
            'advanced': 'Nâng cao',
        }
        return level_map.get(self.level, self.level)
    
    def format_price(self):
        if self.price == 0:
            return 'Miễn phí'
        return f'{int(self.price):,} VND'
    
    class Meta:
        ordering = ['-created_at']


class CourseSection(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='sections')
    title = models.CharField(max_length=200)
    lessons_count = models.PositiveIntegerField(default=0)
    duration = models.CharField(max_length=50)  # e.g., "4 giờ"
    topics = models.TextField(help_text="Comma-separated topics")
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.course.title} - {self.title}"
    
    def get_topics_list(self):
        return [topic.strip() for topic in self.topics.split(',') if topic.strip()]
    
    class Meta:
        ordering = ['order']


class CourseRequirement(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='requirements')
    requirement = models.CharField(max_length=500)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.course.title} - {self.requirement[:50]}"
    
    class Meta:
        ordering = ['order']


class WhatYouWillLearn(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='learning_outcomes')
    outcome = models.CharField(max_length=500)
    order = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"{self.course.title} - {self.outcome[:50]}"
    
    class Meta:
        ordering = ['order']


class Enrollment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    enrolled_at = models.DateTimeField(auto_now_add=True)
    progress = models.PositiveIntegerField(default=0)  # Percentage
    completed = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.user.username} - {self.course.title}"
    
    class Meta:
        unique_together = ['user', 'course']
        ordering = ['-enrolled_at']