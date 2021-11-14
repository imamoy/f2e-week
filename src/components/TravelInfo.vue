<template lang="pug">
v-card.travelInfo-card
    Header
    .py-10.my-5
        v-container
            v-row
                v-col(cols='2')
                    v-btn(@click='onCancel' colos='gary' text)
                        v-icon.mr-2(size='20') icon-left
                        span 回上一頁
                v-col(cols='8')
                    h2.f-title.text-center {{ travelData.Name }}
                v-col(cols='2')
            .my-10
                v-img(v-if='travelData.Picture.PictureUrl1' :src='travelData.Picture.PictureUrl1' width='100%' height='46vh' max-height='500')
                p.mt-5 {{ travelData.DescriptionDetail }}
</template>

<script>
import Header from '@/layout/Header';
export default {
    components: {
        Header,
    },
    props: {
        travelData: {
            type: Object,
            required: true,
        },
    },
    mounted() {
        console.log(this.travelData);
    },
    methods: {
        onCancel() {
            this.$emit('emitTravelInfoDialog', false);
        },
    },
};
</script>
