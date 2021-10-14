<template>
    <div id="navbarContent" class="m-0 p-0 justify-content-end align-self-center">
        <div class="nav-item dropdown m-0 p-0">
            <a class="nav-item nav-link m-0 p-0" href="#/compte/" data-toggle="dropdown" id="my_account" aria-haspopup="true" aria-expanded="false">
                <img :src="avatar" alt="Image de profile" height="37" class="my-0 rounded-circle"/>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="my_account">
                <p class="h5 dropdown-item-text">{{ userName }}</p>
                <div class="dropdown-divider"></div>
                <div class="d-flex"><img src="../assets/modify.svg" fill="text-primary" alt="Mon compte" class="pl-4"><router-link to="/compte" class="dropdown-item pl-2">Mon compte</router-link></div>
                <div class="d-flex"><img src="../assets/mail.svg" fill="text-primary" alt="Ecrire un message" class="pl-4"><router-link to="/compte/messages" class="dropdown-item pl-2">Mes messages</router-link></div>
                <div class="dropdown-divider"></div>
                <div class="d-flex"><img src="../assets/pass.svg" fill="text-primary" alt="se deconnecter" class="pl-4"><a class ="dropdown-item pl-2 text-danger" @click="deconnexion" href="#">Déconnexion</a></div>
            </div>
        </div>            
    </div>
</template>

<script>
import Swal from "sweetalert2"

export default {
    name: "NavUserMenu",
    data() {
        return {
            userName: "", 
            avatar: "http://127.0.0.1:3000/images/avatars/user.png"
        }
    },
    created: function() {
            this.userName = localStorage.getItem("userName") 
            this.avatar = localStorage.getItem("avatar") 
    },
    methods: {
        deconnexion: function() {
            localStorage.clear()
            Swal.fire({
                text: "Déconnexion",
                footer: "Redirection",
                icon: "info",
                timer: 2000,
                showConfirmButton: false,
                timerProgressBar: true,
                willClose: () => { location.reload() }
            })
        }
    }
}
</script>