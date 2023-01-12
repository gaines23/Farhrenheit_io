# Generated by Django 3.2.6 on 2023-01-12 12:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RemoveConstraint(
            model_name='user_app_following',
            name='user_following_app',
        ),
        migrations.AlterUniqueTogether(
            name='user_app_following',
            unique_together={('following_app_id', 'user')},
        ),
    ]
