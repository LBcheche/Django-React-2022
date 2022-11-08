from asyncore import read
from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Product, Order, OrderItem, ShippingAddress, Review

from rest_framework_simplejwt.tokens import RefreshToken

# ADDITION: This has been added to customize Simple JWT Token.
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):

    name = serializers.SerializerMethodField(read_only=True)
    _id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ['id', '_id','username', 'email', 'name', 'isAdmin']

    # ADDITION: So you don't need to update the database.
    def get_name(self,obj):
        name = obj.first_name
        if name == '':
            name = obj.email
        return name

    def get__id(self,obj):

        return obj.id

    def get_isAdmin(self,obj):

        return obj.is_staff

class UserSerializerWithToken(UserSerializer):
    
    token = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User
        fields = ['id', '_id','username', 'email', 'name', 'isAdmin', 'token']

    def get_token(self,obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
        
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'


class ProductSerializer(serializers.ModelSerializer):

    reviews = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = Product
        fields = '__all__'

    def get_reviews(self,obj):
        
        reviews = obj.review_set.all()
        serializer = ReviewSerializer(reviews, many=True)

        return serializer.data

class ShippingAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = ShippingAddress
        fields = '__all__'

class OrderItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = OrderItem
        fields = '__all__'

class OrderSerializer(serializers.ModelSerializer):

    orderItems = serializers.SerializerMethodField(read_only=True)
    shippingAddress = serializers.SerializerMethodField(read_only=True)
    user = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Order
        fields = '__all__' 

    def get_orderItems(self, obj):
        items = obj.orderitem_set.all()
        serializer = OrderItemSerializer(items, many = True)
        
        return serializer.data    

    def get_shippingAddress(self, obj):
        try:
            # 'obj.shippingAddress' is an One-To-One relashionship
            address = ShippingAddressSerializer(
                obj.shippingaddress, many=False).data 
        except:
            address = False
        return address   

    def get_user(self, obj):
        user = obj.user
        serializer = UserSerializer(user, many = False)
        
        return serializer.data    


# ADDITION: This has been added to customize Simple JWT Token.
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self,attrs):
        data = super().validate(attrs)
        
        # data['username'] = self.user.username
        # data['email'] = self.user.email

        serializers = UserSerializerWithToken(self.user).data
        for k, v in serializers.items():
            data[k] = v
        
        return data
    
    # @classmethod
    # def get_token(cls, user):
    #     token = super().get_token(user)

    #     # Add custom claims
    #     # This is a basic dictionary element addition in python
    #     token['username'] = user.username
    #     token['message'] = 'Hello World!'
    #     # ...

    #     return token
