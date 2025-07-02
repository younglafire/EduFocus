from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    excerpt = models.TextField()
    content = models.TextField()
    author_name = models.CharField(max_length=100)
    author_avatar = models.URLField(default='https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg?auto=compress&cs=tinysrgb&w=100')
    publish_date = models.DateField()
    read_time = models.CharField(max_length=20)  # e.g., "8 phút"
    category = models.CharField(max_length=100)
    tags = models.CharField(max_length=500, help_text="Comma-separated tags")
    thumbnail = models.URLField()
    views = models.PositiveIntegerField(default=0)
    likes = models.PositiveIntegerField(default=0)
    comments_count = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.title
    
    def get_absolute_url(self):
        return reverse('blog:detail', kwargs={'pk': self.pk})
    
    def get_tags_list(self):
        return [tag.strip() for tag in self.tags.split(',') if tag.strip()]
    
    class Meta:
        ordering = ['-publish_date']


class BlogComment(models.Model):
    post = models.ForeignKey(BlogPost, on_delete=models.CASCADE, related_name='comments')
    author_name = models.CharField(max_length=100)
    author_email = models.EmailField()
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_approved = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.author_name} on {self.post.title}"
    
    class Meta:
        ordering = ['-created_at']