import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
    {
        path: "/",
        name: "Accueil",
        component: () => import("../components/Accueil"),
    },
    
    {
        path: "/connexion",
        name: "Connexion",
        component: () => import("../components/Connexion"),
    },
    {
        path: "/inscription",
        name: "Inscription",
        component: () => import("../components/Inscription")
    },
    {
        path: "/compte",
        name: "Compte",
        component: () => import("../components/Compte")
    },
    {
        path: "/compte/messages",
        name: "Mes Messages",
        component: () => import("../components/MessagesUser")
    },
    {
        path: "/messages",
        name: "Messages",
        component: () => import("../components/Messages")
    },
    {
        path: "/message/modify/:id",
        name: "Message Modify",
        component: () => import("../components/MessageModify")
    },
    {
        path: "/message/create/",
        name: "Message Create",
        component: () => import("../components/MessageCreate")
    },
    {
        path: "/message/delete/:id",
        name: "Message Delete",
        component: () => import("../components/MessageDelete")
    },
    {
        path: "/commentaires/:id",
        name: "Commentaires",
        component: () => import("../components/Commentaires")
    },
    {
        path: "/commentaire/modify/:id",
        name: "Commentaires Modify",
        component: () => import("../components/CommentaireModify")
    },
    {
        path: "/commentaire/create/",
        name: "Commentaires Create",
        component: () => import("../components/CommentaireCreate")
    },
    {
        path: "/commentaire/delete/:id",
        name: "Commentaires Delete",
        component: () => import("../components/CommentaireDelete")
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const publicPages = ["/", "/connexion", "/inscription"]
    const authRequired = !publicPages.includes(to.path)
    const loggedIn = localStorage.getItem("userId")
    const loggedToken = localStorage.getItem("token")
    if (authRequired && !loggedIn && !loggedToken) {
        return next("/connexion")
    }
    next()
})

export default router
