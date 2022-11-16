<script>
    import songs from "../data/songs.js";
    import { auth } from "../data/auth";
    import IconGrid from "../components/icons/IconGrid.vue";
    import IconList from "../components/icons/IconList.vue";
    import { player } from "../stores/player.js";
    export default {
        name: 'App',
        data() {
            return{
                songs,
                player,
                grid:false,
                list:false
            }
        },
        methods: {
            selectAlbum(album){
                player.setPlaylist(songs.filter(index => index.album.id === album.id))
                player.setNowPlaying(player.playlist[0])
            },
            getArtists(artists){
                let allArtists = "";
                artists.forEach(artist => {
                    allArtists += artist.name + " ";
                });
                return allArtists;
            }
        },
        components:{
            IconGrid,
            IconList
        },
        computed:{
            album_list(){
                let albums = []
                songs.forEach(song => {
                    if (!albums.some(e => e.id === song.album.id)) {
                        albums.push(song.album)
                    }
                });
                return albums
            }
        }
    }
</script>
<template>
    <div id="album-view">
        <div class="wrapper-header">
            <h1>ALBUMS</h1>
            <div class="settings">
                <button id="btn-grid" @click="grid =! grid,list = false" 
                    v-bind:class="{active: grid}"><IconGrid/></button>
                <button id="btn-list" @click="list =! list,grid = false" 
                    v-bind:class="{active: list}"><IconList/></button>
            </div>
        </div>
        <ul id="list-albums" v-bind:class="{grid: grid}">
            <li class="album" v-for="(album) in album_list" 
            @dblclick="selectAlbum(album)" 
            v-bind:class="{active: player.getNowPlayingAlbumID() == album.id ? true : false}">
                <img id="img-album" :src="album.images[0].url" />
                <div class="album-info">
                    <h4 id="txt-album-name">{{album.name}}</h4>
                    <p id="txt-album-artists">{{getArtists(album.artists)}}</p>
                    <div class="album-year">
                        <p id="txt-album-year">{{album.artists.release_date}}</p>
                        <p id="txt-album-tracks">{{songs.reduce((acc, cur) => cur.album.id === album.id ? ++acc : acc, 0)}}</p>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>

