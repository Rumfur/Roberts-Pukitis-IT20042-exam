<script>
    import {auth} from "../data/auth.js";
    export default {
        methods: {
            checkInfo(email, password){
                auth.authenticate(email, password);
            },
            fieldsAreFilled(email, password){
                if(email != "" && password != ""){
                    return false;
                }
                return true;
            }
        },
        data(){
            return {
                email: "",
                password: ""
            }
        }
    }
</script>
<template>
    <div id="login-view">
        <form class="login-form">
            <div class="wrapper-logo">
                <img src="@/assets/logo.svg" />
                <div>KRAKEN.FM</div>
            </div>
            <input id="input-email" placeholder="E-mail" v-model="email" />
            <input id="input-password" type="password" placeholder="Password" v-model="password"/>
            <button id="btn-submit" type="submit" v-bind:disabled="fieldsAreFilled(email, password)" @click="checkInfo(email, password)">LOGIN</button>
        </form>
    </div>
</template>

