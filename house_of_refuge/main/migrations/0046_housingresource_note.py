# Generated by Django 3.2.12 on 2022-05-22 10:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0045_auto_20220521_2332'),
    ]

    operations = [
        migrations.AddField(
            model_name='housingresource',
            name='note',
            field=models.TextField(blank=True, default='', max_length=2048, verbose_name='Note'),
        ),
    ]
