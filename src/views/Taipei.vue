<template lang="pug">
#taipei.travel-list-page.py-5
    v-overlay(:value='loading' opacity='0.7')
        v-progress-circular(indeterminate :size='70' :width='7' color='primary')
    v-container
        v-breadcrumbs.px-0(large)
            v-breadcrumbs-item 首頁
            v-breadcrumbs-item 台北景點
        h2.f-title.text-center 台北景點
        div(v-if='travelData.length > 1')
        v-data-iterator(v-if='travelData.length > 1' :items='travelData' :items-per-page.sync='itemsPerPage' :page.sync='page' hide-default-footer)
            template(v-slot:header)
                v-row.filter-row.align-center.my-5
                    v-col(cols='12' md='3')
                        v-select(v-model='searchLocation' :items='zipCodes' item-value='value' item-text='name' label='地區' append-icon='icon-down-open' clear-icon='icon-cancel-1' item-color='secondary' color='secondary' :menu-props='{ bottom: true, offsetY: true, nudgeBottom: 10 }' solo flat clearable hide-details)
                    v-col(cols='12' md='9')
                        v-chip-group(v-model='classificationBy' prev-icon='icon-left-open' next-icon='icon-right-open' show-arrows)
                            v-chip(v-for='item,index in classification' :key='index' input-value='item') {{ item }}
            template(v-slot:default='props')
                v-row.mt-10
                    v-col(cols='12' md='4' v-for='item, index in props.items' :key='index')
                        .hot-travel-card.mb-2(@click='showTravelInfo(item)')
                            v-card(flat)
                                v-img(:src='item.Picture.PictureUrl1')
                                v-card-title.f-card-titleBig {{ getZipCodeName(item.ZipCode) }}
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
    name: 'taipei',
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
        classification: '',
        classificationBy: '',
        page: 1,
        itemsPerPage: 12,
        pages: '',
        searchLocation: '',
        zipCodes: [
            { value: 100, name: '中正' },
            { value: 103, name: '大同' },
            { value: 104, name: '中山' },
            { value: 105, name: '松山' },
            { value: 106, name: '大安' },
            { value: 108, name: '萬華' },
            { value: 110, name: '信義' },
            { value: 111, name: '士林' },
            { value: 112, name: '北投' },
            { value: 114, name: '內湖' },
            { value: 115, name: '南港' },
            { value: 116, name: '文山' },
        ],
    }),
    mounted() {
        this.loading = true;
        this.getTravel();
        this.loading = false;
    },
    methods: {
        getTravel() {
            axios
                .get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?&format=JSON', {
                    headers: this.getAuthorizationHeader(),
                })
                .then((res) => {
                    this.originTravelData = res.data;
                    this.travelData = _.orderBy(this.originTravelData, 'Picture.PictureUrl1');
                    this.pages = Math.ceil(this.originTravelData.length / this.itemsPerPage);
                    this.classification = _.compact(_.uniq(_.map(this.originTravelData, 'Class1')));
                });
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
        getZipCodeName(zipCodes) {
            let zipName = '';
            if (zipCodes) {
                const code = _.toNumber(zipCodes);
                const zipGroup = _.filter(this.zipCodes, { value: code });
                zipName = zipGroup[0].name;
            }
            return zipName;
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
        classificationBy: function (index) {
            const className = this.classification[index];
            const code = _.toString(this.searchLocation);
            if (!index) {
                if (this.searchLocation) {
                    this.travelData = _.filter(this.originTravelData, { ZipCode: code });
                } else {
                    this.travelData = this.originTravelData;
                }
            } else {
                if (!this.searchLocation) {
                    this.travelData = _.filter(this.originTravelData, { Class1: className });
                } else if (this.searchLocation) {
                    this.travelData = _.filter(this.originTravelData, { ZipCode: code, Class1: className });
                }
            }
            this.pages = Math.ceil(this.travelData.length / this.itemsPerPage);
        },
        searchLocation: function (zipCode) {
            const code = _.toString(zipCode);
            if (!zipCode) {
                if (this.classificationBy) {
                    this.travelData = _.filter(this.originTravelData, { Class1: this.classification[this.classificationBy] });
                } else {
                    this.travelData = this.originTravelData;
                }
            } else {
                if (!this.classificationBy) {
                    this.travelData = _.filter(this.originTravelData, { ZipCode: code });
                } else if (this.classificationBy) {
                    this.travelData = _.filter(this.originTravelData, {
                        ZipCode: code,
                        Class1: this.classification[this.classificationBy],
                    });
                }
            }
            this.pages = Math.ceil(this.travelData.length / this.itemsPerPage);
        },
    },
};
</script>
