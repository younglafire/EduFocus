from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import JsonResponse
from django.views.decorators.http import require_POST
from django.core.paginator import Paginator
from django.db.models import Q
from .models import ContactMessage, Newsletter, Resource
from blog.models import BlogPost
from courses.models import Course


def home(request):
    """Landing page with hero, features, testimonials, etc."""
    # Get featured content
    featured_courses = Course.objects.filter(is_featured=True)[:3]
    featured_posts = BlogPost.objects.filter(is_featured=True)[:3]
    
    context = {
        'featured_courses': featured_courses,
        'featured_posts': featured_posts,
    }
    return render(request, 'main/home.html', context)


def contact(request):
    """Contact page with form"""
    if request.method == 'POST':
        name = request.POST.get('name')
        email = request.POST.get('email')
        subject = request.POST.get('subject')
        message = request.POST.get('message')
        
        if name and email and subject and message:
            ContactMessage.objects.create(
                name=name,
                email=email,
                subject=subject,
                message=message
            )
            messages.success(request, 'Tin nhắn của bạn đã được gửi thành công!')
            return redirect('main:contact')
        else:
            messages.error(request, 'Vui lòng điền đầy đủ thông tin.')
    
    return render(request, 'main/contact.html')


def resources(request):
    """Resources page with filtering and search"""
    resources_list = Resource.objects.all()
    
    # Search functionality
    search_query = request.GET.get('search', '')
    if search_query:
        resources_list = resources_list.filter(
            Q(title__icontains=search_query) |
            Q(description__icontains=search_query) |
            Q(tags__icontains=search_query)
        )
    
    # Category filter
    category = request.GET.get('category', '')
    if category and category != 'Tất cả':
        resources_list = resources_list.filter(category=category)
    
    # Type filter
    resource_type = request.GET.get('type', '')
    if resource_type and resource_type != 'Tất cả':
        resources_list = resources_list.filter(type=resource_type)
    
    # Get unique categories and types for filters
    categories = Resource.objects.values_list('category', flat=True).distinct()
    types = Resource.objects.values_list('type', flat=True).distinct()
    
    # Pagination
    paginator = Paginator(resources_list, 12)
    page_number = request.GET.get('page')
    resources = paginator.get_page(page_number)
    
    context = {
        'resources': resources,
        'categories': categories,
        'types': types,
        'search_query': search_query,
        'selected_category': category,
        'selected_type': resource_type,
    }
    return render(request, 'main/resources.html', context)


@require_POST
def newsletter_subscribe(request):
    """AJAX endpoint for newsletter subscription"""
    email = request.POST.get('email')
    
    if not email:
        return JsonResponse({'success': False, 'message': 'Email là bắt buộc'})
    
    newsletter, created = Newsletter.objects.get_or_create(
        email=email,
        defaults={'is_active': True}
    )
    
    if created:
        return JsonResponse({'success': True, 'message': 'Đăng ký thành công!'})
    else:
        if newsletter.is_active:
            return JsonResponse({'success': False, 'message': 'Email này đã được đăng ký'})
        else:
            newsletter.is_active = True
            newsletter.save()
            return JsonResponse({'success': True, 'message': 'Đăng ký lại thành công!'})


def download_resource(request, resource_id):
    """Handle resource download and increment counter"""
    resource = get_object_or_404(Resource, id=resource_id)
    resource.download_count += 1
    resource.save()
    
    # In a real app, you would serve the actual file here
    # For demo purposes, we'll redirect to the download URL
    return redirect(resource.download_url)