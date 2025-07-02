from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.contrib import messages
from django.utils import timezone
from datetime import datetime, timedelta
from .models import PomodoroSession, TodoItem, StickyNote, StudySession, CalendarEvent
import json


@login_required
def tools_home(request):
    """Main tools page"""
    # Get user's recent data for dashboard
    recent_todos = TodoItem.objects.filter(user=request.user)[:5]
    recent_notes = StickyNote.objects.filter(user=request.user)[:6]
    recent_sessions = StudySession.objects.filter(user=request.user)[:7]
    
    # Get today's events
    today = timezone.now().date()
    today_events = CalendarEvent.objects.filter(user=request.user, date=today)
    
    context = {
        'recent_todos': recent_todos,
        'recent_notes': recent_notes,
        'recent_sessions': recent_sessions,
        'today_events': today_events,
    }
    return render(request, 'tools/home.html', context)


# Todo List Views
@login_required
@require_POST
def add_todo(request):
    text = request.POST.get('text', '').strip()
    if text:
        todo = TodoItem.objects.create(user=request.user, text=text)
        return JsonResponse({
            'success': True,
            'todo': {
                'id': todo.id,
                'text': todo.text,
                'completed': todo.completed,
                'created_at': todo.created_at.strftime('%Y-%m-%d %H:%M')
            }
        })
    return JsonResponse({'success': False, 'error': 'Text is required'})


@login_required
@require_POST
def toggle_todo(request, todo_id):
    todo = get_object_or_404(TodoItem, id=todo_id, user=request.user)
    todo.completed = not todo.completed
    todo.save()
    return JsonResponse({'success': True, 'completed': todo.completed})


@login_required
@require_POST
def delete_todo(request, todo_id):
    todo = get_object_or_404(TodoItem, id=todo_id, user=request.user)
    todo.delete()
    return JsonResponse({'success': True})


# Sticky Notes Views
@login_required
@require_POST
def add_note(request):
    content = request.POST.get('content', '').strip()
    if content:
        import random
        colors = [choice[0] for choice in StickyNote.COLOR_CHOICES]
        color = random.choice(colors)
        
        note = StickyNote.objects.create(
            user=request.user,
            content=content,
            color=color
        )
        return JsonResponse({
            'success': True,
            'note': {
                'id': note.id,
                'content': note.content,
                'color': note.color,
                'created_at': note.created_at.strftime('%Y-%m-%d')
            }
        })
    return JsonResponse({'success': False, 'error': 'Content is required'})


@login_required
@require_POST
def update_note(request, note_id):
    note = get_object_or_404(StickyNote, id=note_id, user=request.user)
    content = request.POST.get('content', '').strip()
    if content:
        note.content = content
        note.save()
        return JsonResponse({'success': True})
    return JsonResponse({'success': False, 'error': 'Content is required'})


@login_required
@require_POST
def delete_note(request, note_id):
    note = get_object_or_404(StickyNote, id=note_id, user=request.user)
    note.delete()
    return JsonResponse({'success': True})


# Study Session Views
@login_required
@require_POST
def add_study_session(request):
    duration = request.POST.get('duration')
    subject = request.POST.get('subject', '').strip()
    
    try:
        duration = int(duration)
        if duration > 0:
            session = StudySession.objects.create(
                user=request.user,
                date=timezone.now().date(),
                duration=duration,
                subject=subject or 'Học tập chung'
            )
            return JsonResponse({
                'success': True,
                'session': {
                    'id': session.id,
                    'duration': session.duration,
                    'subject': session.subject,
                    'date': session.date.strftime('%Y-%m-%d')
                }
            })
    except (ValueError, TypeError):
        pass
    
    return JsonResponse({'success': False, 'error': 'Invalid duration'})


# Calendar Views
@login_required
@require_POST
def add_calendar_event(request):
    title = request.POST.get('title', '').strip()
    date = request.POST.get('date')
    time = request.POST.get('time')
    description = request.POST.get('description', '').strip()
    
    if title and date and time:
        try:
            import random
            colors = [choice[0] for choice in CalendarEvent.COLOR_CHOICES]
            color = random.choice(colors)
            
            event = CalendarEvent.objects.create(
                user=request.user,
                title=title,
                date=datetime.strptime(date, '%Y-%m-%d').date(),
                time=datetime.strptime(time, '%H:%M').time(),
                description=description,
                color=color
            )
            return JsonResponse({
                'success': True,
                'event': {
                    'id': event.id,
                    'title': event.title,
                    'date': event.date.strftime('%Y-%m-%d'),
                    'time': event.time.strftime('%H:%M'),
                    'description': event.description,
                    'color': event.color
                }
            })
        except ValueError:
            pass
    
    return JsonResponse({'success': False, 'error': 'Invalid data'})


@login_required
@require_POST
def update_calendar_event(request, event_id):
    event = get_object_or_404(CalendarEvent, id=event_id, user=request.user)
    
    title = request.POST.get('title', '').strip()
    time = request.POST.get('time')
    description = request.POST.get('description', '').strip()
    
    if title and time:
        try:
            event.title = title
            event.time = datetime.strptime(time, '%H:%M').time()
            event.description = description
            event.save()
            return JsonResponse({'success': True})
        except ValueError:
            pass
    
    return JsonResponse({'success': False, 'error': 'Invalid data'})


@login_required
@require_POST
def delete_calendar_event(request, event_id):
    event = get_object_or_404(CalendarEvent, id=event_id, user=request.user)
    event.delete()
    return JsonResponse({'success': True})


@login_required
def get_calendar_events(request):
    date = request.GET.get('date')
    if date:
        try:
            date_obj = datetime.strptime(date, '%Y-%m-%d').date()
            events = CalendarEvent.objects.filter(user=request.user, date=date_obj)
            events_data = [{
                'id': event.id,
                'title': event.title,
                'time': event.time.strftime('%H:%M'),
                'description': event.description,
                'color': event.color
            } for event in events]
            return JsonResponse({'success': True, 'events': events_data})
        except ValueError:
            pass
    
    return JsonResponse({'success': False, 'error': 'Invalid date'})


# Pomodoro Session Views
@login_required
@require_POST
def save_pomodoro_session(request):
    duration = request.POST.get('duration')
    is_break = request.POST.get('is_break', 'false').lower() == 'true'
    completed = request.POST.get('completed', 'false').lower() == 'true'
    
    try:
        duration = int(duration)
        session = PomodoroSession.objects.create(
            user=request.user,
            duration=duration,
            is_break=is_break,
            completed=completed
        )
        return JsonResponse({'success': True, 'session_id': session.id})
    except (ValueError, TypeError):
        return JsonResponse({'success': False, 'error': 'Invalid duration'})