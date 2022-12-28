
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import AdminSite
from .models import FahrenheitUser, FahrenheitProfile
#, Genre, StreamingServices, Streamingurls #EcstaStreamPlaylist

class FahrenheitUserAdmin(admin.ModelAdmin):
    model = FahrenheitUser

admin.site.register(FahrenheitUser, FahrenheitUserAdmin)
admin.site.register(FahrenheitProfile)
#admin.site.register(Genre)
#admin.site.register(EcstaStreamPlaylist)
# admin.site.register(StreamingServices)
# admin.site.register(Streamingurls)


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
        
