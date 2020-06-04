<template>
  <div id="aplayer"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { ISongFormat } from '@/utils/types/index.ts';
import { namespace } from 'vuex-class';
import APlayer from 'aplayer';
import Bus from '@/utils/Bus';
const playlistModule = namespace('playlist');
@Component({
  components: {}
})
export default class APlayerComponent extends Vue {
  @playlistModule.Mutation('ADD_PLAYLIST')
  ADD_PLAYLIST!: Function;

  @playlistModule.Action('NEXT_SONG')
  NEXT_SONG!: Function;

  @playlistModule.Action('LAST_SONG')
  LAST_SONG!: Function;

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
    ap.on('ended', () => {
      Bus.$emit('nextSong');
    });
    Bus.$on('play', (song: ISongFormat) => {
      ap.list.clear();
      ap.list.add(song);
      ap.list.switch(0);
      ap.play();
    });
    Bus.$on('add', (list: ISongFormat[]) => {
      this.ADD_PLAYLIST(list);
    });
    Bus.$on('lastSong', () => {
      this.LAST_SONG()
        .then((song: ISongFormat) => {
          ap.list.clear();
          ap.list.add(song);
          ap.list.switch(0);
          ap.play();
        })
        .catch();
    });
    Bus.$on('nextSong', () => {
      this.NEXT_SONG()
        .then((song: ISongFormat) => {
          ap.list.clear();
          ap.list.add(song);
          ap.list.switch(0);
          ap.play();
        })
        .catch();
    });
    Bus.$on('clear', () => {
      ap.list.clear();
    });
  }
}
</script>
<style lang="scss" scoped>
#aplayer {
  text-align: left;
}
</style>
