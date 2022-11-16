<script>
    import songs from "../data/songs"
    import {auth} from "../data/auth"
    import {player} from "../stores/player"
    import IconCaretUp from "../components/icons/IconCaretUp.vue"
    import IconPlay from "../components/icons/IconPlay.vue"
    import IconHeart from "../components/icons/IconHeart.vue"
    export default {
        name: 'Songs',
        mounted(){
            player.setPlaylist(songs)
        },
        methods: {
            switchFavoritesVal(){
                this.showFavorites = !this.showFavorites
            },
            sortBy(value){
                if (this.selectedSort == value) {
                    this.invert = !this.invert;
                } else {
                    this.invert = false;
                }
                this.selectedSort = value;
                if (value == "Title") {
                    player.playlist.sort((prev,next) => {
                        var songA = prev.name.toUpperCase();
                        var songB = next.name.toUpperCase();
                        if(this.invert){
                            return (songA < songB) ? -1 : (songA > songB) ? 1 : 0;
                        } else {
                            return (songA > songB) ? -1 : (songA < songB) ? 1 : 0;
                        }
                    });
                } else {
                    player.playlist.sort((prev,next) => {
                        var songA = prev.duration_ms;
                        var songB = next.duration_ms;
                        if(this.invert){
                            return (songA < songB) ? -1 : (songA > songB) ? 1 : 0;
                        } else {
                            return (songA > songB) ? -1 : (songA < songB) ? 1 : 0;
                        }
                    })
                }
            },
            getArtists(artists){
                let allArtists = "";
                artists.forEach(artist => {
                    allArtists += artist.name + " ";
                });
                return allArtists;
            },
            formatedTime(time) {
                var time = parseInt(JSON.stringify(time))
                var minutes = Math.floor(time / 60000);
                var seconds = ((time % 60000) / 1000).toFixed(0);
                return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
            },
            selectSong(song){
                player.setNowPlaying(song)
            }
        },
        data(){
            return {
                searchText: "",
                showFavorites: false,
                selectedSort: "",
                invert: false,
                player,
            }
        },
        components: {
            IconCaretUp,
            IconPlay,
            IconHeart
        }
    }
</script>
<template>
    <div id="songs-view" @scroll="handleScroll">
        <div class="wrapper-header">
            <h1>SONGS</h1>
            <div class="wrapper-search">
                <input id="input-search" placeholder="Search by title..." v-model="searchText"/>
            </div>
            <div class="wrapper-settings">
                <button id="btn-show-favorites" @click="switchFavoritesVal()">Show Favorites</button>
            </div>
        </div>
        <div class="wrapper-songs">
            <table cellspacing="0" cellpadding="0">
                <tr ref="header">
                    <th id="th-id" >#</th>
                    <th id="th-title"  @click="sortBy('Title')" :class="[selectedSort == 'Title' ? 'active' : '']">
                        Title
                        <IconCaretUp v-show="[selectedSort == 'Title' ? true  : false]"/>
                    </th>
                    <th id="th-artist">Artist</th>
                    <th id="th-album">Album</th>
                    <th id="th-duration"  @click="sortBy('Duration')" :class="[selectedSort == 'Duration' ? 'active'  : '']">
                        Duration
                        <IconCaretUp v-show="[selectedSort == 'Duration' ? true  : false]"/>
                    </th>
                </tr>

                <tr class="song" v-for="(song, index) in player.playlist" v-on:dblclick="selectSong(song)" 
                    v-bind:class="{active: player.getNowPlayingSongId() == song.id ? true : false }"> 
                    <td id="td-index">
                        <IconPlay v-if="player.getNowPlayingSongId() == song.id"/>
                        <span id="txt-index">{{index + 1}}</span>
                    </td>
                    <td id="td-title">
                        <img :src="song.album.images[1].url" />
                        {{song.name}}
                    </td>
                    <td id="td-artist" >{{getArtists(song.artists)}}</td>
                    <td id="td-album">{{song.album.name}}</td>
                    <td id="td-duration">
                        {{formatedTime(song.duration_ms)}}
                        <IconHeart @click="addSongToFavorites(song)"/>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

