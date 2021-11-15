<template lang="pug">
#kaohsiung.travel-list-page.py-5
    v-overlay(:value='loading' opacity='0.7')
        v-progress-circular(indeterminate :size='70' :width='7' color='primary')
    v-container
        v-breadcrumbs.px-0(large)
            v-breadcrumbs-item 首頁
            v-breadcrumbs-item 高雄景點
        h2.f-title.text-center 高雄景點
        v-data-iterator(:items='travelData' :items-per-page.sync='itemsPerPage' :page.sync='page' hide-default-footer)
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
                .cross-slider-arrows.d-flex.align-center.justify-center.my-10(v-if='travelData.length > 1')
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
    name: 'kaohsiung',
    components: {
        travelInfo,
    },
    data: () => ({
        loading: false,
        travelInfoShow: false,
        travelInfo: {},
        travelInfoDetail: '',
        location: '高雄',
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
            { value: 800, name: '新興' },
            { value: 801, name: '前金' },
            { value: 802, name: '苓雅' },
            { value: 803, name: '鹽埕' },
            { value: 804, name: '鼓山' },
            { value: 805, name: '旗津' },
            { value: 806, name: '前鎮' },
            { value: 807, name: '三民' },
            { value: 811, name: '楠梓' },
            { value: 812, name: '小港' },
            { value: 813, name: '左營' },
            { value: 814, name: '仁武' },
            { value: 815, name: '大社' },
            { value: 820, name: '岡山' },
            { value: 821, name: '路竹' },
            { value: 822, name: '阿蓮' },
            { value: 823, name: '田寮' },
            { value: 824, name: '燕巢' },
            { value: 825, name: '橋頭' },
            { value: 826, name: '梓官' },
            { value: 827, name: '彌陀' },
            { value: 828, name: '永安' },
            { value: 829, name: '湖內' },
            { value: 830, name: '鳳山' },
            { value: 831, name: '大寮' },
            { value: 832, name: '林園' },
            { value: 833, name: '鳥松' },
            { value: 840, name: '大樹' },
            { value: 842, name: '旗山' },
            { value: 843, name: '美濃' },
            { value: 844, name: '六龜' },
            { value: 845, name: '內門' },
            { value: 846, name: '杉林' },
            { value: 847, name: '甲仙' },
            { value: 848, name: '桃源' },
            { value: 849, name: '那瑪夏' },
            { value: 851, name: '茂林' },
            { value: 852, name: '茄萣' },
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
                .get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Kaohsiung?$format=JSON', {
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
