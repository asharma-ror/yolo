# Generated by Django 3.0.4 on 2020-03-26 22:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0019_auto_20200312_1943'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='discountticket',
            name='quotation',
        ),
        migrations.AddField(
            model_name='discountticket',
            name='reservation_id',
            field=models.CharField(blank=True, db_index=True, max_length=50, null=True),
        ),
    ]
