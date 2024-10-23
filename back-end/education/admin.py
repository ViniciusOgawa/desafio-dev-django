from django.contrib import admin
from .models import Education


class EducationAdmin(admin.ModelAdmin):
    list_display = ('user', 'institution', 'course', 'period', 'ongoing')
    search_fields = ('user__username', 'institution', 'course', 'period')
    list_filter = ('institution', 'ongoing')
    ordering = ('user', 'institution')

admin.site.register(Education, EducationAdmin)
