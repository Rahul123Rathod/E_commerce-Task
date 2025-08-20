from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import CartItem
from .serializers import CartItemSerializer
from products.models import Product
from django.shortcuts import get_object_or_404


# Create your views here.



class CartListCreateView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        cart_items = CartItem.objects.filter(user=request.user)
        serializer = CartItemSerializer(cart_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get('product')
        quantity = request.data.get('quantity', 1)
        product = get_object_or_404(Product, pk=product_id)

        cart_item, created = CartItem.objects.get_or_create(user=request.user, product=product)
        if not created:
            cart_item.quantity += int(quantity)
            cart_item.save()
        else:
            cart_item.quantity = int(quantity)
            cart_item.save()

        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data, status=201)
    

    

class CartDetailView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def put(self, request, pk):
        cart_item = get_object_or_404(CartItem, pk=pk, user=request.user)
        quantity = request.data.get('quantity', cart_item.quantity)
        cart_item.quantity = int(quantity)
        cart_item.save()
        serializer = CartItemSerializer(cart_item)
        return Response(serializer.data)

    def delete(self, request, pk):
        cart_item = get_object_or_404(CartItem, pk=pk, user=request.user)
        cart_item.delete()
        return Response(status=204)


