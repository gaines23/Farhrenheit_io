
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.admin import AdminSite
from .models import *

admin.site.register(FavoriteListData)
admin.site.register(UserFavoritesList)
admin.site.register(WatchListData)
admin.site.register(UserWatchList)
admin.site.register(MoviesList)
admin.site.register(Genre)
admin.site.register(StreamingServices)
admin.site.register(StreamingRegion)
admin.site.register(Collection)
admin.site.register(UsCerts)
admin.site.register(Streamingurls)
admin.site.register(UserReviewPost)
admin.site.register(UserPlaylist)
admin.site.register(UserPlaylistData)
admin.site.register(FollowRequest)
admin.site.register(Comment)

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ['id','user']

    readonly_fields=('test',)
    def test_method(self, request, obj):
        x = super().get_queryset(request)
        if request.user.is_superuser:
            return x
        
