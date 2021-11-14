<template lang="pug">
v-app#app
  Header
  v-main
    router-view
  Footer
</template>

<script>
import Header from '@/layout/Header';
import Footer from '@/layout/Footer';

export default {
    name: 'App',
    components: {
        Header,
        Footer,
    },
    data: () => ({}),
};
</script>
<style lang="scss">
@import 'style/all';
</style>
