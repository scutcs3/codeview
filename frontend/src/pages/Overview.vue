<template>
    <router-link to="/viewer"> 前往面试官页面 </router-link>

        <router-link to="/viewee"> 前往面试者页面 </router-link>
        <p class="console-view text-center" v-for="i in 10" :key="i">
          第{{ i }}场面试情况。
        </p>
</template>