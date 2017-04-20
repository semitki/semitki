# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-19 22:00
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('sonetworks', '0024_auto_20170412_2320'),
    ]

    operations = [
        migrations.RenameField(
            model_name='socialaccountgroup',
            old_name='socialgroup',
            new_name='social_group',
        ),
        migrations.RemoveField(
            model_name='socialaccountgroup',
            name='socialaccount',
        ),
        migrations.AddField(
            model_name='socialaccountgroup',
            name='social_account',
            field=models.ForeignKey(blank=True,  on_delete=django.db.models.deletion.CASCADE, to='sonetworks.SocialAccount'),
            preserve_default=False,
        ),
    ]
