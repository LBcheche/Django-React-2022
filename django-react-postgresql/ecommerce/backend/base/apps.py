from django.apps import AppConfig


class BaseConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'base'

    # This function is responsable to makes SIGNALS resource available
    def ready(self):
        import base.signals