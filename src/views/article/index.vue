<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" @click-left="$router.back()" left-arrow title="头条新闻"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div v-if="!art.title" class="loading-wrap">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div v-if="statusCode === 200" class="article-detail">
        <!-- 文章标题 -->
        <h1 class="article-title">{{art.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="art.aut_photo" />
          <div slot="title" class="user-name">{{art.aut_name}}</div>
          <div slot="label" class="publish-date">{{art.pubdate}}</div>
          <van-button class="follow-btn" type="info" color="#3296fa" round size="small" icon="plus">关注</van-button>
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
          >已关注</van-button> -->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content markdown-body" v-html="art.content"></div>
        <van-divider>正文结束</van-divider>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div v-else-if="statusCode === 404" class="error-wrap">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div v-else class="error-wrap">
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button @click="getArt" class="retry-btn">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 底部区域 -->
    <div class="article-bottom">
      <van-button class="comment-btn" type="default" round size="small">写评论</van-button>
      <van-icon name="comment-o" info="123" color="#777" />
      <van-icon color="#777" name="star-o" />
      <van-icon color="#777" name="good-job-o" />
      <van-icon name="share" color="#777777"></van-icon>
    </div>
    <!-- /底部区域 -->
  </div>
</template>

<script>
import { getArticleById } from '@/api/article.js'
// import './github-markdown.css'
export default {
  name: 'Article',
  props: {
    // 文章id 通过配置了路由 props 动态参数传入
    aid: {
      // type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      art: [],
      statusCode: -1,
      imgSrcList: []
    }
  },
  methods: {
    async getArt() {
      try {
        if (Math.random() > 0.5) throw new Error('模拟出错了哦')
        const res = await getArticleById(this.aid)
        this.art = res.data.data
        this.statusCode = res.status
        // nextTick 回调函数 会在最近的由data 数据改变引发的视图重绘后执行
        this.$nextTick(() => {
          // 查找文章内容中的图片
          const arrImg = document.querySelector('.markdown-body').querySelectorAll('img')
          console.log(arrImg)
          arrImg.forEach((x) => this.imgSrcList.push(x.src))
          console.log(this.imgSrcList)
        })
      } catch (error) {
        if (error) {
          if (error.response && error.response.status === 404) this.statusCode = 404
          else this.statusCode = 507
          this.art.title = '出错了'
        }
      }
    }
  },
  created() {
    // 请求文章数据详情
    this.getArt()
  }

}
</script>
<style scoped lang="less">
.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
