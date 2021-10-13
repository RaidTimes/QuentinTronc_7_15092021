<template>
    <div id="modalCreateComment" tabindex="-1" aria-labelledby="modalCreateComment" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <form enctype="multipart/form-data">
                    <div class="modal-header d-flex flex-column flex-md-row align-items-center justify-content-start">
                        <p class="modal-title h5 mr-1">Créer commentaire</p>
                        <p class="modal-title mt-1" :class="createColor">{{createTag}}</p>
                    </div>
                    <div class="row modal-body">
                        <div class="col-12 justify-content-center form-group">
                            <label for="createComment" class="sr-only">Commentaire :</label>
                            <textarea class="form-control" v-model="createComment" id="createComment" name="comment" rows="10" placeholder="Votre commentaire ici..."></textarea>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="row w-100 justify-content-spacebetween">
                            <div class="col-6"><button @click.prevent="redirectMessage()" class="btn btn-secondary btn-block">Annuler</button></div>
                            <div class="col-6"><button type="submit" @click.prevent="createComments()" class="btn btn-success btn-block">Confirmer</button></div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import router from "../router"
import Swal from "sweetalert2"

export default {
    name: "Commentaire Create",
    data() {
        return {
            createComment: "",
            messageId: "",
            createUserId: "",
            createTag: "",
            createColor: "text-secondary",
            isSucces: false
        }
    },
    methods: {
        createComments() {
            let usId = localStorage.getItem("userId")
            axios.post("http://127.0.0.1:3000/api/comments/", {"MessageId": this.$route.params.id, "UserId": usId, "comment":this.createComment}, {headers: { "Authorization":"Bearer " + localStorage.getItem("token") }})
            .then(res => {
                if (res.status === 201) {
                    Swal.fire({
                        text: "Le commentaire à été créer !",
                        footer: "Redirection en cours...",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => { router.push("/commentaires/" + this.$route.params.id )}
                    })
                }
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError) {
                    case "400": messageError = "Le commentaire n'a pas été créer !"; break
                    case "401": messageError = "Requête non-authentifiée !"; break
                }
                Swal.fire({
                    title: "Une erreur est survenue",
                    text: messageError || error.message,
                    icon: "error",
                    timer: 1500,
                    showConfirmButton: false,
                    timerProgressBar: true
                })  
            })
        },
        redirectMessage() {
            router.push("/commentaires/" + this.$route.params.id)
        }
    },
}
</script>

<style>
    body {
        background-color: white
    }
</style>