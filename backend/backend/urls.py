from django.contrib import admin
from django.urls import path, include
from core.models import Product
from rest_framework import routers, serializers, viewsets


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productId', 'productName', 'productOwnerName', 'Developers',
                  'scrumMasterName', 'startDate', 'methodology', 'location']


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = ()


router = routers.DefaultRouter()
router.register(r'product', ProductViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
