from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.shortcuts import get_object_or_404
from .models import Order, OrderItem
from cart.models import CartItem
from products.models import Product
from .serializers import OrderSerializer

class PlaceOrderView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        if not cart_items.exists():
            return Response({"detail": "Your cart is empty."}, status=400)

        total_price = sum(item.product.price * item.quantity for item in cart_items)

        # Create Order
        order = Order.objects.create(user=request.user, total_price=total_price)

        # Create Order Items
        for item in cart_items:
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.product.price
            )

        # Clear Cart
        cart_items.delete()

        serializer = OrderSerializer(order)
        return Response(serializer.data, status=201)

class OrderHistoryView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        if request.user.is_admin:
            orders = Order.objects.all().order_by('-created_at')
        else:
            orders = Order.objects.filter(user=request.user).order_by('-created_at')

        serializer = OrderSerializer(orders, many=True)
        return Response(serializer.data)
