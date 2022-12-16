from django.urls import path, include
from django.conf.urls import url
from django.contrib import admin
from django.contrib.auth.views import LoginView, LogoutView
from django.conf import settings
from django.conf.urls.static import static
from django.contrib.auth import views as auth_views
#from app.views import StreamingServicesView
from app.forms import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('fahrenheit/', include('app.api-urls'), name="api"),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)