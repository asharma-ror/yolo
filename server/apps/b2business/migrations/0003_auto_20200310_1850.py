# Generated by Django 3.0.4 on 2020-03-10 17:50

from django.db import migrations, models
import django.db.models.deletion
import django_extensions.db.fields


class Migration(migrations.Migration):

    dependencies = [
        ("b2business", "0002_room"),
    ]

    operations = [
        migrations.CreateModel(
            name="CompanyAirport",
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
                ("name", models.CharField(db_index=True, max_length=200)),
                ("code", models.CharField(db_index=True, max_length=50)),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="CompanyHotel",
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
                ("name", models.CharField(db_index=True, max_length=200)),
                ("code", models.CharField(db_index=True, max_length=50)),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="CompanyRoomType",
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
                ("name", models.CharField(db_index=True, max_length=200)),
                ("code", models.CharField(db_index=True, max_length=20)),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.CreateModel(
            name="RoomCategory",
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
                ("name", models.CharField(max_length=200)),
                ("code", models.CharField(db_index=True, max_length=20)),
            ],
            options={
                "ordering": ("-modified", "-created"),
                "get_latest_by": "modified",
                "abstract": False,
            },
        ),
        migrations.RemoveField(model_name="processinginstance", name="company",),
        migrations.RemoveField(model_name="room", name="hotel",),
        migrations.AddField(
            model_name="company",
            name="company_id",
            field=models.CharField(
                db_index=True, default="", max_length=50, unique=True
            ),
            preserve_default=False,
        ),
        migrations.RenameModel(old_name="Destination", new_name="CompanyDestination",),
        migrations.DeleteModel(name="Hotel",),
        migrations.DeleteModel(name="ProcessingInstance",),
        migrations.DeleteModel(name="Room",),
        migrations.AddField(
            model_name="companyroomtype",
            name="category",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="b2business.RoomCategory",
            ),
        ),
        migrations.AddField(
            model_name="companyroomtype",
            name="company",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.CASCADE, to="b2business.Company"
            ),
        ),
        migrations.AddField(
            model_name="companyhotel",
            name="location",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="b2business.CompanyDestination",
            ),
        ),
        migrations.AddField(
            model_name="companyairport",
            name="location",
            field=models.ForeignKey(
                blank=True,
                null=True,
                on_delete=django.db.models.deletion.SET_NULL,
                to="b2business.CompanyDestination",
            ),
        ),
    ]
