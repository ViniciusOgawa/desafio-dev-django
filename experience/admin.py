from django.contrib import admin
from .models import Experience


class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('user', 'role', 'company', 'period')
    search_fields = ('user__username', 'role', 'company', 'period')
    list_filter = ('company', 'role')
    ordering = ('user', 'company')

admin.site.register(Experience, ExperienceAdmin)

