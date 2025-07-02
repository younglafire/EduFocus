from django.contrib import admin
from .models import BlogPost, BlogComment


@admin.register(BlogPost)
class BlogPostAdmin(admin.ModelAdmin):
    list_display = ['title', 'author_name', 'category', 'publish_date', 'views', 'likes', 'is_featured']
    list_filter = ['category', 'is_featured', 'publish_date']
    search_fields = ['title', 'content', 'author_name', 'tags']
    readonly_fields = ['views', 'likes', 'comments_count', 'created_at', 'updated_at']


@admin.register(BlogComment)
class BlogCommentAdmin(admin.ModelAdmin):
    list_display = ['author_name', 'post', 'created_at', 'is_approved']
    list_filter = ['is_approved', 'created_at']
    search_fields = ['author_name', 'content', 'post__title']