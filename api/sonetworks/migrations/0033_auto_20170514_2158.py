# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-05-14 21:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0032_auto_20170514_2158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='socialaccount',
            name='token_expiration',
            field=models.DateTimeField(blank=True, null=True),
        ),
    ]
