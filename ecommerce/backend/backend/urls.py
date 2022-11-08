"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include 

#ADDITION: This import allow to work with variables at settings.py
from django.conf import settings

#ADDITION: This import allow to connect to an static url.
from django.conf.urls.static import static

#ADDITION: This import allow to set the template from react-files and render all frontend
from django.views.generic import TemplateView

urlpatterns = [
    path('admin/', admin.site.urls),
    # path('api/', include('base.urls')),
    path('', TemplateView.as_view(template_name='index.html')),
    path('api/products/', include('base.urls.product_urls')),
    path('api/users/', include('base.urls.user_urls')),
    path('api/orders/', include('base.urls.order_urls')),
]

#ADDITION:
# This function is responsable for serving files uploaded by a user during development.
# This is not suitable for production use! 
# static.static(prefix, view=django.views.static.serve, **kwargs)

urlpatterns += static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)


urlpatterns += static(settings.STATIC_URL, document_root = settings.STATIC_URL)