<template>
<div class="container d-flex justify-content-center my-2 dev-utils-hide">
    <div class="card col-md-9 col-lg-6 shadow">
        <div class="card-header fw-bold">
            Shreaddy Request Manager
        </div>
        <div class="card-body">
            <p class="card-text">Gère les requests du stream de Warths en utilisant cette application Web !</p>
            <p class="fw-bold">Les autorisations peuvent être révoquées <a href="http://www.twitch.tv/settings/connections">ici</a>.</p>
            <p class="card-text text-muted fs-tiny">Technique : l'autorisation donnée n'est jamais stockée sur nos serveurs, et sert simplement de carte d'identité sur Twitch, sans aucune permissions !</p>
            <div class="container-fluid d-flex justify-content-center">
                <a :href='href' class="btn btn-primary shadow">Log In via Twitch</a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            clientID: "kh3yohkrwpbo6m71sryrw8hm0gls90"
        }
    },
    computed: {
        href(){
            return `https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=${this.clientID}&redirect_uri=${window.location.protocol}//${window.location.host}/`
        }
    }
}
</script>
