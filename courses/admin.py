from django.contrib import admin
from .models import Course, CourseSection, CourseRequirement, WhatYouWillLearn, Enrollment


class CourseSectionInline(admin.TabularInline):
    model = CourseSection
    extra = 1


class CourseRequirementInline(admin.TabularInline):
    model = CourseRequirement
    extra = 1


class WhatYouWillLearnInline(admin.TabularInline):
    model = WhatYouWillLearn
    extra = 1


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    list_display = ['title', 'instructor_name', 'level', 'category', 'price', 'students_count', 'rating', 'is_featured', 'created_at']
    list_filter = ['level', 'category', 'is_featured', 'created_at']
    search_fields = ['title', 'description', 'instructor_name', 'tags']
    inlines = [CourseSectionInline, CourseRequirementInline, WhatYouWillLearnInline]
    readonly_fields = ['students_count', 'created_at', 'last_updated']


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'progress', 'completed', 'enrolled_at']
    list_filter = ['completed', 'enrolled_at']
    search_fields = ['user__username', 'course__title']