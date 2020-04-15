# Generated by Django 3.0.2 on 2020-01-30 04:22

from django.db import migrations, models
import django.db.models.deletion
import django_enumfield.db.fields
import django_extensions.db.fields
import server.apps.orders.models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Customer',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('name', models.CharField(max_length=200)),
                ('surname', models.CharField(max_length=200)),
                ('birthday', models.DateField()),
                ('gender', django_enumfield.db.fields.EnumField(enum=server.apps.orders.models.Gender)),
                ('email', models.CharField(max_length=200)),
                ('phone', models.CharField(max_length=50)),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Passenger',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
                ('surname', models.CharField(max_length=200)),
                ('birthday', models.DateField()),
                ('gender', django_enumfield.db.fields.EnumField(enum=server.apps.orders.models.Gender)),
            ],
        ),
        migrations.CreateModel(
            name='Quotation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('quotation_id', models.CharField(db_index=True, max_length=200)),
                ('product_id', models.CharField(db_index=True, max_length=200)),
                ('allotment_id', models.CharField(db_index=True, max_length=200)),
                ('occupancy_code', models.CharField(db_index=True, max_length=50)),
                ('status', django_enumfield.db.fields.EnumField(db_index=True, default=1, enum=server.apps.orders.models.QuotationStatus)),
                ('optioned', models.BooleanField(db_index=True)),
                ('start_date_from', models.DateField(db_index=True)),
                ('start_date_to', models.DateField(db_index=True)),
                ('nights', models.IntegerField(db_index=True)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('customer', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.Customer')),
                ('passengers', models.ManyToManyField(to='orders.Passenger')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='QuotationServiceType',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('name', models.CharField(max_length=200)),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Reservation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('linked_reservation_id', models.CharField(max_length=100)),
                ('quotation', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='orders.Quotation')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='QuotationService',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('name', models.CharField(max_length=200)),
                ('unitary_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('total_price', models.DecimalField(decimal_places=2, max_digits=10)),
                ('quantity_type', django_enumfield.db.fields.EnumField(default=1, enum=server.apps.orders.models.QuantityType)),
                ('quantity', models.IntegerField()),
                ('service_id', models.CharField(max_length=50)),
                ('quotation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Quotation')),
                ('service_type', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='orders.QuotationServiceType')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
        migrations.CreateModel(
            name='Payment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', django_extensions.db.fields.CreationDateTimeField(auto_now_add=True, verbose_name='created')),
                ('modified', django_extensions.db.fields.ModificationDateTimeField(auto_now=True, verbose_name='modified')),
                ('payment_method', models.CharField(db_index=True, max_length=50)),
                ('payment_type', django_enumfield.db.fields.EnumField(db_index=True, enum=server.apps.orders.models.PaymentType)),
                ('transaction_provider', models.CharField(db_index=True, max_length=50)),
                ('transaction_id', models.CharField(db_index=True, max_length=50)),
                ('reservation', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='orders.Reservation')),
            ],
            options={
                'ordering': ('-modified', '-created'),
                'get_latest_by': 'modified',
                'abstract': False,
            },
        ),
    ]