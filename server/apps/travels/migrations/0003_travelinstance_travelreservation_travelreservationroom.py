# Generated by Django 3.0.4 on 2020-03-12 18:43

import django.core.validators
from django.db import migrations, models
import django.db.models.deletion
import django_enumfield.db.fields
import django_extensions.db.fields
import server.apps.travels.models


class Migration(migrations.Migration):

    dependencies = [
        ('travels', '0002_auto_20200312_1726'),
    ]

    operations = [
        migrations.CreateModel(
            name='TravelReservation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('reservation_id', models.CharField(db_index=True, max_length=20, unique=True)),
                ('reservation_date', models.DateField(db_index=True)),
                ('start_date_from', models.DateField(db_index=True)),
                ('start_date_to', models.DateField(db_index=True)),
                ('departure_option_type', models.CharField(max_length=50)),
                ('departure_option_value', models.CharField(blank=True, max_length=50, null=True)),
                ('status', django_enumfield.db.fields.EnumField(db_index=True, default=1, enum=server.apps.travels.models.TravelStatus)),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TravelReservationRoom',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('tot_adults', models.IntegerField(validators=[django.core.validators.MinValueValidator(1)])),
                ('occupancy_code', models.CharField(db_index=True, max_length=50)),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='travels.TravelReservation')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='TravelInstance',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('departure_date', models.DateField()),
                ('reservation', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='instance', to='travels.TravelReservation')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
    ]
