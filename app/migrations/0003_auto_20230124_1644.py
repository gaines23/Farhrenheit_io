# Generated by Django 3.2.6 on 2023-01-24 16:44

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_auto_20230123_1022'),
    ]

    operations = [
        migrations.CreateModel(
            name='Ecstastream_Playlist_Data',
            fields=[
                ('pl_data_id', models.BigAutoField(primary_key=True, serialize=False)),
                ('pl_mov_show_id', models.IntegerField()),
                ('pl_date_added', models.DateTimeField(auto_now=True)),
                ('media_type', models.IntegerField(blank=True, choices=[('Movie', 0), ('TV', 1)], null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pl_user', to=settings.AUTH_USER_MODEL)),
                ('user_playlist_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='pl_id', to='app.ecstastreamplaylist')),
            ],
            options={
                'ordering': ['-pl_date_added'],
            },
        ),
        migrations.AddConstraint(
            model_name='ecstastream_playlist_data',
            constraint=models.UniqueConstraint(fields=('user', 'user_playlist_id', 'pl_mov_show_id', 'media_type'), name='user_data_playlist_constraint'),
        ),
        migrations.AlterUniqueTogether(
            name='ecstastream_playlist_data',
            unique_together={('user', 'user_playlist_id', 'pl_mov_show_id', 'media_type')},
        ),
    ]