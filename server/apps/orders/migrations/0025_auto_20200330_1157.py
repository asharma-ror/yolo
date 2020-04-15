# Generated by Django 3.0.4 on 2020-03-30 11:57

import datetime
from django.db import migrations, models
import django_enumfield.db.fields
import server.apps.orders.models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0024_auto_20200328_1118'),
    ]

    operations = [
        migrations.AddField(
            model_name='passenger',
            name='max_age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='passenger',
            name='min_age',
            field=models.IntegerField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='passenger',
            name='tax_code',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='customer',
            name='birthday',
            field=models.DateField(default=datetime.date(1, 1, 1)),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='birthday',
            field=models.DateField(default=datetime.date(1, 1, 1)),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='gender',
            field=django_enumfield.db.fields.EnumField(blank=True, enum=server.apps.orders.models.Gender, null=True),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='passenger',
            name='surname',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]
