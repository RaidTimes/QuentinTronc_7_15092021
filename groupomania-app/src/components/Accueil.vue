<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-12 col-md-10 col-lg-8">
                <div class="card bg-light">
                    <h5 class="my-3 text-center">Bienvenue sur le réseau social interne Groupomania</h5>
                    <div class="card-body d-flex justify-content-between">
                        <button class="btn btn-outline-dark"><a><router-link to="/connexion">Connexion</router-link></a></button>
                        <button class="btn btn-outline-dark"><a><router-link to="/inscription">Inscription</router-link></a></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    Name: "Accueil"
}
</script>

<style>
    body {
        background-color: white
    }
    a:link {
        text-decoration: none;
    }
</style>