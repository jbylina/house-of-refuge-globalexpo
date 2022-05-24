# Generated by Django 3.2.12 on 2022-05-21 16:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0043_auto_20220521_1814'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='housingresource',
            name='resource',
        ),
        migrations.AddField(
            model_name='housingresource',
            name='flat',
            field=models.BooleanField(default=False, verbose_name='Flat'),
        ),
        migrations.AddField(
            model_name='housingresource',
            name='house',
            field=models.BooleanField(default=False, verbose_name='House'),
        ),
        migrations.AddField(
            model_name='housingresource',
            name='room',
            field=models.BooleanField(default=False, verbose_name='Room'),
        ),
        migrations.AddField(
            model_name='housingresource',
            name='sofa',
            field=models.BooleanField(default=False, verbose_name='Room'),
        ),
    ]