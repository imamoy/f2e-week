<template lang="pug">
#HotTravel.travel-list-page.py-5
    v-overlay(:value='loading' opacity='0.7')
        v-progress-circular(indeterminate :size='70' :width='7' color='primary')
    v-container
        v-breadcrumbs.px-0(large)
            v-breadcrumbs-item 首頁
            v-breadcrumbs-item 搜尋景點
        h2.f-title.text-center 搜尋景點
        v-data-iterator(:items='travelData' :items-per-page.sync='itemsPerPage' :page.sync='page' hide-default-footer)
            template(v-slot:header v-if='travelData.length >= 1')
                v-row.filter-row.align-center.justify-md-center.my-5
                    v-col(cols='12' md='auto')
                        v-chip-group(v-model='classificationBy' prev-icon='icon-left-open' next-icon='icon-right-open' show-arrows)
                            v-chip(v-for='item,index in classification' :key='index' input-value='item') {{ item }}
            template(v-slot:default='props')
                v-row.mt-10
                    v-col(cols='12' md='4' v-for='item, index in props.items' :key='index')
                        .hot-travel-card.mb-2(@click='showTravelInfo(item)')
                            v-card(flat)
                                v-img(:src='item.Picture.PictureUrl1')
                                v-card-title.f-card-titleBig {{ getCity(item.Address, item.City) }}
                            v-card-subtitle {{ item.Name }}
            template(v-slot:footer)
                .cross-slider-arrows.d-flex.align-center.justify-center.my-10
                    v-btn.custom-slick-prev.mr-2.mr-md-0(color='primary' width='40' height='40' @click='formerPage' :disabled='page === 1' fab depressed)
                        v-icon(size='20') icon-left-open
                    .cross-slider-page.mx-4.mx-8
                        span {{ page }}
                        span /
                        span {{ pages }}
                    v-btn.custom-slick-next.ml-2.ml-md-0(color='primary' width='40' height='40' @click='nextPage' :disabled='page === pages' fab depressed)
                        v-icon(size='20') icon-right-open
    v-dialog(v-model='travelInfoShow'
        fullscreen
        hide-overlay
        content-class='travel-dialog'
        transition="none")
            travel-info(@emitTravelInfoDialog='onEmitTravelInfoDialog' :travel-data='travelInfoDetail')
</template>
<script>
import _ from 'lodash';
import jsSHA from 'jssha';
import axios from 'axios';
import travelInfo from '@/components/TravelInfo';

export default {
    name: 'HotTravel',
    components: {
        travelInfo,
    },
    data: () => ({
        loading: false,
        location: '台北',
        travelInfoShow: false,
        travelInfo: {},
        travelInfoDetail: '',
        search: '',
        originTravelData: [],
        travelData: [],
        classification: [],
        classificationBy: '',
        page: 1,
        itemsPerPage: 12,
        pages: '',
        searchLocation: '',
    }),
    computed: {
        searchInfo() {
            return this.$store.state.searchInfo;
        },
    },
    mounted() {
        console.log(this.searchInfo);
        this.getTravel();
    },
    methods: {
        getTravel() {
            this.loading = true;
            axios
                .get(
                    `https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$filter=contains(ScenicSpotName,'${this.searchInfo.name}')+&$format=JSON`,
                    {
                        headers: this.getAuthorizationHeader(),
                    },
                )
                .then((res) => {
                    if (this.searchInfo.classification) {
                        this.originTravelData = res.data;
                        this.travelData = _.filter(this.originTravelData, { Class1: this.searchInfo.classification });
                        this.pages = Math.ceil(this.originTravelData.length / this.itemsPerPage);
                        this.classification = _.compact(_.uniq(_.map(this.originTravelData, 'Class1')));
                    } else {
                        this.originTravelData = res.data;
                        this.travelData = this.originTravelData;
                        this.pages = Math.ceil(this.originTravelData.length / this.itemsPerPage);
                        this.classification = _.compact(_.uniq(_.map(this.originTravelData, 'Class1')));
                    }
                });
            this.loading = false;
        },
        getAuthorizationHeader() {
            //  填入自己 ID、KEY 開始
            let AppID = '780b35b0c5564cf4a01a8cc04a94b2e0';
            let AppKey = 'pXJzGuwN5klLwjeUEPQtXrfRWcM';
            //  填入自己 ID、KEY 結束
            let GMTString = new Date().toGMTString();
            let ShaObj = new jsSHA('SHA-1', 'TEXT');
            ShaObj.setHMACKey(AppKey, 'TEXT');
            ShaObj.update('x-date: ' + GMTString);
            let HMAC = ShaObj.getHMAC('B64');
            let Authorization = 'hmac username="' + AppID + '", algorithm="hmac-sha1", headers="x-date", signature="' + HMAC + '"';
            return { Authorization: Authorization, 'X-Date': GMTString };
        },
        getCity(address, city) {
            let cityName = '';
            if (address) {
                cityName = address.substr(0, 2);
            }
            if (city) {
                cityName = address.substr(0, 2);
            }
            return cityName;
        },
        // page
        nextPage() {
            if (this.page + 1 <= this.pages) this.page += 1;
        },
        formerPage() {
            if (this.page - 1 >= 1) this.page -= 1;
        },
        showTravelInfo(data) {
            this.travelInfoShow = true;
            this.travelInfoDetail = data;
        },
        onEmitTravelInfoDialog() {
            this.travelInfoShow = false;
        },
    },
    watch: {
        searchInfo: function () {
            this.getTravel();
        },
    },
};
</script>
