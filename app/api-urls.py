from django.urls import path, include
from app.views import (
    UserCreate,
    UserFahrenheitApps,
    UserNotFollowingApps,
    AppList,
    UserAppFollowing,
    StreamingList,
    AllGenreList,
    UsersList,
    UserProfile,
    UserLogout,
    EcstaStreamUserProfile,
    EcstaStreamPlaylists,
    NewTokenObtainPairView,
    UserFollowing,
    UserFollowers,
    EcstaStreamUserList,
)
#CreatePlaylist,

from rest_framework_simplejwt.views import (
    TokenRefreshView,
)


urlpatterns = [
    path('user/register/', UserCreate.as_view()),
    path('user/login/', NewTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('user/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user-profile/', UserProfile.as_view(), name="user"),
    path('user/logout/', UserLogout.as_view(), name="logout"),
    path('users-list/', UsersList.as_view()),

    ### User Apps ###
    path('app-list/', AppList.as_view()),
    path('user/user-app/', UserFahrenheitApps.as_view()),  ### Create New App Form ###
    path('user/app-following/', UserAppFollowing.as_view()),
    path('user/user-not-following/', UserNotFollowingApps.as_view()),

    ### User Following Actions ##
    path('user/following/', UserFollowing.as_view()),
    path('user/followers/', UserFollowers.as_view()),

    ### EcstaStream ###
    path('ecstastream/user-list/', EcstaStreamUserList.as_view()),
    path('ecstastream/profile/', EcstaStreamUserProfile.as_view()),
    path('ecstastream/streamingservices/', StreamingList.as_view()),
    path('ecstastream/genres/', AllGenreList.as_view()),
    path('ecstastream/playlists/', EcstaStreamPlaylists.as_view()),
]
