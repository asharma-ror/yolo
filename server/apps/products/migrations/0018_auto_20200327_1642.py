# Generated by Django 3.0.4 on 2020-03-27 16:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0017_auto_20200327_1616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='productavailability',
            name='allotments_id',
            field=models.CharField(db_index=True, max_length=1000, unique=True),
        ),
        migrations.AlterField(
            model_name='productavailability',
            name='master_allotment_id',
            field=models.CharField(db_index=True, max_length=200),
        ),
    ]
