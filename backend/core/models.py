import uuid
from django.conf import settings
from django.db import models


class Developer(models.Model):
    name = models.CharField(max_length=200)

    def __str__(self):
        return self.name


class Product(models.Model):
    AGILE = "AG"
    WATERFALL = "WA"
    METHODOLOGY_CHOICES = [
        (AGILE, "Agile"),
        (WATERFALL, "Waterfall"),
    ]
    productId = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    productName = models.CharField(max_length=200)
    productOwnerName = models.CharField(max_length=200)
    Developers = models.ManyToManyField(Developer)
    scrumMasterName = models.CharField(max_length=200)
    startDate = models.DateField()
    methodology = models.CharField(
        max_length=2,
        choices=METHODOLOGY_CHOICES,
        default=AGILE,
    )
    # longest possible URL length
    location = models.CharField(max_length=2048, blank=True, default=None)

    def __str__(self):
        return self.productName
