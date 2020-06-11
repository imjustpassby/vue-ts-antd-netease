<template>
  <a-row>
    <a-col :span="14" :offset="5">
      <a-row>
        <a-col :span="4">
          <choose-category></choose-category>
        </a-col>
        <a-col :span="20">
          <transition name="fade-transform" mode="out-in">
            <router-view />
          </transition>
        </a-col>
      </a-row>
    </a-col>
  </a-row>
</template>

<script lang="ts">
import { ArtistByCategoryParams, IArtistByCategory } from '@/utils/types';
import { Component, Vue, Watch } from 'vue-property-decorator';
import ChooseCategory from './components/ChooseCategory.vue';
@Component({
  components: { ChooseCategory }
})
export default class ArtistListWithCate extends Vue {}
</script>
