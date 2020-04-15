# Generated by Django 3.0.2 on 2020-02-03 17:16

from django.db import migrations
from datetime import datetime


def replace_ancillary_service_types(apps, schema_editor):
    AncillaryServiceType = apps.get_model("products", "AncillaryServiceType")

    AncillaryServiceType.objects.all().delete()
    AncillaryServiceType(id=0, created=datetime.utcnow(), name='insurance', code='insurance').save()


def delete_ancillary_service_types(apps, schema_editor):
    AncillaryServiceType = apps.get_model("products", "AncillaryServiceType")

    AncillaryServiceType.objects.all().delete()
    AncillaryServiceType(id=0, created=datetime.utcnow(), name='insurance').save()


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0005_auto_20200203_1712'),
    ]

    operations = [
        migrations.RunPython(replace_ancillary_service_types, delete_ancillary_service_types),
    ]
