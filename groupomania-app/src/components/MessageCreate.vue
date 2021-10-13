<template>
    <div id="modalCreateMessage" tabindex="-1" aria-labelledby="modalCreateMessage" aria-hidden="false">
        <div class="modal-dialog">
            <div class="modal-content">
                <form enctype="multipart/form-data">
                    <div class="modal-header d-flex flex-column flex-md-row align-items-center justify-content-start">
                        <p class="modal-title h5 mr-1">Créer le message</p>
                        <p class="modal-title mt-1" :class="createColor">{{createTag}}</p>
                    </div>
                    <div class="row modal-body">
                        <div class="col-12 justify-content-center form-group">
                            <label for="createMessage" class="sr-only">Message :</label>
                            <textarea class="form-control" v-model="createMessage" id="createMessage" name="message" rows="10" placeholder="Votre message ici..."></textarea>
                        </div>
                        <div class="col-12 justify-content-center text-center">
                            <img :src="newImage" class="w-50 rounded">
                            <p class="small text-center">Image à partager</p>
                        </div>
                        <div class="col-12 justify-content-center">
                            <div class="form-group justify-content-center">
                                <label for="File" class="sr-only">Choisir une photo</label>
                                <input @change="onFileChange()" type="file" ref="file" name="image" class="form-control-file" id="File" accept=".jpg, .jpeg, .gif, .png">
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <div class="row w-100 justify-content-spacebetween">
                            <div class="col-6"><a href="#/messages" class="btn btn-secondary btn-block">Annuler</a></div>
                            <div class="col-6"><button type="submit" @click.prevent="createMessages()" class="btn btn-success btn-block">Confirmer</button></div>
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
    name: "Message Create",
    data() {
        return {
            createMessage: "",
            createUserId: "",
            newImage: "",
            createTag: "",
            createColor: "text-secondary",
            file: null,
            isSucces: false
        }
    },
    methods: {
        onFileChange() {
            this.file = this.$refs.file.files[0];
            this.newImage = URL.createObjectURL(this.file)
        },
        createMessages() {
            const formData = new FormData()
            formData.set("image", this.file)
            formData.set("message", this.createMessage.toString())
            axios.post("http://127.0.0.1:3000/api/messages/", formData, { headers: { "Authorization":"Bearer " + localStorage.getItem("token")}})
            .then(res=> {
                if (res.status === 200) {
                    Swal.fire({
                        text: "Le message à été créer !",
                        footer: "Redirection en cours...",
                        icon: "success",
                        timer: 1000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        willClose: () => { this.file = null; router.push("/messages") }
                    })
                }
            })
            .catch(function(error) {
                const codeError = error.message.split("code ")[1]
                let messageError = ""
                switch (codeError){
                    case "400": messageError = "Le message n'a pas été créer !"; break
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
        }
    },
}
</script>