<template lang="pug">
#header
  v-container(fluid)
    v-row.align-center.justify-md-space-between
      v-col.pl-1(cols="12", md="3")
        v-btn.px-0(text :ripple='false' to='/')
          h1 Taiwan#[span GO]
      v-col.d-none.d-md-inline-flex(cols="12", md="6")
        v-form.search-bar(@submit='doSearch')
          v-row(no-gutters)
            v-col
              v-text-field(v-model='searchData.name' label="你想去哪裡？台南景點", width="100%", height="50", solo, hide-details, flat)
            v-col(cols='4' md='3')
              v-select(solo, v-model='searchData.classification' label='全部景點' :items='classifications' item-color='secondary' width="140", height="50", color='secondary' append-icon="icon-arrow", :menu-props='{ bottom: true, offsetY: true, nudgeBottom: 10 }' hide-details, flat)
            v-col(cols="auto")
              v-btn( type="submit", color="primary", width="85", height="50", tile, depressed)
                v-icon(size="34") icon-search
      v-col.lang-btn.text-right.pr-md-0(cols="1", md="3")
        v-btn.d-none.d-md-inline-flex.column-btn.px-2(text, color="white", min-width="40" :ripple='false')
          v-icon(size="30") icon-facebook
          span Facebook
        template
          v-menu(bottom offsetY)
            template(v-slot:activator="{ on, attrs }")
              v-btn.column-btn.px-2.ml-2(v-bind="attrs", v-on="on", color="white", min-width="30", text :ripple='false')
                v-icon(size="31") icon-internet
                span.d-none.d-md-inline-flex 語言
            v-list
              v-list-item(v-for="(item, index) in langList", :key="index")
                v-list-item-title {{ item.name }}
      v-col.pt-1.px-0.d-inline-flex.d-md-none(cols='12')
        v-btn.search-btn(width='100%' depressed rounded :ripple='false' @click='mobileSearch = true')
          v-icon(size='14' color='primary') icon-search-1
          span 你想去哪裡？台南景點
  v-dialog(v-model='mobileSearch' fullscreen hide-overlay transition="dialog-top-transition" content-class='mobile-search')
    v-card(dark flat)
      v-container
        v-row
          v-col(cols='12')
            v-btn(@click='mobileSearch = false' colos='gary' icon)
              v-icon.mr-2(size='25') icon-left-open
          v-col(cols='12')
            v-form.search-mobile-bar(@submit='doSearch')
              v-text-field.mb-4(v-model='searchData.name' label="你想去哪裡？台南景點", width="100%", height="45", solo, hide-details, rounded light)
              v-row
                v-col.pr-3(cols='8')
                  v-select(solo, v-model='searchData.classification' label='全部景點' :items='classifications' item-color='secondary' width="140", height="45", color='secondary' append-icon="icon-arrow", :menu-props='{ bottom: true, offsetY: true, nudgeBottom: 10 }' hide-details, rounded light)
                v-col.pl-2(cols='4')
                  v-btn(type="submit", color="primary", width="100%", height="48", rounded)
                    v-icon(size="34") icon-search
          v-col.mt-4(cols='12')
            v-card.pa-0(light flat)
              .f-sub-title 推薦景點
              v-list-item.recommend.my-4(to='/Taipei' @click='mobileSearch = false')
                v-list-item-icon.ma-0
                  v-icon(size='16' color='dark') icon-location
                v-list-item-content
                  v-list-item-title 台北景點
              v-list-item.recommend.my-4(to='/Kaohsiun4' @click='mobileSearch = false')
                v-list-item-icon.ma-0
                  v-icon(size='16' color='dark') icon-location
                v-list-item-content
                  v-list-item-title 高雄景點
</template>
<script>
import _ from 'lodash';

export default {
    name: 'Header',
    data: () => ({
        mobileSearch: false,
        langList: [
            {
                idx: 0,
                name: '繁體中文',
            },
        ],
        searchData: {
            name: '',
            classification: '',
        },
        classifications: [
            '文化類',
            '觀光工廠類',
            '自然風景類',
            '生態類',
            '遊憩類',
            '國家風景區類',
            '其他',
            '廟宇類',
            '體育健身類',
            '休閒農業類',
            '溫泉類',
            '古蹟類',
            '藝術類',
            '國家公園類',
            '都會公園類',
            '小吃/特產類',
            '森林遊樂區類',
        ],
    }),
    methods: {
        doSearch: function (e) {
            if (!_.isEmpty(this.searchData)) {
                if (this.$router.history.current.fullPath != '/search') {
                    this.$store.dispatch('setSearchInfo', this.searchData);
                    this.$router.push('/search');
                } else {
                    this.$store.dispatch('setSearchInfo', this.searchData);
                    this.$router.push('/result');
                }
                this.mobileSearch = false;
            } else {
                alert('請輸入內容才能搜尋喔！');
            }
            e.preventDefault();
        },
    },
};
</script>
