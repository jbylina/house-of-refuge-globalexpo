# Generated by Django 3.2.12 on 2022-03-09 23:11
from secrets import token_urlsafe

from django.db import migrations, models
from django.utils.crypto import get_random_string


def create_host_tokens(apps, schema_editor):
    # We get the model from the versioned app registry;
    # if we directly import it, it'll be the wrong version
    HousingResource = apps.get_model("main", "HousingResource")
    for r in HousingResource.objects.all():
        for _ in range(1000):
            token = get_random_string(32)
            if not HousingResource.objects.filter(token=token).exists():
                r.token = token
                r.save()
                break


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0032_alter_housingresource_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='housingresource',
            name='token',
            field=models.CharField(default='', max_length=64),
            preserve_default=False,
        ),
        migrations.RunPython(create_host_tokens, migrations.RunPython.noop),
        migrations.AlterField(
            model_name='housingresource',
            name='status',
            field=models.CharField(choices=[('new', 'Świeżak'), ('taken', 'Zajęta'), ('calling', 'Dzwonimy'), ('ignore', 'Ignoruj'), ('should_delete', 'Do usunięcia')], default='new', max_length=32),
        ),
    ]
