from django.contrib import admin
from .models import PomodoroSession, TodoItem, StickyNote, StudySession, CalendarEvent


@admin.register(PomodoroSession)
class PomodoroSessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'duration', 'is_break', 'completed', 'created_at']
    list_filter = ['is_break', 'completed', 'created_at']
    search_fields = ['user__username']


@admin.register(TodoItem)
class TodoItemAdmin(admin.ModelAdmin):
    list_display = ['user', 'text', 'completed', 'created_at']
    list_filter = ['completed', 'created_at']
    search_fields = ['user__username', 'text']


@admin.register(StickyNote)
class StickyNoteAdmin(admin.ModelAdmin):
    list_display = ['user', 'content', 'color', 'created_at']
    list_filter = ['color', 'created_at']
    search_fields = ['user__username', 'content']


@admin.register(StudySession)
class StudySessionAdmin(admin.ModelAdmin):
    list_display = ['user', 'date', 'duration', 'subject', 'created_at']
    list_filter = ['date', 'created_at']
    search_fields = ['user__username', 'subject']


@admin.register(CalendarEvent)
class CalendarEventAdmin(admin.ModelAdmin):
    list_display = ['user', 'title', 'date', 'time', 'color', 'created_at']
    list_filter = ['date', 'color', 'created_at']
    search_fields = ['user__username', 'title']