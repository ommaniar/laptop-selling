from django.shortcuts import get_object_or_404, render
from django.views.decorators.csrf import csrf_exempt
from django.db.models.fields.files import ImageFieldFile  # Import ImageFieldFile
from django.http import HttpResponse, JsonResponse
from api.models import Product, Order, OrderItem
from django.contrib.auth import get_user_model
from account.models import CustomUser
from decimal import Decimal
import json
# Create your views 

@csrf_exempt
def productView(request):
    if request.method == 'GET':
            id = request.GET.get('pid')
            result = Product.objects.filter(pid=int(id))
            data = list(result.values())
            if (data[0]['stock'] <= 0):
                return JsonResponse({'resp':0,'message':"Stock 0 Error"})
            return JsonResponse({'resp':1,'data':data})
            # return JsonResponse({'rest':0,'message':'invalid reuqest'})
    else:
        return JsonResponse({'resp': 0, 'message': 'Invalid request method'})
@csrf_exempt
def all_product_view(request):
    if request.method == 'POST':
        try:
          result = Product.objects.all()
          result = list(result.values())
          return JsonResponse({'resp':1,'data':result})
        except Exception:
            return JsonResponse({'rest':0,'message':'invalid reuqest'})
   
    else:
        return JsonResponse({'resp': 0, 'message': 'Invalid request method'})

@csrf_exempt
def add_product_view(request):
    if request.method == 'POST':
        try:
            print(request.FILES)
            if 'main_image' in request.FILES and 'second_image' in request.FILES:
                main_image = request.FILES.get('main_image')
                second_image = request.FILES.get('second_image')

                print(f"Main Image: {main_image}")
                print(f"Second Image: {second_image}")
                
                data = request.POST.dict()
                print(data)
                print(data['name'])
                print(main_image.name)
                if main_image.name.endswith('.png') and second_image.name.endswith('.png'):
                
                    name = data['name']
                    description = data['description']
                    price = data['price']
                    mrp = data['mrp']
                    model = data['model']
                    color = data['color']
                    brand = data['brand']
                    screen = data['screen']
                    processor = data['processor']
                    ssd = data['ssd']
                    ram = data['ram']
                    ram_type = data['ram_type']
                    clock_speed = data['clock_speed']
                    gpu = data['gpu']
                    disk_drive = data['disk_drive']
                    cam = True if data['cam'].lower() == 'true' else False
                    fingerprint =  True if data['fingerprint'].lower() == 'true' else False
                    keyboard = data['keyboard']
                    stock = data['stock']
                    category = data['category']

                    product = Product(
                        name = name,
                        main_image = main_image,
                        second_image = second_image,
                        description = description,
                        price = price,
                        mrp=mrp,
                        model=model,
                        color = color,
                        brand = brand,
                        screen = screen,
                        processor = processor,
                        ssd = ssd,
                        ram = ram,
                        ram_type = ram_type,
                        clock_speed = clock_speed,
                        gpu = gpu,
                        disk_drive = disk_drive,
                        cam = cam,
                        fingerprint = fingerprint,
                        keyboard= keyboard,
                        stock = stock,
                        category= category
                    )   
                    product.save()
                    return JsonResponse({
                        'resp':1,'messsage':"product created successfully"
                    })
            else:
                return JsonResponse({
                        'resp':0,'message':'invalid image type only png allowred'
                })
        except Exception as e:
            return JsonResponse({'resp':0,'message':str(e)})
    else:
        return JsonResponse({
        'resp':0,'message':'invalid request use POST method'
        })

@csrf_exempt
def create_order(request):
    if request.method == 'POST':
        # testing remainign
        try:
            data = json.loads(request.body)
            print(data)
            username = data.get('username')
            order_items_data = data.get('order_items')
            shipping_address = data.get('shipping_address')
            billing_address = data.get('billing_address')
            zipcode = data.get('zipcode')
            phone_number = data.get('phone_number')
            payment = data.get('payment')
            user = get_object_or_404(CustomUser,username=username)
            total_price = Decimal('0.00')
            products_needed={}
          
            for item_data in order_items_data:
                id, quantity = item_data.split(",")
                quantity = int(quantity)
                product = get_object_or_404(Product,pid=id)
                if product.stock < quantity:
                    return JsonResponse({'resp':0,'message':f'not enough stock for product {product.name}'})
                products_needed[product] = quantity               

            order = Order(
                user=user,
                total_price=total_price,
                shipping_address= shipping_address,
                billing_address = billing_address,
                zipcode=zipcode,
                phone_number=phone_number,
                payment=payment    
            )
            order.save()
            for product, quantity in products_needed.items():
                item_price = product.price
                item_total_price = item_price * quantity
                total_price += item_total_price
                order_item = OrderItem(
                    order=order,
                    product=product,
                    quantity=quantity,
                    price=item_price
                )
                order_item.save()
                product.stock -= quantity
                product.save()

            order.total_price =total_price
            order.save()

            return JsonResponse({'resp':1,'message':'order created successfully'})
        except Exception as e:
            return JsonResponse({'resp':0,'message':str(e)})
    else:
        return JsonResponse({'resp':0,"message":"incorrect method use POST"})

@csrf_exempt
def change_status_view(request):
    # need to be tested
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            oid = data.get('oid')
            new_status = data.get('status')
            valid_statuses = [status[0] for status in Order.STATUS_CHOICES]
            if new_status not in valid_statuses:
                return JsonResponse({'resp':0,'message':'Invalid Status Value'})
            order = get_object_or_404(Order,oid=oid)
            order.status = new_status
            order.save()
            return JsonResponse({'resp': 1, 'message': 'Order status updated successfully'})
    except Exception as e:
        return JsonResponse({'resp':0,'message':str(e)})

@csrf_exempt        
def available_product_view(request):
    if request.method == 'GET':
        try:
          result = Product.objects.filter(stock__gte=1)
          result = list(result.values())
          return JsonResponse({'resp':1,'data':result})
        except Exception:
            return JsonResponse({'rest':0,'message':'invalid reuqest'})
   
    else:
        return JsonResponse({'resp': 0, 'message': 'Invalid request method'})
@csrf_exempt
def update_product_stock(request):
    try:
        if request.method == 'POST':
            data = json.loads(request.body)
            id = int(data.get('pid'))
            new_stock = int(data.get('stock'))
            if(new_stock <= 0):
                return JsonResponse({'resp':0,'message':"Only Positive Stock value allowed"})
            product = get_object_or_404(Product,pid=id)
            product.stock += new_stock
            product.save()
            return JsonResponse({'resp': 1, 'message': 'stock updated Successfully','stock':product.stock})
        else:
            return JsonResponse({'resp': 0, 'message': 'Invalid request method'})

    except Exception as e:
        return JsonResponse({'resp':0,'message':str(e)})

@csrf_exempt
def update_product_price(request):
    try:
        if request.method == "POST":
            data = json.loads(request.body)
            id = int(data.get('pid'))
            new_price = float(data.get('price'))
            product = get_object_or_404(Product,pid=id)
            product.price = new_price
            product.save()
            return JsonResponse({'resp':1,'message':'price updated successfully','price':product.price})
        else:
            return JsonResponse({'resp':0,'message':'Invalid request method'})
    except Exception as e:
        return JsonResponse({'resp':0,'message':str(e)})

@csrf_exempt
def get_orders(request):
    try:
        if request.method == 'POST':
            orders = Order.objects.all()

            all_orders_data = []
            for order in orders:
                order_items = OrderItem.objects.filter(order=order)
                order_data = {
                    'oid': order.oid,
                    'user': order.user.username,
                    'total_price': order.total_price,
                    'status': order.status,
                    'shipping_address': order.shipping_address,
                    'billing_address': order.billing_address,
                    'zipcode': order.zipcode,
                    'phone_no': order.phone_number,
                    'payment': order.payment,
                    'order_items':[
                        {
                            'product_id': item.product.pid,
                            'product_name': item.product.name,
                            'quantity':item.quantity,
                            'price':item.price
                        }for item in order_items
                    ]
                }
                all_orders_data.append(order_data)
            return JsonResponse({'resp':1,'orders':all_orders_data})
        else:
            return JsonResponse({'resp': 0, 'message': 'Invalid request method'})
            
    except Exception as e:
        return JsonResponse({'resp':0,'message':str(e)})

@csrf_exempt
def get_orders_by_user(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            username = data.get('username')
            if not username:
                return JsonResponse({'resp':0,'message':'Username is required'})
            user = get_object_or_404(CustomUser,username=username)
            orders = Order.objects.filter(user=user).order_by('oid')
            orders_data = []
            for order in orders:
                order_items = OrderItem.objects.filter(order=order)
                items_data = []
                for item in order_items:
                    item_data ={
                        'pid':item.product.pid,
                        'product_name': item.product.name,
                        'quantity': item.quantity,
                        'price':item.price,
                        'total_price': item.price * item.quantity
                    }
                    items_data.append(item_data)
                order_data = {
                    'oid': order.oid,
                    'user': order.user.username,
                    'status': order.status,
                    'total_price': str(order.total_price),
                    'shipping_address': order.shipping_address,
                    'billing_address': order.billing_address,
                    'zipcode': order.zipcode,
                    'phone_number': order.phone_number,
                    'payment': order.payment,
                    'items': items_data  # Include serialized order items
                }
                orders_data.append(order_data)
            return JsonResponse({'resp':1,'message':orders_data})
        except json.JSONDecodeError:
            return JsonResponse({'resp': 0, 'message': 'Invalid JSON format'})
        except Exception as e:
            return JsonResponse({'resp': 0, 'message': str(e)})

    else:
        return JsonResponse({'resp': 0, 'message': 'Invalid request method; use POST'})
        
        
@csrf_exempt        
def get_new_arrival(request):
    if request.method == 'GET':
        try:
          result = Product.objects.order_by('-pid').filter(stock__gte=1)[:4]
          result = list(result.values())
          return JsonResponse({'resp':1,'data':result})
        except Exception as e:
            return JsonResponse({'rest':0,'message':str(e)})
   
    else:
        return JsonResponse({'resp': 0, 'message': 'Invalid request method'})
 # def get_orders_view(request):
#     if request.method == 'GET':
#         try:
          
#           result = Order.objects.all()
#           result = list(result.values())
#           return JsosnResponse({'resp':1,'data':result})
#         except Exception:
#             return JsonResponse({'rest':0,'message':'invalid reuqest'})
   
#     else:
#         return JsonResponse({'resp': 0, 'message': 'Invalid request method'})

# @csrf_exempt
# def add_order_view(request):
#     # testing pending
#     if request.post == 'POST':
#         try:
#             data = request.POST.dict()
#             cid = data['cid']
#             user = data['user']
#             cart = Cart.objects.get(cid=cid)
#             if cart.items.count() == 0:
#                 return JsonResponse({'error':'Cart Empty'})
#             order = Order.objects.create(user=user, total_price=cart.get_cart_total())
#             # create order items
#             for item in cart.items.all():
#                 OrderItem.objects.create(
#                     order=order,
#                     product=item.product,
#                     quantity=item.queantity,
#                     price=item.product.price
#                 )
#             cart.items.all().delete()
#             return JsonResponse({'resp':1,'message':'Order Created Successfully'})
#         except Exception as e:
#             return JsonResponse({'resp':0,'message':e})
#     pass

# @csrf_exempt   
# def change_order_status(request):
#         try:
#             if request.method == 'POST':
#                 oid = request.POST.get('oid')
#                 new_status = request.POST.get('status')

#                 order = get_object_or_404(Order,oid=oid)
#                 order.status = new_status
#                 order.save()
#                 return JsonResponse({'resp':1,'message':'Order Status updated Successfully'})
#             else:
#                 return JsonResponse({'resp':0,'message':'invalid request method'})
#         except Exception as e:
#             return JsonResponse({'resp':0,'message':e})

# @csrf_exempt
# def change_product_price(request):
#     try:
#         if request.method == 'POST':
#             pid = request.POST.get('pid')
#             new_price = request.POST.get('price')
#             product = get_object_or_404(Product,id=pid)
#             product.price = new_price
#             product.save()
#             return JsonResponse({'resp':1,'message':"Product price updated Successfully"})
#         return JsonResponse({'resp':0,'message':'invalid request method'})
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})

# @csrf_exempt
# def add_product_Stock(request):
#     try:
#         if request.method == "POST":
#             pid = request.POST.get('pid')
#             additional_stock = int(request.POST.get('stock'))
#             product = get_object_or_404(Product,pid=pid)
#             product.stock += additional_stock
#             product.save()
#             return JsonResponse({'resp':1,'message':"Restock successful"})
#         return JsonResponse({'resp': 0, 'message': 'Invalid request method'})
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})

# @csrf_exempt
# def get_cart(request):
#     try:
#         if request.method == "POST":
#             cart = Cart.objects.get_or_create(user=request.user)
#             cart_items = CartItem.objects.filter(cart=cart)
#             cart_data = {
#                 'items': [serialize_cart_item(item) for item in cart_items],
#                 'total': cart.get_cart_total()
#             }
#             return JsonResponse({'resp':1,'message':cart_data})
#         else:
#             return JsonResponse({'resp': 0, 'message': 'Invalid request method'})

#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})
# # def new_cart(request):
# #     cart = Cart.objects.get_or_create(user=request.user)
#     # pass

# @csrf_exempt
# def update_cart(request):
#     try:
#         if request.method == "POST":
#             cart = get_object_or_404(Cart, user=request.user)
#             pid = request.POST.get('Product_id')
#             quantity = int(request.POST.get('quantity'))
#             product = get_object_or_404(Product,id=pid)
#             cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)
#             if quantity <= 0:
#                 cart_item.delete()
#                 return JsonResponse({'resp':1,'message':'Item removed from cart'})
#             else:
#                 cart_item.quantity = quantity
#                 cart_item.save()
#             return JsonResponse({'resp': 1, 'message': 'Cart updated successfully'})
#         else:
#             return JsonResponse({'resp': 0, 'message': 'Invalid request method'})
                    
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})
#     pass

# @csrf_exempt
# def remove_cart(request):
#     try:    
#         if request.method == 'POST':
#             cart = get_object_or_404(Cart, user=request.user)
#             cart.delete()
#             return JsonResponse({'resp': 1, 'message': 'Cart removed successfully'})
#         return JsonResponse({'resp': 0, 'message': 'Invalid request method'})
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})

# @csrf_exempt
# def add_cart_item(request):
#     try:
#         if request.method == 'POST':
#             cart = get_object_or_404(Cart,user=request.user)
#             pid = request.POST.get('pid')
#             product = get_object_or_404(Product,pid=pid)
#             cart_item = CartItem.objects.filter(cart=cart,product=product)
#             if cart_item:
#                 cart_item.delete()
#                 return JsonResponse({'resp':1,'message':'Item removed from cart'})
#             else:
#                 return JsonResponse({'resp':0,'message':'Item not found in cart'})
#         return JsonResponse({'resp':0,'message':'invalid request method'})
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})

# @csrf_exempt
# def remove_cart_item(request):
#     try:
#         if request.method == 'POST':
#             cart = get_object_or_404(Cart, user=request.user)
#             pid = request.POST.get('pid')
#             product = get_object_or_404(Product,pid= pid)
#             cart_item = CartItem.objects.filter(cart=cart,product=product.first())

#             if cart_item:
#                 cart_item.delete()
#                 return JsonResponse({'resp': 1, 'message': 'Item removed from cart'})
#             else:
#                 return JsonResponse({'resp': 0, 'message': 'Item not found in cart'})
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})
    
# def create_order(request):
#     try:
#         if request.method == 'POST':
#             cart = get_object_or_404(Cart, user=request.POST.user)
#             cart_items = CartItem.objects.filter(cart=cart)

#             if not cart_items:
#                 return JsonResponse({'resp': 0, 'message': 'No items in cart to create an order'})

#             order = Order.objects.create(user=request.user, total_price=cart.get_cart_total())

#             for item in cart_items:
#                 OrderItem.objects.create(
#                     order=order,
#                     product=item.product,
#                     quantity=item.quantity,
#                     price=item.product.price
#                 )
#                 # Optionally update the product stock
#                 item.product.stock -= item.quantity
#                 item.product.save()

#             cart_items.delete()  # Clear cart after order is created

#             return JsonResponse({'resp': 1, 'message': 'Order created successfully', 'order_id': order.id})
#         return JsonResponse({'resp': 0, 'message': 'Invalid request method'})

#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})


# def get_orders(request):
#     try:
#         pass
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})

# def set_order_status(request):
#     try:
#         pass
#     except Exception as e:
#         return JsonResponse({'resp':0,'message':e})