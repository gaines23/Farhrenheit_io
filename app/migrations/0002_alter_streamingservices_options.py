# Generated by Django 3.2.6 on 2023-02-02 10:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='streamingservices',
            options={'managed': False, 'ordering': ['display_priority'], 'verbose_name_plural': 'Ecstastream Streaming Services'},
        ),
    ]
