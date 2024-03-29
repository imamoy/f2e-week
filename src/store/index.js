import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const state = {
    searchInfo: {},
    taiwanCityLists: [
        {
            value: 'Taipei',
            name: '臺北市',
        },
        {
            value: 'NewTaipei',
            name: '新北市',
        },
        {
            value: 'Taoyuan',
            name: '桃園市',
        },
        {
            value: 'Taichung',
            name: '臺中市',
        },
        {
            value: 'Tainan',
            name: '臺南市',
        },
        {
            value: 'Kaohsiung',
            name: '高雄市',
        },
        {
            value: 'Keelung',
            name: '基隆市',
        },
        {
            value: 'Hsinchu',
            name: '新竹市',
        },
        {
            value: 'HsinchuCounty',
            name: '新竹縣',
        },
        {
            value: 'MiaoliCounty',
            name: '苗栗縣',
        },
        {
            value: 'ChanghuaCounty',
            name: '彰化縣',
        },
        {
            value: 'NantouCounty',
            name: '南投縣',
        },
        {
            value: 'YunlinCounty',
            name: '雲林縣',
        },
        {
            value: 'ChiayiCounty',
            name: '嘉義縣',
        },
        {
            value: 'Chiayi',
            name: '嘉義市',
        },
        {
            value: 'PingtungCounty',
            name: '屏東縣',
        },
        {
            value: 'YilanCounty',
            name: '宜蘭縣',
        },
        {
            value: 'HualienCounty',
            name: '花蓮縣',
        },
        {
            value: 'TaitungCounty',
            name: '臺東縣',
        },
        {
            value: 'KinmenCounty',
            name: '金門縣',
        },
        {
            value: 'PenghuCounty',
            name: '澎湖縣',
        },
        {
            value: 'LienchiangCounty',
            name: '連江縣',
        },
    ],
};

const mutations = {
    setSearchInfo(state, searchInfo) {
        state.searchInfo = searchInfo;
    },
    setSearchEmpty() {
        state.searchInfo = {};
    },
};

const actions = {
    setSearchInfo(context, searchInfo) {
        context.commit('setSearchInfo', searchInfo);
    },
    setSearchEmpty(context) {
        context.commit('setSearchEmpty');
    },
};

export default new Vuex.Store({
    state,
    mutations,
    actions,
});
