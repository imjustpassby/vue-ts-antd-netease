<template>
  <div id="aplayer"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import APlayer from 'aplayer';
@Component({
  components: {}
})
export default class APlayerComponent extends Vue {
  private mounted() {
    const options = {
      container: document.getElementById('aplayer'),
      autoplay: true,
      volume: 1,
      loop: 'none',
      lrcType: 2,
      listFolded: true,
      listMaxHeight: '300px',
      theme: '#FFDB00'
    };
    const ap = new APlayer(options);
  }
}
</script>
