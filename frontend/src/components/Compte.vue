<template>
  <div>
    <div class="container">
      <div class="row justify-content-center">
       <div class="col-6 col-md-5 col-lg-3">
          <router-link to="/messages" class="my-2 btn btn-sm btn-block btn-outline-success"><img src="../assets/back-arrow.svg" class="img-fluid mr-2"/> ...retour aux messages</router-link>
       </div>
        </div>
      <div class="row justify-content-center">
        <div class="col-12 col-md-10 col-lg-8">
          <div class="card bg-light">
            <div class="card-header text-center" style="background-color: ghostwhite">
              <span class="text-dark h6">{{ userName }}</span>
            </div>
            <div class="card-body bg-dark" >
              <div class="row border d-flex align-items-center m-2 p-0" style="background-color: ghostwhite">
                <div class="col-12 col-md-4 text-center">
                  <img :src="avatar" class="rounded-circle m-1 p-0" height="128"/>
                </div>
                <div class="col-12 col-md-8 text-dark">
                  <p class="small text-left m-0 p-1"> Adresse e-mail : {{ email }}</p>
                  <p class="small text-left m-0 p-1">Rôle : {{ role }}</p>
                  <p class="small text-left m-0 p-1"> Crée le : {{ createdAt }}</p>
                  <p class="small text-left m-0 p-1">Votre contenu :</p>
                  <ul>
                    <li class="small text-left m-0 p-1">
                      <a href="#/compte/messages">{{ messagesCount }} message<span v-if="messagesCount > 1">s</span></a>
                    </li>
                    <li class="small text-left m-0 p-1">{{ commentsCount }} commentaire<span v-if="commentsCount > 1">s</span></li>
                  </ul>
                </div>
                <div class="col-12 justify-content-center">
                  <button type="submit" @click.prevent="deleteAccount()" data-toggle="modal" data-target="#modalDeleteAccount" class="btn btn-sm btn-block btn-outline-danger">Supprimer mon compte !</button>
                </div>
              </div>
            </div>
            <div class="card-footer bg-light" >
              <div class="row d-flex align-items-center justify-content-center m-0 p-0">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "Compte",
  data() {
    return {
      userName: "",
      email: "",
      role: "",
      createdAt: "",
      messagesCount: "",
      commentsCount: "",
      avatar: "",
      newAvatar: "/images/avatars/user.jpg",
      file: null,
      submitted: false,
    };
  },
  methods: {
    onFileChange() {
      this.file = this.$refs.file.files[0];
      this.newAvatar = URL.createObjectURL(this.file);
    },
    updateAvatar() {
      this.submitted = true;
      const formData = new FormData();
      formData.append("image", this.file);
      axios.put("http://127.0.0.1:3000/api/users/" + localStorage.getItem("userId"), formData, { headers: { Authorization: "Bearer " + localStorage.getItem("token"),},})
        .then(function (res) {
          localStorage.setItem("avatar", res.data.avatar);
          Swal.fire({
            text: "La photo de profil à été mise à jour !",
            footer: "Redirection en cours...",
            icon: "success",
            timer: 1000,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch(function (error) {
          const codeError = error.message.split("code ")[1];
          let messageError = "";
          switch (codeError) {
            case "400":
              messageError = "La photo de profil n'a pas été mise à jour !";
              break;
            case "401":
              messageError = "Requête non-authentifiée !";
              break;
          }
          Swal.fire({
            title: "Une erreur est survenue",
            text: messageError || error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
          });
        });
    },
    deleteAccount() {
      axios.put("http://127.0.0.1:3000/api/users/" + localStorage.getItem("userId"), { isActive: false }, { headers: { Authorization: "Bearer " + localStorage.getItem("token"),},})
        .then(() => {
          localStorage.clear();
          Swal.fire({
            text: "Le compte à été supprimé !",
            footer: "Déconnexion en cours...",
            icon: "success",
            timer: 5000,
            showConfirmButton: false,
            timerProgressBar: true,
            willClose: () => {
              location.reload();
            },
          });
        })
        .catch(function (error) {
          const codeError = error.message.split("code ")[1];
          let messageError = "";
          switch (codeError) {
            case "400":
              messageError = "La photo de profil n'a pas été mise à jour !";
              break;
            case "401":
              messageError = "Requête non-authentifiée !";
              break;
          }
          Swal.fire({
            title: "Une erreur est survenue",
            text: messageError || error.message,
            icon: "error",
            timer: 1500,
            showConfirmButton: false,
            timerProgressBar: true,
          });
        });
    },
  },
  created: function () {
    axios
      .get(
        "http://127.0.0.1:3000/api/users/" + localStorage.getItem("userId"),
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      )
      .then((user) => {
        this.userName = user.data.userName;
        this.email = user.data.email;
        this.role = user.data.role;
        this.createdAt =
          user.data.createdAt.slice(0, 10).split("-").reverse().join("/") +
          " à " +
          user.data.createdAt.slice(11, 16);
        this.messagesCount = user.data.messagesCount;
        this.commentsCount = user.data.commentsCount;
        this.avatar = user.data.avatar;
      })
      .catch(function (error) {
        const codeError = error.message.split("code ")[1];
        let messageError = "";
        switch (codeError) {
          case "400":
            messageError = "Vos informations non pas été récuperées !";
            break;
          case "401":
            messageError = "Requête non-authentifiée !";
            break;
        }
        Swal.fire({
          title: "Une erreur est survenue",
          text: messageError || error.message,
          icon: "error",
          timer: 1500,
          showConfirmButton: false,
          timerProgressBar: true,
        });
      });
  },
};
</script>

<style>
body {
  background-color: white;
}
</style>
