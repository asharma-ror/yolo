# Generated by Django 3.0.3 on 2020-03-06 11:11

from django.db import migrations
import django_extensions.db.fields.json


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0012_auto_20200305_1710'),
    ]

    operations = [
        migrations.AddField(
            model_name='paymentattempt',
            name='payment_error',
            field=django_extensions.db.fields.json.JSONField(default=dict, null=True),
        ),
    ]
