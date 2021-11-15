<template lang="pug">
#home
    v-overlay(:value='loading' opacity='0.7')
        v-progress-circular(indeterminate :size='70' :width='7' color='primary')
    .warning-notice-bar
        flicking(v-if='warningList.length > 0' :options="{ panel: '260px', moveType: 'freeScroll', bound: true, align: 'center', defaultIndex: 1, camera: '100%' }" :plugins='warningSetting')
            div(v-for='item, index in warningList')
                v-btn(color='secondary' height='46' depressed)
                    v-icon.mr-1 icon-warning
                    span {{ item.Name }} {{ item.Cycle }}

    .banner-wrapper.mb-5.mb-md-10.pb-md-5
        slick(ref='slick' :options='bannerSlickSetting')
            .banner-card
                v-card(flat @click="showTravelInfo(bannerList[1])")
                    v-img(src='@/assets/images/banner-2.png')
            .banner-card
                v-card(flat @click="showTravelInfo(bannerList[0])")
                    v-img(src='@/assets/images/banner-1.png')
            .banner-card
                v-card(flat @click="showTravelInfo(bannerList[2])")
                    v-img(src='@/assets/images/banner-3.png')

    section.mb-5.mb-md-10.pb-8
        v-container
            h2.text-center.f-title.mb-5.mb-md-8 從台灣發現更多美好#[br]兩大城市 教你拍起 EMO 圖！
            v-row.scroll-mobile
                v-col(col='12' md='6')
                    v-card.day-trip-card.pa-0(to='/Taipei')
                        v-img(width='100%' height='46vh' min-height='250' max-height='360' src='@/assets/images/travel-2.jpeg')
                        v-card-text.pa-0
                            v-card-title.f-card-titleBig 2021 台北旅遊景點 一日遊
                            span.travel-arrow.ml-auto 一起了解，你從未發現台北
                v-col(col='12' md='6')
                    v-card.day-trip-card.pa-0(to='/Kaohsiung')
                        v-img(width='100%' height='46vh' min-height='250' max-height='360' src='@/assets/images/travel-1.jpeg')
                        v-card-text.pa-0
                            v-card-title.f-card-titleBig 2021 高雄旅遊景點 一日遊
                            span.travel-arrow.ml-auto 一起了解，你從未發現高雄
    section.hot-travel.mb-5.mb-md-10.pb-8
        v-container.mb-2
            v-row.align-center(no-gutters)
                v-col(cols='8')
                    h2.f-title 人氣景點探索
                v-col(cols='4')
                    .cross-slider-arrows.d-flex.align-center.justify-end
                        v-btn.custom-slick-prev.mr-2.mr-md-0(color='primary' width='40' height='40' fab depressed)
                            v-icon(size='20') icon-left-open
                        .cross-slider-page.mx-4.mx-8
                            span 1
                            span /
                            span {{ hotTravelList.length }}
                        v-btn.custom-slick-next.ml-2.ml-md-0(color='primary' width='40' height='40' fab depressed)
                            v-icon(size='20') icon-right-open
        .cross-slider.hot-travel-slider
            slick(v-if='hotTravelList.length > 0' ref='hotTravelSlick' :options='hotTravelSlickSetting')
                .hot-travel-card(v-for='item, index in hotTravelList')
                    v-card(flat @click='showTravelInfo(item)')
                        v-img(:src='item.Picture.PictureUrl1')
                        v-card-title.f-card-titleBig {{ getCity(item.Address) }}
                    v-card-subtitle {{ item.Name }}
        v-container.text-center
            v-btn.more-btn.mt-0.mt-md-5(color='primary' depressed x-large to='/hotTravel') 了解更多詳情
                v-icon(size='22') icon-right

    section.writer-travel.mb-5.mb-md-10.pb-8
        v-container.mb-0.mb-md-2
            v-row.writer-travel-head.align-center(no-gutters)
                v-col(cols='9' md='12')
                    h2.f-title.text-md-center 〔 投稿專區 〕
                v-col(cols='3' md='auto')
                    .cross-slider-arrows.d-flex.align-center.justify-end
                        v-btn.custom-slick-prev.mr-2.mr-md-0(color='primary' width='40' height='40' fab depressed)
                            v-icon(size='20') icon-left-open
                        .cross-slider-page.mx-4.mx-8
                            span 1
                            span /
                            span 4
                        v-btn.custom-slick-next.ml-2.ml-md-0(color='primary' width='40' height='40' fab depressed)
                            v-icon(size='20') icon-right-open
        .cross-slider.writer-travel-slider
            slick(ref='slick' :options='writerTravelSlickSetting')
                .writer-travel-card
                    v-card(flat)
                        v-img(src='@/assets/images/writer-travel-1.png')
                    v-card-text
                        v-card-title.pa-0
                            span.q-icon Q
                            span.q-text 關於墾丁回憶...
                        v-row.mt-2(no-gutters)
                            v-col(cols='12' md='10')
                                p.mb-1 人與景點猶如夏天般的炙熱，是我所熟悉墾丁。
                            v-col.text-right(cols='12' md='2')
                                v-icon(size='22') icon-right
                .writer-travel-card
                    v-card(flat)
                        v-img(src='@/assets/images/writer-travel-2.png')
                    v-card-text
                        v-card-title.pa-0
                            span.q-icon Q
                            span.q-text 對於台北巷弄早午餐？
                        v-row.mt-2(no-gutters)
                            v-col(cols='12' md='10')
                                p.mb-1 台北的巷弄藏著不同風格早午餐，是我每次來到台北的動力...
                            v-col.text-right(cols='12' md='2')
                                v-icon(size='22') icon-right
                .writer-travel-card
                    v-card(flat)
                        v-img(src='@/assets/images/writer-travel-3.png')
                    v-card-text
                        v-card-title.pa-0
                            span.q-icon Q
                            span.q-text 廟的文化
                        v-row.mt-2(no-gutters)
                            v-col(cols='12' md='10')
                                p.mb-1 每當去不同的地方，就醫定要到附近的廟宇感受不同的背景時空及信仰。
                            v-col.text-right(cols='12' md='2')
                                v-icon(size='22') icon-right
        v-container.text-center
            v-btn.more-btn.mt-0.mt-md-5(color='primary' depressed x-large) 了解更多詳情
                v-icon(size='22') icon-right

    section.notice-section.mb-5.mb-md-10.pb-8
        v-container
            h2.f-title.text-center.mb-5 〔 活動告示 〕
            v-list
                v-list-item.notice-list
                    v-row.align-center
                        v-col.d-flex.align-center(cols='12' md='6')
                            span.date 2021.10.29
                            .notice-type.type-1 疫情說明
                        v-col(cols='12' md='6')
                            p 【 二級警戒延長至 11/15 】五大口罩鬆綁場所一次看！
                v-list-item.notice-list
                    v-row.align-center
                        v-col.d-flex.align-center(cols='12' md='6')
                            span.date 2021.10.29
                            .notice-type.type-2 活動展覽
                        v-col(cols='12' md='6')
                            p 【 2021臺北燈節 12/17-26 】#[br]臺北燈節重頭戲為「百變豬寶亮晶晶」主燈秀，吸引上萬民眾參觀及欣賞可愛模樣。
                v-list-item.notice-list
                    v-row.align-center
                        v-col.d-flex.align-center(cols='12' md='6')
                            span.date 2021.10.29
                            .notice-type.type-3 暫停辦理
                        v-col(cols='12' md='6')
                            p 【 2021月津港燈節 】#[br]疫情瞬息萬變，因此確定月津港燈節延至明年辦理。#[br]我們 2020 見！
        .text-center
            v-btn.more-btn.mt-0.mt-md-5(color='primary' depressed x-large) 了解更多詳情
                v-icon(size='22') icon-right

    section.mb-5.mb-md-10.pb-8
        v-container
            v-card.recruit-card(flat)
                v-card-title 募集
                v-card-subtitle
                    span 歡迎投稿 讓台灣更美好
                v-card-text 號召熱愛台灣的旅遊人，需要你們熱情投稿來創造台灣旅遊勝地。#[br]台灣有許多未被發現美好景點，不管是鄉村、網美以及廟宇的景點等等，都需要你們一起分享！
                .text-center
                    v-btn.more-btn(color='primary' depressed x-large) 了解更多詳情
                        v-icon(size='22') icon-right
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
import { AutoPlay } from '@egjs/flicking-plugins';
import travelInfo from '@/components/TravelInfo';
import Slick from 'vue-slick';
const warningSetting = [new AutoPlay({ duration: 2000, direction: 'NEXT', stopOnHover: false })];

export default {
    name: 'Home',
    components: {
        Slick,
        travelInfo,
    },
    data: () => ({
        loading: false,
        travelInfoShow: false,
        travelInfo: {},
        travelInfoDetail: '',
        list: [0, 1, 2, 3, 4],
        warningSetting,
        warningList: [],
        bannerList: [
            {
                Name: '奇美博物館',
                Picture: {
                    PictureUrl1: 'https://www.chimeimuseum.org/uploads/612f3e9d11eeb.jpg',
                },
                DescriptionDetail:
                    '奇美博物館，位於臺灣臺南市仁德區，為奇美實業創辦人許文龍創立，是臺灣館藏最豐富的私人博物館、美術館。以典藏西洋藝術品為主，展出藝術、樂器、兵器與自然史四大領域。樂器領域，擁有全球數量最多小提琴收藏，其中包含世界各大製琴師名作。藝術方面，典藏台灣最完整西方繪畫雕塑，目標為建構出基礎西洋藝術史脈絡。',
            },
            {
                Name: '駁二特區',
                Picture: {
                    PictureUrl1: 'https://pier2.org/upload/others/files/GLR4062.jpg',
                },
                DescriptionDetail:
                    '彩虹地景由6個顏色組成12條斜紋色塊，上面有著白色的KAOHSIUNG字樣，總面積18 x 20公尺為全台最大。這一片彩虹將不分四季、不看天氣、不只出現在雨後的陽光裡，以港邊的倉庫與藍天為背景，成為駁二最新、最有愛的打卡熱點。',
            },
            {
                Name: '夜訪小野柳',
                Picture: {
                    PictureUrl1: 'https://tour.taitung.gov.tw/image/29013/1024x768',
                },
                DescriptionDetail:
                    '「夜訪小野柳」是每年5~10月台東夜間極為熱門活動，以夜間寄居蟹生態探索為主軸，搭配海濱動植物及觀星賞月，受到許多遊客的青睞，考量小野柳之環境負荷量，今年特將「夜訪小野柳」轉型為環境教育課程方案，結合生態與旅遊，寓教育於環境保護之中。除了由專業團隊「荒野保護協會」進駐協助營運外，更落實使用者付費，所有課程及活動將開始收費，每人新台幣100元，6歲以下免費，且參加者可免收入園停車清潔費，另可獲公務人員學習時數及環境教育時數。',
            },
        ],
        bannerSlickSetting: {
            variableWidth: true,
            centerMode: true,
            slidesToShow: 1,
            initialSlide: 1,
            speed: 500,
            arrows: false,
            dots: true,
            infinite: true,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        dots: false,
                    },
                },
            ],
        },
        hotTravelSlickSetting: {
            variableWidth: true,
            slidesToShow: 3,
            speed: 500,
            dots: false,
            infinite: false,
            nextArrow: '.hot-travel .custom-slick-prev',
            prevArrow: '.hot-travel .custom-slick-next',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    },
                },
            ],
        },
        hotTravelList: [],
        writerTravelSlickSetting: {
            variableWidth: true,
            slidesToShow: 2,
            speed: 500,
            dots: false,
            infinite: false,
            nextArrow: '.writer-travel .custom-slick-prev',
            prevArrow: '.writer-travel .custom-slick-next',
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        slidesToShow: 2,
                    },
                },
            ],
        },
        noticeList: [],
    }),
    mounted() {
        this.loading = true;
        this.getStop();
        this.getHotTravel();
        this.getNotice();
        this.loading = false;
    },
    methods: {
        getStop() {
            axios
                .get("https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=contains(Cycle,'暫停辦理')+&$format=JSON", {
                    headers: this.getAuthorizationHeader(),
                })
                .then((res) => {
                    this.warningList = res.data;
                });
            this.loading = false;
        },
        getNotice() {
            axios
                .get('https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$orderby=Cycle&$top=5&$format=JSON', {
                    headers: this.getAuthorizationHeader(),
                })
                .then((res) => {
                    this.noticeList = res.data;
                });
            this.loading = false;
        },
        getHotTravel() {
            axios
                .get('https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=100&$format=JSON', {
                    headers: this.getAuthorizationHeader(),
                })
                .then((res) => {
                    const data = _.orderBy(res.data, 'Picture.PictureUrl1');
                    this.hotTravelList = _.sampleSize(_.shuffle(data), 10);
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
        getCity(address) {
            let cityName = '';
            if (address) {
                cityName = address.substr(0, 2);
            }
            return cityName;
        },
        showTravelInfo(data) {
            this.travelInfoShow = true;
            this.travelInfoDetail = data;
        },
        onEmitTravelInfoDialog() {
            this.travelInfoShow = false;
        },
        getDate(val) {
            const date = val.getUTCFullYear() + '/' + (val.getUTCMonth() + 1) + '/' + val.getUTCDate();
            return date;
        },
    },
};
</script>
