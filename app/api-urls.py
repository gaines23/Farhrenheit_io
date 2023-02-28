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
    NewTokenObtainPairView,
    UserFollowing,
    UserFollowers,
    EcstaStreamUserList,
    AllEcstaStreamPlaylists,
    EcstaUserStreamingList,
    EcstaStreamPlaylstDetails, 
    EcPlaylistData,
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
    path('apps-list/', AppList.as_view()),
    path('user/user-apps/', UserFahrenheitApps.as_view()),  ### Create New App Form ###
    path('user/apps-following/', UserAppFollowing.as_view()),
    path('user/apps-not-following/', UserNotFollowingApps.as_view()),

    ### User Following Actions ##
    path('user/following/', UserFollowing.as_view()),
    path('user/followers/', UserFollowers.as_view()),

    ### EcstaStream ###
    path('ecstastream/user-list/', EcstaStreamUserList.as_view()),
    path('ecstastream/profile/', EcstaStreamUserProfile.as_view()),
    path('ecstastream/user-streaming-services', EcstaUserStreamingList.as_view()),
    path('ecstastream/streamingservices/', StreamingList.as_view()),
    path('ecstastream/genres/', AllGenreList.as_view()),
    path('ecstastream/all-playlists/', AllEcstaStreamPlaylists.as_view()),
    path('ecstastream/playlist/details/actions/', EcstaStreamPlaylstDetails.as_view()),
    path('ecstastream/playlist/details/<int:id>/', EcstaStreamPlaylstDetails.as_view()),
    path('ecstastream/playlist/data/actions/', EcPlaylistData.as_view()),
    path('ecstastream/playlist/get-data/<int:playlist_id>/', EcPlaylistData.as_view()),
]
