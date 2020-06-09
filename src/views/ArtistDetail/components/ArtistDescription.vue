<template>
  <div>
    <h1>{{ artistName }}简介</h1>
    <p>{{ briefDesc }}</p>
    <div v-for="(item, index) in introduction" :key="index" class="desc-item">
      <h1>{{ item.ti }}</h1>
      <p style="white-space: pre-wrap;">{{ item.txt }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { getArtistDesc } from '@/api/artist';
import { IArtistIntroduction } from '@/utils/types';
@Component({
  components: {}
})
export default class ArtistDescription extends Vue {
  @Prop({ required: true })
  artistName: string | undefined;
  introduction: IArtistIntroduction[] = [];
  briefDesc = '';
  private async mounted() {
    const res = await getArtistDesc(Number(this.$route.query.id));
    this.introduction = res.data.introduction;
    this.briefDesc = res.data.briefDesc;
  }
}
</script>
<style lang="scss" scoped>
h1 {
  font-size: 16px;
  font-weight: bold;
  line-height: 2em;
}
.desc-item {
  margin: 24px 0;
  p {
    line-height: 1.5em;
  }
}
</style>
