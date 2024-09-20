from django.urls import path,include
from . import views

urlpatterns = [
    path('/product',views.productView),
    path('/all-products',views.all_product_view),
    path('/add-product',views.add_product_view),
    path('/create-order',views.create_order),
    path('/get-orders',views.get_orders),
    path('/get-available-products',views.available_product_view),
    path('/change-status',views.change_status_view),
    path('/update-stock',views.update_product_stock),
    path('/get-orders-by-user',views.get_orders_by_user),
    path('/new-arrivals',views.get_new_arrival),
    path('/update-product-price',views.update_product_price)
]
