<template>
  <van-cell :to="'/article/' + article.art_id" class="article-item">
    <!-- 标题插槽 -->
    <div slot="title" class="title">{{article.title}}</div>
    <!-- 描述插槽 -->
    <div slot="label">
      <!-- 三张图 -->
      <div v-if="article.cover.type === 3">
        <van-image v-for="(img,i) in article.cover.images" :key="i" width="100" height="100" :src="article.cover.images[0]" />
      </div>
      <!-- 文章信息描述 -->
      <div>
        <span>{{article.aut_name}}</span>
        <span> {{article.comm_count}}评论</span>
        <span>{{article.pubdate | relativeTime}}</span>
      </div>
    </div>
    <!-- 默认插槽 图片显示 -->
    <van-image slot="default" class="right-cover" v-if="article.cover.type === 1" width="100" height="100" :src="article.cover.images[0]" />
  </van-cell>
</template>

<script>
export default {
  props: ['article']
}
</script>

<style lang="less" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #3a3a3a;
  }

  .van-cell__value {
    flex: unset;
    width: 232px;
    height: 146px;
    padding-left: 25px;
  }

  .right-cover {
    width: 232px;
    height: 146px;
  }

  .label-info-wrap span {
    font-size: 22px;
    color: #b4b4b4;
    margin-right: 25px;
  }

  .cover-wrap {
    display: flex;
    padding: 30px 0;
    .cover-item {
      flex: 1;
      height: 146px;
      &:not(:last-child) {
        padding-right: 4px;
      }
      /deep/.cover-item-img {
        width: 100%;
        height: 146px !important;
      }
    }
  }
}
</style>
