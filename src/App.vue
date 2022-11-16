<script>
    import {auth} from "./data/auth.js";
    export default {
        methods: {
            getAuthent() {
                return auth.is_authenticated;
            }
        }
    }
</script>
<template>
    <Header v-show="getAuthent()"></Header>
    <div id="section-body">
        <nav id="nav-main" class="wrapper-navigation" v-show="getAuthent()">
            <ol>
                <li>
                    <a href="/">SONGS</a>
                </li>
                <li>
                    <a href="/albums">ALBUMS</a>
                </li>
                <li>
                    <a href="/about">ABOUT</a>
                </li>
            </ol>
        </nav>
        <router-view class="section-router"></router-view>
    </div>
    <div id="section-player" v-show="getAuthent()">
        <AudioPlayer/>
    </div>
</template>
