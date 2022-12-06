from django.urls import path
from app import views
from app.views import StreamingList, AllGenreList

urlpatterns = [
    path('streamingservices/', StreamingList.as_view()),
    path('genres/', AllGenreList.as_view()),
]
