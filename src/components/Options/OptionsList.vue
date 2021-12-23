<template>
    <div class="m-3">
        <hr>
        <div>
            <option-item id="devTools" name="Formulaire de Request" v-model="propOptions.requestForm"/>
            <option-item id="devTools" name="Temps de recharge LightMix" v-model="propOptions.lightmixCooldown"/>
            <hr>
        </div>
        <div>
            <option-item id="devTools" name="Recherche" v-model="devTools"/>
            <option-item id="devTools" name="Raccourci D'administration" v-model="devTools"/>
            <option-item id="devTools" name="Outils de Developpement" v-model="devTools"/>
            <hr>
        </div>
    </div>
</template>

<script>
export default {
    computed: {
        propOptions: {
            get(a, b) {
                console.log(a, b)
                return true
            },
            set(a, b) {
                console.log(a, b)
            }
        }
    },
    props: ["options"]
}
</script>