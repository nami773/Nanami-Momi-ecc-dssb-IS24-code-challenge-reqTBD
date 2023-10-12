from django.contrib import admin
from django.urls import path, include
from core.models import Product
from rest_framework import routers, serializers, viewsets, filters
from rest_framework.schemas import get_schema_view
from django.views.generic import TemplateView


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productId', 'productName', 'productOwnerName', 'Developers',
                  'scrumMasterName', 'startDate', 'methodology', 'location']
        filter_backends = [filters.SearchFilter]
        search_fields = ['=Developers', '=scrumMasterName']


class ProductViewSet(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    permission_classes = ()

    def get_queryset(self):
        scrumMasterName = self.request.query_params.get('scrumMasterName')
        queryset = Product.objects.all()
        developer = self.request.query_params.get('developer')
        if scrumMasterName is not None:
            queryset = queryset.filter(
                scrumMasterName__contains=scrumMasterName)
        if developer is not None:
            queryset = queryset.filter(Developers__icontains=developer)
        return queryset


router = routers.DefaultRouter()
router.register(r'product', ProductViewSet, basename='product')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('openapi', get_schema_view(
        title="Web Applications Manager Project Backend API",
        description="API for accepting queries for products database",
        version="1.0.0"
    ), name='openapi-schema'),
    path('api/api-docs/', TemplateView.as_view(
        template_name='swagger-ui.html',
        extra_context={'schema_url': 'openapi-schema'}
    ), name='swagger-ui'),
]
