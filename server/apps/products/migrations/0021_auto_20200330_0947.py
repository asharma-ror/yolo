# Generated by Django 3.0.4 on 2020-03-30 09:47

from django.db import migrations, models
import social_django.fields


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0020_auto_20200328_1054'),
    ]

    operations = [
        migrations.CreateModel(
            name='AgeValidator',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('min_age', models.IntegerField(blank=True, null=True)),
                ('max_age', models.IntegerField(blank=True, null=True)),
            ],
        ),
        migrations.AddField(
            model_name='occupancy',
            name='adult_validators',
            field=social_django.fields.JSONField(blank=True, default=dict, null=True),
        ),
    ]