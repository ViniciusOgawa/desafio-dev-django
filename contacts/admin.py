from django.contrib import admin
from .models import Contact


class ContactAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'city', 'state', 'street', 'number', 'neighborhood', 'postal_code')
    search_fields = ('user__username', 'phone_number', 'city', 'state')
    list_filter = ('city', 'state')

admin.site.register(Contact, ContactAdmin)

