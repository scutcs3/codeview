<template>
    <p v-for="i in 10" :key="i">
        平台介绍 {{ i }}
    </p>
</template>
<style scoped>
p {
    padding: 100px;
}
</style>