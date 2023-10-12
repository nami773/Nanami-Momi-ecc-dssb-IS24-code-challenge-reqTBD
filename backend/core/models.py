import uuid
from django.conf import settings
from django.db import models


class Product(models.Model):
    AGILE = "Agile"
    WATERFALL = "Waterfall"
    METHODOLOGY_CHOICES = [
        (AGILE, "Agile"),
        (WATERFALL, "Waterfall"),
    ]
    productId = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    productName = models.CharField(max_length=200)
    productOwnerName = models.CharField(max_length=200)
    scrumMasterName = models.CharField(max_length=200)
    startDate = models.DateField()
    Developers = models.JSONField(default=list)
    methodology = models.CharField(
        max_length=10,
        choices=METHODOLOGY_CHOICES,
        default=AGILE,
    )
    # longest possible URL length
    location = models.CharField(max_length=2048, blank=True, default=None)

    def __str__(self):
        return self.productName
