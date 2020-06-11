<template>
  <div class="song-comment">
    <div class="write-comment-container">
      <a-row>
        <a-col :span="18" :offset="1">
          <a-textarea
            class="write-comment"
            placeholder="发表精彩评论"
            v-model="commentContent"
            :auto-size="{ minRows: 4, maxRows: 4 }"
          />
        </a-col>
        <a-col :span="2">
          <a-button
            type="primary"
            class="comment-btn"
            :disabled="!this.commentContent"
            @click="sendComment"
          >
            发表
          </a-button>
        </a-col>
      </a-row>
    </div>
    <comments
      :hot-comments="hotComments"
      :normal-comments="normalComments"
      :loading="loading"
    ></comments>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { getCommentMusic, sendComment } from '@/api/comment';
import { IComment } from '@/utils/types';
import Comments from '@/components/Comments/index.vue';
@Component({
  components: { Comments }
})
export default class SongComment extends Vue {
  hotComments: IComment[] = [];
  normalComments: IComment[] = [];
  commentContent = '';
  loading = true;
  @Watch('$route', { deep: true })
  reset(to: any, from: any) {}
  private async mounted() {
    await this.getComments();
  }

  async getComments() {
    const res = await getCommentMusic(Number(this.$route.query.id));
    this.normalComments = res.data.comments;
    this.hotComments = res.data.hotComments;
    this.loading = false;
  }

  async sendComment() {
    sendComment({
      type: 0,
      id: Number(this.$route.query.id),
      content: this.commentContent.trim()
    })
      .then(async res => {
        this.$message.success('评论成功！');
        this.commentContent = '';
        this.loading = true;
        await this.getComments();
        this.loading = false;
      })
      .catch(err => {
        this.$message.error('因合作方要求，该资源不能评论');
      });
  }
}
</script>
<style lang="less" scoped>
.write-comment-container {
  position: relative;
  height: 130px;
  margin: 16px 0;
  .write-comment {
    display: block;
    margin: 16px auto;
  }
  .comment-btn {
    margin: 80px 0px 16px 16px;
  }
}
</style>
