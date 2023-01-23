
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import AdminSite
from .models import (
    Fahrenheit_App_List,
    CustomUser,
    User_Following,
    User_App_Following,
    Follow_Request,
    Genre,
    StreamingServices,
    Streamingurls,
    EcstaStreamProfile,
    EcstaStreamPlaylist,
    EcstaStream_Playlists_Following,

)

class FahrenheitAppListAdmin(admin.ModelAdmin):
    model = Fahrenheit_App_List
    list_display = ['id', 'app_name', 'created_by', 'date_added', 'internal_app_status', 'app_base_link']
    search_fields = ['app_name']
    ordering = ['date_added']
    list_filter = ['date_added']
admin.site.register(Fahrenheit_App_List, FahrenheitAppListAdmin)



class FahrenheitUserAdmin(admin.ModelAdmin):
    model = CustomUser
    list_display = ['username', 'id', 'date_joined', 'last_modified', ]
    readonly_fields = ['id']
    search_fields = ['username', 'email', 'first_name', 'last_name']
    ordering = ['date_joined']
admin.site.register(CustomUser, FahrenheitUserAdmin)


class UserFollowingAdmin(admin.ModelAdmin):
    model = User_Following
    list_display = ['user', 'following_user_id', 'date_added']
    search_fields = ['user']
    order = ['date_added']
    list_filter = ['date_added']
admin.site.register(User_Following, UserFollowingAdmin)



class UserAppFollowingAdmin(admin.ModelAdmin):
    model = User_App_Following
    list_display = ['user', 'following_app_id', 'date_added']
    search_fields = ['user', 'following_app_id']
    order = ['date_added']
    list_filter = ['date_added']
admin.site.register(User_App_Following, UserAppFollowingAdmin)

admin.site.register(Follow_Request)

class EcstaStreamProfileAdmin(admin.ModelAdmin):
    model = EcstaStreamProfile
    list_display = ['user_id', 'ec_id', 'date_created', 'profile_status', 'status']
    search_fields = ['user_id', 'ec_id']
    order = ['date_created']
    list_filter = ['status']
admin.site.register(EcstaStreamProfile, EcstaStreamProfileAdmin)

admin.site.register(Genre)


class EcstaStreamPlaylistAdmin(admin.ModelAdmin):
    model = EcstaStreamPlaylist
    list_display = ['created_by', 'title', 'created_on', 'updated_on', 'status']
    order = ['created_on']
    list_filter = ['status']
admin.site.register(EcstaStreamPlaylist, EcstaStreamPlaylistAdmin)

admin.site.register(StreamingServices)

admin.site.register(Streamingurls)


class EcstastreamPlaylistFollowing(admin.ModelAdmin):
    model = EcstaStream_Playlists_Following
    order = ['date_added']
admin.site.register(EcstaStream_Playlists_Following, EcstastreamPlaylistFollowing)


# admin.site.register(FavoriteListData)
# admin.site.register(UserFavoritesList)
# admin.site.register(WatchListData)
# admin.site.register(UserWatchList)
# admin.site.register(MoviesList)

# admin.site.register(StreamingRegion)
# admin.site.register(Collection)
# admin.site.register(UsCerts)

# admin.site.register(UserReviewPost)
# admin.site.register(UserPlaylist)
# admin.site.register(UserPlaylistData)
# admin.site.register(FollowRequest)
# admin.site.register(Comment)

# @admin.register(Profile)
# class ProfileAdmin(admin.ModelAdmin):
#     list_display = ['id','user']

#     def test_method(self, request, obj):
#         x = super().get_queryset(request)
#         if request.user.is_superuser:
#             return x
        
