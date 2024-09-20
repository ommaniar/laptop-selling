# myapp/models.py
from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.auth.models import UserManager

class CustomUser(AbstractUser):
    USER_TYPE_CHOICES = [
        ('admin', 'Admin'),
        ('customer', 'Customer'),
    ]
    user_type = models.CharField(max_length=10, choices=USER_TYPE_CHOICES, default='customer')    
    class Meta:
        permissions = [
            ("can_view_dashboard", "Can view dashboard"),
            ("can_edit_profile", "Can edit profile"),
            # Add more custom permissions
        ]

    # Override groups and user_permissions fields with related_name to avoid clashes
    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',  # This can be any unique name
        blank=True,
        help_text='The groups this user belongs to.',
        related_query_name='customuser'
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',  # This can be any unique name
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser'
    )
    def save(self,*args,**kwargs):
        if self.is_superuser:
            self.user_type = 'admin'
        super(CustomUser,self).save(*args,**kwargs)
