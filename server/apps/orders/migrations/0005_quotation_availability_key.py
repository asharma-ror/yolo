# Generated by Django 3.0.2 on 2020-02-12 06:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20200130_1714'),
    ]

    operations = [
        migrations.AddField(
            model_name='quotation',
            name='availability_key',
            field=models.CharField(db_index=True, default='', max_length=600),
            preserve_default=False,
        ),
    ]
