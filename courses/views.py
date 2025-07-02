from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.core.paginator import Paginator
from django.db.models import Q
from .models import Course, Enrollment


def course_list(request):
    """Course listing page with search and filters"""
    courses = Course.objects.all()
    
    # Search functionality
    search_query = request.GET.get('search', '')
    if search_query:
        courses = courses.filter(
            Q(title__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(tags__icontains=search_query)
        )
    
    # Category filter
    category = request.GET.get('category', '')
    if category and category != 'Tất cả':
        courses = courses.filter(category=category)
    
    # Level filter
    level = request.GET.get('level', '')
    if level and level != 'Tất cả':
        courses = courses.filter(level=level)
    
    # Get unique categories and levels for filters
    categories = Course.objects.values_list('category', flat=True).distinct()
    levels = Course.objects.values_list('level', flat=True).distinct()
    
    # Pagination
    paginator = Paginator(courses, 9)
    page_number = request.GET.get('page')
    courses_page = paginator.get_page(page_number)
    
    context = {
        'courses': courses_page,
        'categories': categories,
        'levels': levels,
        'search_query': search_query,
        'selected_category': category,
        'selected_level': level,
    }
    return render(request, 'courses/list.html', context)


def course_detail(request, pk):
    """Course detail page"""
    course = get_object_or_404(Course, pk=pk)
    
    # Check if user is enrolled
    is_enrolled = False
    if request.user.is_authenticated:
        is_enrolled = Enrollment.objects.filter(user=request.user, course=course).exists()
    
    context = {
        'course': course,
        'is_enrolled': is_enrolled,
    }
    return render(request, 'courses/detail.html', context)


@login_required
def enroll_course(request, pk):
    """Enroll user in a course"""
    course = get_object_or_404(Course, pk=pk)
    
    enrollment, created = Enrollment.objects.get_or_create(
        user=request.user,
        course=course
    )
    
    if created:
        # Increment student count
        course.students_count += 1
        course.save()
        messages.success(request, f'Bạn đã đăng ký thành công khóa học "{course.title}"!')
    else:
        messages.info(request, 'Bạn đã đăng ký khóa học này rồi.')
    
    return redirect('courses:detail', pk=pk)


@login_required
def my_courses(request):
    """User's enrolled courses"""
    enrollments = Enrollment.objects.filter(user=request.user).select_related('course')
    
    context = {
        'enrollments': enrollments,
    }
    return render(request, 'courses/my_courses.html', context)