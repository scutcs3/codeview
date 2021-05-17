<template>
    <div class="main">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: "Main",
}
</script>
<style scoped>
.main {
    margin-top: 50px;
}
</style>