from django.shortcuts import render, get_object_or_404, redirect
from django.core.paginator import Paginator
from django.db.models import Q
from django.contrib import messages
from .models import BlogPost, BlogComment


def blog_list(request):
    """Blog listing page with search and category filters"""
    posts = BlogPost.objects.all()
    
    # Search functionality
    search_query = request.GET.get('search', '')
    if search_query:
        posts = posts.filter(
            Q(title__icontains=search_query) |
            Q(excerpt__icontains=search_query) |
            Q(tags__icontains=search_query)
        )
    
    # Category filter
    category = request.GET.get('category', '')
    if category and category != 'Tất cả':
        posts = posts.filter(category=category)
    
    # Get unique categories for filter
    categories = BlogPost.objects.values_list('category', flat=True).distinct()
    
    # Separate featured and regular posts
    featured_posts = posts.filter(is_featured=True)[:2]
    regular_posts = posts.filter(is_featured=False)
    
    # Pagination for regular posts
    paginator = Paginator(regular_posts, 6)
    page_number = request.GET.get('page')
    posts_page = paginator.get_page(page_number)
    
    context = {
        'featured_posts': featured_posts,
        'posts': posts_page,
        'categories': categories,
        'search_query': search_query,
        'selected_category': category,
    }
    return render(request, 'blog/list.html', context)


def blog_detail(request, pk):
    """Blog post detail page"""
    post = get_object_or_404(BlogPost, pk=pk)
    
    # Increment view count
    post.views += 1
    post.save()
    
    # Get comments
    comments = BlogComment.objects.filter(post=post, is_approved=True)
    
    # Handle comment submission
    if request.method == 'POST':
        author_name = request.POST.get('author_name', '').strip()
        author_email = request.POST.get('author_email', '').strip()
        content = request.POST.get('content', '').strip()
        
        if author_name and author_email and content:
            comment = BlogComment.objects.create(
                post=post,
                author_name=author_name,
                author_email=author_email,
                content=content
            )
            # Update comment count
            post.comments_count = post.comments.filter(is_approved=True).count()
            post.save()
            
            messages.success(request, 'Bình luận của bạn đã được gửi thành công!')
            return redirect('blog:detail', pk=pk)
        else:
            messages.error(request, 'Vui lòng điền đầy đủ thông tin.')
    
    # Get related posts
    related_posts = BlogPost.objects.filter(
        category=post.category
    ).exclude(pk=post.pk)[:3]
    
    context = {
        'post': post,
        'comments': comments,
        'related_posts': related_posts,
    }
    return render(request, 'blog/detail.html', context)