<script>
    import songs from "../data/songs.js";
    //import {IconHeart} from "@/icons/IconHeart.vue";
    export default {
        methods: {
            switchFavoritesVal(){
                this.showFavorites = !this.showFavorites
            },
            sortBy(value){
                if (this.selectedSort == value) {
                    this.invert = !this.invert;
                }
                this.selectedSort = value;
            }
        },
        data(){
            return {
                searchText: "",
                showFavorites: false,
                selectedSort: "",
                invert: false
            }
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

                <tr class="song">
                    <td id="td-index">
                        <IconPlay />
                        <span id="txt-index">1</span>
                    </td>
                    <td id="td-title">
                        <img src="https://i.scdn.co/image/ab67616d00001e02980c9d288a180838cd12ad24" />
                        DEEP (feat. Nonô)
                    </td>
                    <td id="td-artist">Example, Bou, Nonô</td>
                    <td id="td-album">We May Grow Old But We Never Grow Up</td>
                    <td id="td-duration">
                        3:07
                        <IconHeart />
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

