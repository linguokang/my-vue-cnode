<template>
  <div>
    <nv-head></nv-head>
    <div class="topic">
      <h1 class="title">{{topic.title}}</h1>
      <div class="tap">
        <span class="time">发布于 {{topic.create_at|getTimeAgo}} </span>
        <span class="author">作者 {{topic.author.loginname}}</span>
        <span class="visit">{{topic.visit_count}} 次浏览</span>
      </div>

      <section class='markdown-body topic-content' v-html="topic.content">

      </section>

      <div class="replies">
        <div class="replies_count">{{topic.replies.length}} 条回复</div>
        <ul class="replies_list">
          <li v-for="item in topic.replies">
            <div class="replie_author">
              <router-link :to="{name:'user',params:{name:item.author.loginname}}">
                <img class="avatar" :src="item.author.avatar_url">
              </router-link>
              <span class="name">{{item.author.loginname}}</span>
            </div>
            <div class="replie_content" v-html="item.content">

            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import nvHead from '../components/header.vue'
  import base from '../configs/base.js'
  import utils from '../lib/utils.js';

    export default{
        data(){
            return{
              topic:{},
              topicId: '5433d5e4e737cbe96dcef312',
            }
        },
        mounted(){
          // 获取url传的id参数
          this.topicId = this.$route.params.id;

          this.$http.get(base.target+'/topic/'+this.topicId).then(response => {
            this.topic = response.data.data
            console.log(this.topics)
        }, response => {
            // error callback
          })
        },
        filters: {
          getTimeAgo(time) {
            return utils.getTimeAgo(time);
          }
        },
        components:{
          nvHead
        }
    }
</script>
<style lang="scss">
  .topic{
    max-width: 1200px;
    background: #fff;
    margin: 0 auto;
    .title{
      font-size: 24px;
    }
    padding: 20px;
    .tap{
       display: flex;
      border-bottom: 1px solid #888ed2;
      margin: 15px 0;
      padding-bottom: 10px;
       span{
         margin: 0 10px;
       }
    }
    .topic-content{
      text-align: left;
      margin: 0 20px;
      .markdown-text{
        p{
          font-size: 15px;
          line-height: 25px;
          overflow: auto;
          margin: 20px 0;
        }
        img{
          max-width: 100%;
        }
        code{
          width: 100%;
        }
      }
    }
    .replies{
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      .replies_count{
        text-align: left;
        background: #e7e7e7;
        line-height: 40px;
        padding: 0 10px;
        border-radius: 5px;
      }
      .replies_list{
        li{
          border-bottom: 1px solid #b6b6b6;
          padding: 10px;
          .replie_author{
            display: flex;
            align-items: center;
            .avatar{
              width: 30px;
            }
            .name{
              margin-left: 10px;
            }
          }
          .replie_content{
            text-align: left;
            margin-left: 40px;
            .markdown-text{
              p{
                font-size: 15px;
                line-height: 25px;
                overflow: auto;
              }
              img{
                max-width: 100%;
              }
              code{
                width: 100%;
              }
            }
          }
        }
      }
    }

  }

</style>
