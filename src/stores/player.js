import { reactive } from 'vue'

export const player = reactive({
    playlist   : [],
    now_playing: {}, // SONG OBJECT
    setPlaylist(songs) {
        this.playlist = songs;
    },
    setNowPlaying(song) {
        this.now_playing = song;
    },
    getNowPlayingSongId() {
        return this.now_playing?.id;
    },
    getNowPlaying() {
        return this.now_playing;
    },
    getNowPlayingAlbumID() {
        return this.now_playing?.album?.id ?? null;
    },
    getNowPlayingSongName() {
        return this.now_playing?.name ?? '';
    },
    getNowPlayingSongImage() {
        return this.now_playing?.album?.images[1].url ?? '';
    },
    getNowPlayingArtists() {
        return this.now_playing?.artists?.map(artist => artist.name).join(', ');
    },
    getNowPlayingSongPreview() {
        return this.now_playing?.preview_url;
    },
    getSongIndex(){
        this.playlist.forEach((song,index) =>{
            if(song.id == this.now_playing.id){
                return index;
            }
        })
    },
    getPlaylistLength(){
        return this.playlist.length;
    },
    getNextSong(){
        let index = this.getSongIndex();
        if (index+1 >= this.getPlaylistLength()) {
            return false;
        } else {
            return this.playlist[index + 1];
        }
    },
    getPreviousSong() {
        let index = this.getSongIndex();
        if (index - 1 < 0) {
            return false;
        } else {
            return this.playlist[index - 1];
        }
    },
    resetNowPlaying() {
        this.now_playing = {};
    }
})