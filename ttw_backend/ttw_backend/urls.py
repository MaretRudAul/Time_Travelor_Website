"""
URL configuration for ttw_backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
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

# ttw_backend/urls.py
# from django.contrib import admin
from django.urls import include, path
from api.views import SignupAPIView, LoginAPIView, UsernameAPIView, GetTokenView

urlpatterns = [
    # path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
    # change to use urls.py in api.
    path('api/auth/signup/', SignupAPIView.as_view(), name='signup'),
    path('api/auth/login/', LoginAPIView.as_view(), name='login'),
    path('api/auth/username/', UsernameAPIView.as_view(), name='username'),
    path('api/get-token/', GetTokenView.as_view(), name='get-token'),
]
