# Generated by Django 3.0.5 on 2020-04-11 19:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0025_auto_20200411_1637'),
    ]

    operations = [
        migrations.AlterField(
            model_name='destination',
            name='code',
            field=models.CharField(max_length=50, unique=True),
        ),
    ]
