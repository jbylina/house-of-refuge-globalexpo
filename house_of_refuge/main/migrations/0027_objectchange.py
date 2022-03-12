# Generated by Django 3.2.12 on 2022-03-04 23:08

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import django.utils.timezone
import model_utils.fields


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('main', '0026_housingresource_is_ready'),
    ]

    operations = [
        migrations.CreateModel(
            name='ObjectChange',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created', model_utils.fields.AutoCreatedField(default=django.utils.timezone.now, editable=False, verbose_name='created')),
                ('modified', model_utils.fields.AutoLastModifiedField(default=django.utils.timezone.now, editable=False, verbose_name='modified')),
                ('change', models.CharField(max_length=2048)),
                ('host', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.housingresource')),
                ('submission', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to='main.submission')),
                ('user', models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'abstract': False,
            },
        ),
    ]
