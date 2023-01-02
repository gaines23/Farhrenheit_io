from django.urls import path, include
from app.views import (
    UserCreate,
    CreateNewApp,
    AppFollowing,
    StreamingList,
    AllGenreList,
    UsersList,
    UserProfile,
    UserLogout,
    CreateEcstaStreamUser,
    CreatePlaylist,
    NewTokenObtainPairView,
)
#CreatePlaylist,

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('users-list/', UsersList.as_view()),
    path('user/register/', UserCreate.as_view()),
    path('user/login/', NewTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-profile/', UserProfile.as_view(), name="user"),
    path('user/logout/', UserLogout.as_view(), name="logout"),

    path('user/add-new-app/', CreateNewApp.as_view()),  ### Create New App Form ###
    path('user/app-list/', AppFollowing.as_view()),

    ### User Following Actions ##

    ### EcstaStream ###
    path('ecstastream/add-user/', CreateEcstaStreamUser.as_view()),
    path('ecstastream/streamingservices/', StreamingList.as_view()),
    path('ecstastream/genres/', AllGenreList.as_view()),
    path('ecstastream/new-playlist/', CreatePlaylist.as_view()),
]
