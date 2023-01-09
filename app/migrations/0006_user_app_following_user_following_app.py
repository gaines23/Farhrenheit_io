# Generated by Django 3.2.6 on 2023-01-08 16:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_auto_20230108_1455'),
    ]

    operations = [
        migrations.AddConstraint(
            model_name='user_app_following',
            constraint=models.UniqueConstraint(fields=('user', 'following_app_id'), name='user_following_app'),
        ),
    ]
