# Generated by Django 3.0.4 on 2020-03-27 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0022_auto_20200327_1616'),
    ]

    operations = [
        migrations.AlterField(
            model_name='quotationroom',
            name='master_allotment_id',
            field=models.CharField(db_index=True, max_length=200),
        ),
    ]
