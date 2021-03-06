# Generated by Django 3.0.4 on 2020-03-28 10:54

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0019_auto_20200327_1649'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productavailability',
            name='allotments_id',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(max_length=200), size=None),
        ),
        migrations.AlterField(
            model_name='productavailability',
            name='departure_option_display_name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
