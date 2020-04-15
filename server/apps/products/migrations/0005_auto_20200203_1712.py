# Generated by Django 3.0.2 on 2020-02-03 17:12

from django.db import migrations, models
import django_enumfield.db.fields
import server.apps.products.models


class Migration(migrations.Migration):

    dependencies = [
        ('products', '0004_auto_20200130_1714'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='ancillaryservice',
            name='allotments',
        ),
        migrations.AddField(
            model_name='ancillaryservicetype',
            name='code',
            field=models.CharField(db_index=True, default='', max_length=50, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productallotment',
            name='ancillary_services',
            field=models.ManyToManyField(to='products.AncillaryService'),
        ),
        migrations.AddField(
            model_name='productallotment',
            name='days',
            field=models.IntegerField(default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productavailability',
            name='days',
            field=models.IntegerField(db_index=True, default=0),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='productavailability',
            name='departure_option_type',
            field=django_enumfield.db.fields.EnumField(default=1, enum=server.apps.products.models.DepartureOptionType),
        ),
        migrations.AddField(
            model_name='productavailability',
            name='departure_option_value',
            field=models.CharField(default='', max_length=50),
            preserve_default=False,
        ),
        migrations.CreateModel(
            name='DepartureOption',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', django_enumfield.db.fields.EnumField(default=1, enum=server.apps.products.models.DepartureOptionType)),
                ('value', models.CharField(max_length=50)),
            ],
            options={
                'unique_together': {('type', 'value')},
            },
        ),
        migrations.AddField(
            model_name='productallotment',
            name='departure_options',
            field=models.ManyToManyField(to='products.DepartureOption'),
        ),
    ]
