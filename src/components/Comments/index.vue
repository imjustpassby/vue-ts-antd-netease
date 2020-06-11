<template>
  <div class="comment-container">
    <a-skeleton active :loading="loading">
      <div>
        <h1>
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:24px; margin:0 6px;"
          >
            <use xlink:href="#icon-home_comment_fill" />
          </svg>
          &nbsp;热门评论
        </h1>
        <a-empty :description="false" v-if="hotComments.length === 0"></a-empty>
        <div v-else>
          <a-comment
            v-for="(item, index) in hotComments"
            :key="index"
            class="comment-list"
          >
            <p slot="author" style="font-size:14px;">
              {{ item.user.nickname }}
            </p>
            <a-avatar
              slot="avatar"
              :src="item.user.avatarUrl + '?param=50y50'"
              alt="avatar"
            />
            <p slot="content">{{ item.content }}</p>
            <a-comment v-for="(beReplied, idx) in item.beReplied" :key="idx">
              <p slot="author" style="font-size:14px;">
                {{ beReplied.user.nickname }}
              </p>
              <a-avatar
                slot="avatar"
                :src="beReplied.user.avatarUrl + '?param=50y50'"
                alt="avatar"
              />
              <p slot="content">{{ beReplied.content }}</p>
            </a-comment>
          </a-comment>
        </div>
      </div>
    </a-skeleton>
    <a-skeleton active :loading="loading">
      <div>
        <h1 style="margin-top:30px">
          <svg
            class="icon"
            aria-hidden="true"
            style="font-size:24px; margin:0 6px;"
          >
            <use xlink:href="#icon-home_comment_fill" />
          </svg>
          &nbsp;最新评论
        </h1>
        <a-empty
          :description="false"
          v-if="normalComments.length === 0"
        ></a-empty>
        <div v-else>
          <a-comment
            v-for="(item, index) in normalComments"
            :key="index"
            class="comment-list"
          >
            <p slot="author" style="font-size:14px;">
              {{ item.user.nickname }}
            </p>
            <a-avatar
              slot="avatar"
              :src="item.user.avatarUrl + '?param=50y50'"
              alt="avatar"
            />
            <p slot="content">{{ item.content }}</p>
            <a-comment v-for="(beReplied, idx) in item.beReplied" :key="idx">
              <p slot="author" style="font-size:14px;">
                {{ beReplied.user.nickname }}
              </p>
              <a-avatar
                slot="avatar"
                :src="beReplied.user.avatarUrl + '?param=50y50'"
                alt="avatar"
              />
              <p slot="content">{{ beReplied.content }}</p>
            </a-comment>
          </a-comment>
        </div>
      </div>
    </a-skeleton>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { IComment } from '@/utils/types';
@Component({
  components: {}
})
export default class Comments extends Vue {
  @Prop({ required: true })
  hotComments: IComment[] | undefined;
  @Prop({ required: true })
  normalComments: IComment[] | undefined;
  @Prop({ required: true })
  loading: boolean | undefined;
}
</script>
<style lang="less" scoped>
.comment-container {
  text-align: left;
  margin: 16px 0;
  padding-bottom: 100px;
  .comment-list {
    border-bottom: 1px dashed #ccc;
  }
  h1 {
    font-size: 24px;
    line-height: 2em;
    border-bottom: 1px solid #ccc;
  }
}
.ant-comment-content-detail {
  p {
    margin-bottom: 0;
  }
}
</style>
