# Generated by Django 3.2.12 on 2022-05-25 18:55

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0046_housingresource_note'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='housingresource',
            name='details',
        ),
    ]
