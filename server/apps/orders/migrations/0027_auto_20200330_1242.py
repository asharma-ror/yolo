# Generated by Django 3.0.4 on 2020-03-30 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0026_auto_20200330_1233'),
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
    ]
