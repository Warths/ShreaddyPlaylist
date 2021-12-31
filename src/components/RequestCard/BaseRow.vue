<template>
    <transition-group tag="div" name="fadable">
        <div class="card-text fadable-item" :key="text">{{ text }}</div>
    </transition-group>
</template>

<script>
export default {
    props: ["text"]
}
</script>

<style scoped>
@keyframes FadeIn {
    from {opacity:0}
    50% {opacity:0}
    to {opacity: 1}
}

.fadable-item {
    transition: color 1s;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow:hidden;
}

.fadable-enter-from, .fadable-leave-to {
    opacity:0;
}

.fadable-enter-active {
    animation: FadeIn 1s;
}

.fadable-leave-active {
    animation: FadeIn 1s reverse;
    position: absolute
}

.dark-theme .fadable-item {
    color: white;
}
</style>
