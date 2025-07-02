from django.contrib import admin
from .models import ContactMessage, Newsletter, Resource


@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'subject', 'created_at']
    list_filter = ['created_at']
    search_fields = ['name', 'email', 'subject']
    readonly_fields = ['created_at']


@admin.register(Newsletter)
class NewsletterAdmin(admin.ModelAdmin):
    list_display = ['email', 'subscribed_at', 'is_active']
    list_filter = ['is_active', 'subscribed_at']
    search_fields = ['email']


@admin.register(Resource)
class ResourceAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'category', 'download_count', 'is_free', 'created_at']
    list_filter = ['type', 'category', 'is_free', 'created_at']
    search_fields = ['title', 'description', 'tags']
    readonly_fields = ['download_count', 'created_at', 'updated_at']