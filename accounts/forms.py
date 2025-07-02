from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from .models import UserProfile


class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, label='Họ')
    last_name = forms.CharField(max_length=30, required=True, label='Tên')
    email = forms.EmailField(required=True, label='Email')
    school = forms.CharField(max_length=200, required=True, label='Trường học')
    
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email', 'password1', 'password2')
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Add CSS classes for styling
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 dark:bg-gray-700 dark:text-white transition-all duration-300 text-lg font-inter'
        
        # Custom placeholders
        self.fields['username'].widget.attrs['placeholder'] = 'Tên đăng nhập'
        self.fields['first_name'].widget.attrs['placeholder'] = 'Họ'
        self.fields['last_name'].widget.attrs['placeholder'] = 'Tên'
        self.fields['email'].widget.attrs['placeholder'] = 'your.email@example.com'
        self.fields['password1'].widget.attrs['placeholder'] = 'Tối thiểu 8 ký tự'
        self.fields['password2'].widget.attrs['placeholder'] = 'Nhập lại mật khẩu'
    
    def save(self, commit=True):
        user = super().save(commit=False)
        user.email = self.cleaned_data['email']
        user.first_name = self.cleaned_data['first_name']
        user.last_name = self.cleaned_data['last_name']
        
        if commit:
            user.save()
            # Create or update user profile
            profile, created = UserProfile.objects.get_or_create(user=user)
            profile.school = self.cleaned_data['school']
            profile.save()
        
        return user


class UserProfileForm(forms.ModelForm):
    first_name = forms.CharField(max_length=30, required=True, label='Họ')
    last_name = forms.CharField(max_length=30, required=True, label='Tên')
    email = forms.EmailField(required=True, label='Email')
    
    class Meta:
        model = UserProfile
        fields = ['school', 'bio', 'phone', 'date_of_birth', 'avatar']
        labels = {
            'school': 'Trường học',
            'bio': 'Giới thiệu',
            'phone': 'Số điện thoại',
            'date_of_birth': 'Ngày sinh',
            'avatar': 'Ảnh đại diện (URL)',
        }
        widgets = {
            'date_of_birth': forms.DateInput(attrs={'type': 'date'}),
            'bio': forms.Textarea(attrs={'rows': 4}),
        }
    
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.user:
            self.fields['first_name'].initial = self.instance.user.first_name
            self.fields['last_name'].initial = self.instance.user.last_name
            self.fields['email'].initial = self.instance.user.email
        
        # Add CSS classes
        for field_name, field in self.fields.items():
            field.widget.attrs['class'] = 'w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all duration-300'
    
    def save(self, commit=True):
        profile = super().save(commit=False)
        
        if commit:
            # Update user fields
            user = profile.user
            user.first_name = self.cleaned_data['first_name']
            user.last_name = self.cleaned_data['last_name']
            user.email = self.cleaned_data['email']
            user.save()
            
            profile.save()
        
        return profile