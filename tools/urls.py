from django.urls import path
from . import views

app_name = 'tools'

urlpatterns = [
    path('', views.tools_home, name='home'),
    
    # Todo URLs
    path('todos/add/', views.add_todo, name='add_todo'),
    path('todos/<int:todo_id>/toggle/', views.toggle_todo, name='toggle_todo'),
    path('todos/<int:todo_id>/delete/', views.delete_todo, name='delete_todo'),
    
    # Sticky Notes URLs
    path('notes/add/', views.add_note, name='add_note'),
    path('notes/<int:note_id>/update/', views.update_note, name='update_note'),
    path('notes/<int:note_id>/delete/', views.delete_note, name='delete_note'),
    
    # Study Sessions URLs
    path('sessions/add/', views.add_study_session, name='add_study_session'),
    
    # Calendar URLs
    path('calendar/events/add/', views.add_calendar_event, name='add_calendar_event'),
    path('calendar/events/<int:event_id>/update/', views.update_calendar_event, name='update_calendar_event'),
    path('calendar/events/<int:event_id>/delete/', views.delete_calendar_event, name='delete_calendar_event'),
    path('calendar/events/', views.get_calendar_events, name='get_calendar_events'),
    
    # Pomodoro URLs
    path('pomodoro/save/', views.save_pomodoro_session, name='save_pomodoro_session'),
]