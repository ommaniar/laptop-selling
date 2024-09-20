from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group
from .models import CustomUser


class CustomUserAdmin(UserAdmin):
    model = CustomUser
    list_display = ('username', 'email', 'user_type', 'is_staff')
    list_filter = ('user_type', 'is_staff', 'is_active')
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'user_type')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions', 'groups')}),
        ('Important dates', {'fields': ('last_login', 'date_joined')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'user_type'),
        }),
    )
    search_fields = ('username', 'email')
    ordering = ('username',)

    def save_model(self, request, obj, form, change):
        # If the user is new and their user_type is 'customer'
        if not change and obj.user_type == 'customer':
            try:
                # Get the 'test' group or create it if it does not exist
                customer_group, created = Group.objects.get_or_create(name='test')
                obj.groups.add(customer_group)
            except Group.DoesNotExist:
                # If group does not exist, log an error or handle accordingly
                pass
        
        # Set is_staff and is_superuser based on user_type
        if obj.user_type == 'admin':
            obj.is_staff = True
            obj.is_superuser = True
        else:
            obj.is_staff = False
            obj.is_superuser = False

        # Save the model
        super().save_model(request, obj, form, change)

admin.site.register(CustomUser, CustomUserAdmin)

# # myapp/admin.py
# from django.contrib import admin
# from django.contrib.auth.admin import UserAdmin
# from django.contrib.auth.models import Group
# from .models import CustomUser

# class CustomUserAdmin(UserAdmin):
#     model = CustomUser
#     list_display = ('username', 'email', 'user_type', 'is_staff')
#     list_filter = ('user_type', 'is_staff', 'is_active')
#     fieldsets = (
#         (None, {'fields': ('username', 'password')}),
#         ('Personal info', {'fields': ('first_name', 'last_name', 'email', 'user_type')}),
#         ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'user_permissions', 'groups')}),
#         ('Important dates', {'fields': ('last_login', 'date_joined')}),
#     )
#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields': ('username', 'email', 'password1', 'password2', 'user_type'),
#         }),
#     )
#     search_fields = ('username', 'email')
#     ordering = ('username',)

#     def save_model(self, request, obj, form, change):
#         super().save_model(request, obj, form, change)
#         if not change and obj.user_type == 'customer':
#             # Automatically add new students to the 'Students' group
#             customer_group = Group.objects.get(name='test')
#             obj.groups.add(customer_group)

# admin.site.register(CustomUser, CustomUserAdmin)
