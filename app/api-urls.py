from django.urls import path
from app.views import UserCreate, StreamingList, AllGenreList

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('user/register/', UserCreate.as_view()),
    path('user/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('user/logout'),
    #path('user/edit'),
    path('streamingservices/', StreamingList.as_view()),
    path('genres/', AllGenreList.as_view()),
]
