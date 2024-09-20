from django.db import models
from django.contrib.auth.models import User
from account.models import CustomUser
from django.conf import settings
# Create your models here.

class Product(models.Model):
    
    CATEGORY_CHOICES = [
        ('Everyday', 'Everyday Laptop'),
        ('Gaming', 'Gaming Laptop'),
        ('Thin_Light', 'Thin and Light Laptop'),
        ('Multitasking', 'Multitasking Laptop'),
        ('Developer', 'Developer Laptop'),
    ]

    pid = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    main_image = models.ImageField(upload_to='products/images/')
    second_image = models.ImageField(upload_to='products/images/')  # Fixed typo
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    mrp = models.DecimalField(max_digits=10, decimal_places=2)
    model = models.CharField(max_length=100)  # Consider changing to CharField
    color = models.CharField(max_length=50)   # Consider changing to CharField
    brand = models.CharField(max_length=30)
    screen = models.CharField(max_length=100)  # Consider changing to CharField
    processor = models.CharField(max_length=100)  # Consider changing to CharField
    ssd = models.CharField(max_length=50)   # Consider changing to CharField
    ram = models.CharField(max_length=50)   # Consider changing to CharField
    ram_type = models.CharField(max_length=50)  # Consider changing to CharField
    clock_speed = models.CharField(max_length=50)  # Consider changing to CharField
    gpu = models.CharField(max_length=100)   # Consider changing to CharField
    disk_drive = models.CharField(max_length=50)  # Consider changing to CharField
    cam = models.BooleanField()
    fingerprint = models.BooleanField()
    keyboard = models.CharField(max_length=50)  # Consider changing to CharField
    stock = models.IntegerField()
    category = models.CharField(max_length=20,choices=CATEGORY_CHOICES)

    def __str__(self):
        return f"{self.pid} {self.name}"

# class Cart(models.Model):
#     cart_id = models.AutoField(primary_key=True)
#     user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)  
#     def get_cart_total(self):
#         total = sum(item.get_total_price() for item in self.items.all())
#         return total  
#     def __str__(self):
#         return f"Cart of {self.user.username}"
#     def get_cart_total(self):
#         total = sum(item.get_total_price() for item in self.items.all())
#         return total

# class CartItem(models.Model):
#     cart = models.ForeignKey(Cart,related_name='items',on_delete=models.CASCADE)
#     product = models.ForeignKey(Product, on_delete=models.CASCADE)
#     quantity = models.PositiveIntegerField(default=1)
#     def __str__(self):
#         return f"{self.quantity} of {self.product.name}"

#     def get_total_price(self):
#         return self.product.price * self.quantity

class Order(models.Model):
    oid = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)    
    total_price = models.DecimalField(max_digits=10, decimal_places=2)  
    shipping_address = models.CharField(max_length=255)
    billing_address = models.CharField(max_length=255)
    zipcode = models.CharField(max_length=20)
    phone_number = models.CharField(max_length=15)  
    payment = models.CharField(max_length=50)
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Processing', 'Processing'),
        ('Shipped', 'Shipped'),
        ('Delivered', 'Delivered'),
        ('Canceled', 'Canceled'),
    )
    
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    def __str__(self):
        return f"Order {self.oid} by {self.user}" 
    
class OrderItem(models.Model):
    order = models.ForeignKey(Order, related_name='items',on_delete= models.CASCADE)
    product = models. ForeignKey(Product,on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField()
    price = models.DecimalField( max_digits=10, decimal_places=2)
    def __str__(self):
        return f"{self.quantity} of {self.product.name} at {self.price} each"

    def get_total_price(self):
        return self.price * self.quantity