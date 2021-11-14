<template lang="pug">
v-footer#Footer(color='yellow')
  v-container
    v-row.nav-lists(no-gutters)
      v-col(cols='12' md='auto')
        v-btn(text :ripple='false' width='100%') 關於 Taiwan GO
      v-col(cols='3' md='auto')
        .d-flex.flex-column
          v-btn(text :ripple='false' width='100%') 投稿說明
          v-btn(text :ripple='false' width='100%') 版權所有
      v-col(cols='3' md='auto')
        .d-flex.flex-column
          v-btn(text :ripple='false' width='100%') 最新消息
          v-btn(text :ripple='false' width='100%') 展覽資訊
          v-btn(text :ripple='false' width='100%') 景點告示
      v-col(cols='3' md='auto')
        .d-flex.flex-column
          v-btn(text :ripple='false' width='100%') 友善旅遊
      v-col(cols='3' md='auto')
        .d-flex.flex-column
          v-btn(text :ripple='false' width='100%') 活動行事曆
    v-row.align-center(no-gutters)
      v-col.py-0(cols='6' md='12' order='1')
        .logo Taiwan#[span GO]
      v-col.py-0(cols='12' md='10' order='3' order-md='2')
        .copyright
          span Design 芬妮
          span 更新日期：2021.11.03
          span 圖片來源：https://unsplash.com/
      v-col.text-right.py-0(cols='6' md='2' order='2' order-md='3')
        v-btn.follow-btn(text color='white')
          span 關注我
          v-icon.ml-2(size="24") icon-facebook
</template>
<script>
export default {
    name: 'Footer',
    data: () => ({}),
};
</script>
