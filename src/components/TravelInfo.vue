<template lang="pug">
v-card.travelInfo-card
    Header
    .py-md-10.my-5.inner
        v-container
            v-row
                v-col(cols='12' md='2')
                    v-btn.px-0(@click='onCancel' colos='gary' text)
                        v-icon.mr-2(size='20') icon-left
                        span 回上一頁
                v-col(cols='12' md='10')
                    h2.f-title.text-center {{ travelData.Name }}
                v-col.d-none.d-inline-md-block(cols='2')
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
    methods: {
        onCancel() {
            this.$emit('emitTravelInfoDialog', false);
        },
    },
};
</script>
