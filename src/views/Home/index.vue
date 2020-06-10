<template>
  <div>
    <a-row>
      <a-col :span="14" :offset="5">
        <banner></banner>
        <recommend></recommend>
        <page-footer></page-footer>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Banner from './components/Banner.vue';
import PageFooter from '@/components/PageFooter/index.vue';
import Recommend from './components/Recommend.vue';
@Component({
  components: { Banner, Recommend, PageFooter }
})
export default class HomeRecommend extends Vue {}
</script>
