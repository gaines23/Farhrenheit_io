from django.urls import path
#from app.views import (
    # UserCreate,
    # StreamingList,
    # AllGenreList,
    # UsersList,
    # UserProfile,
    # UserLogout,
    
    # ObtainTokenPairSerializer,
#)
#CreatePlaylist,

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    # path('users-list/', UsersList.as_view()),
    # path('user/register/', UserCreate.as_view()),
    # path('user/login/', ObtainTokenPairSerializer.as_view(), name='token_obtain_pair'),
    # path('user/login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    # path('user-profile/', UserProfile.as_view(), name="user"),
    # path('user/logout/', UserLogout.as_view(), name="logout"),
    # path('ecstastream/streamingservices/', StreamingList.as_view()),
    # path('ecstastream/genres/', AllGenreList.as_view()),
    #path('ecstastream/new-playlist/', CreatePlaylist.as_view()),
]
