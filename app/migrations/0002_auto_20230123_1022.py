# Generated by Django 3.2.6 on 2023-01-23 10:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='fahrenheit_app_list',
            name='app_id_constraint',
        ),
        migrations.AlterUniqueTogether(
            name='fahrenheit_app_list',
            unique_together={('app_name', 'app_base_link')},
        ),
        migrations.AddConstraint(
            model_name='fahrenheit_app_list',
            constraint=models.UniqueConstraint(fields=('app_name', 'app_base_link'), name='app_id_constraint'),
        ),
    ]