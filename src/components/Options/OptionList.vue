<template>
    <div class="m-3">
        <option-group v-for="(options, groupName, i) in options" :key="i" :groupName="groupName" :options="options" />
    </div>
</template>

<script>
import OptionGroup from './OptionGroup.vue'

export default {
    props: ["options"],
    components: {OptionGroup}
}
</script>