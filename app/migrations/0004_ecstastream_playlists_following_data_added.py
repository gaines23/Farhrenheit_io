# Generated by Django 3.2.6 on 2023-01-14 16:28

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_alter_ecstastreamprofile_user_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='ecstastream_playlists_following',
            name='data_added',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]