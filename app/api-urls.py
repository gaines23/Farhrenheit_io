from django.urls import path
from app.views import UserCreate, StreamingList, AllGenreList

urlpatterns = [
    path('user/register/', UserCreate.as_view()),
    # path('user/login'),
    # path('user/logout'),
    #path('user/edit'),
    path('streamingservices/', StreamingList.as_view()),
    path('genres/', AllGenreList.as_view()),
]
