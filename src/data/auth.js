import { reactive } from 'vue'
import router from '../router';
//localStorage.is_authenticated = true;

export const auth = reactive({
    user: {
        name: "Roberts",
        surname: "Pukitis",
        code: "IT20042",
        favoriteSongs: localStorage.favoriteSongs ?? [],
    },

    is_authenticated: localStorage.is_authenticated ?? false,
    setUserData(name, surname, code) {
        this.name = name;
        this.surname = surname;
        this.code = code;
    },
    authenticate(email, password) {
        if (email == "test@gmail.com" && password == "testing") {
            localStorage.is_authenticated = true;
            this.is_authenticated = true;
            router.push('/');
        }
    },
    logout() {
        localStorage.clear();
        localStorage.is_authenticated = false;
        this.is_authenticated = false;
        router.push('/login');
    },
    toggleFavorite(songID) {
        if (this.favoriteSongs.includes(songID)) {
            this.favoriteSongs.splice(this.favoriteSongs.indexOf(songID), 1);
        } else {
            this.favoriteSongs.push(songID);
        }
        localStorage.favoriteSongs = this.favoriteSongs;
    },
    getFavoriteSongs() {
        return this.favoriteSongs;
    }
})