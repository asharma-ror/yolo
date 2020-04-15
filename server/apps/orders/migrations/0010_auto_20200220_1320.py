# Generated by Django 3.0.3 on 2020-02-20 12:20

from django.db import migrations, models
import django_enumfield.db.fields
import django_extensions.db.fields
import django_extensions.db.fields.json
import server.apps.orders.models


class Migration(migrations.Migration):

    dependencies = [("orders", "0009_auto_20200218_2234")]

    operations = [
        migrations.CreateModel(
            name="PaymentAttempt",
            fields=[
                (
                    "id",
                    models.AutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "created",
                    django_extensions.db.fields.CreationDateTimeField(
                        auto_now_add=True, verbose_name="created"
                    ),
                ),
                (
                    "modified",
                    django_extensions.db.fields.ModificationDateTimeField(
                        auto_now=True, verbose_name="modified"
                    ),
                ),
                ("quotation_id", models.CharField(db_index=True, max_length=200)),
                (
                    "status",
                    django_enumfield.db.fields.EnumField(
                        db_index=True, enum=server.apps.orders.models.PaymentStatus
                    ),
                ),
                ("user_session_id", models.CharField(db_index=True, max_length=200)),
                ("payment_request_id", models.CharField(db_index=True, max_length=200)),
                ("payment_method", models.CharField(db_index=True, max_length=50)),
                (
                    "payment_type",
                    django_enumfield.db.fields.EnumField(
                        db_index=True, enum=server.apps.orders.models.PaymentType
                    ),
                ),
                (
                    "payment_amount",
                    models.DecimalField(decimal_places=2, max_digits=10),
                ),
                (
                    "transaction_provider",
                    models.CharField(db_index=True, max_length=50),
                ),
                ("transaction_id", models.CharField(db_index=True, max_length=100)),
                ("transaction_time", models.DateTimeField(db_index=True)),
                (
                    "raw_transaction_request",
                    django_extensions.db.fields.json.JSONField(default=dict),
                ),
                (
                    "raw_transaction_response",
                    django_extensions.db.fields.json.JSONField(default=dict),
                ),
                (
                    "raw_verification_request",
                    django_extensions.db.fields.json.JSONField(default=dict),
                ),
                (
                    "raw_verification_response",
                    django_extensions.db.fields.json.JSONField(default=dict),
                ),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.AddField(
            model_name="payment",
            name="payment_amount",
            field=models.DecimalField(decimal_places=2, default=0, max_digits=10),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="payment",
            name="payment_request_id",
            field=models.CharField(db_index=True, default="", max_length=200),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="payment",
            name="transaction_time",
            field=models.DateTimeField(db_index=True, default="2020-01-01 00:00"),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name="payment",
            name="user_session_id",
            field=models.CharField(db_index=True, default="", max_length=200),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name="payment",
            name="transaction_id",
            field=models.CharField(db_index=True, max_length=100),
        ),
        migrations.AlterField(
            model_name="reservation",
            name="linked_reservation_id",
            field=models.CharField(max_length=100, null=True),
        ),
    ]
