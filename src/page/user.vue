<template>
    <div>
      <nv-head></nv-head>
      <div class="user_content">
        <div class="information">
          <img :src='user.avatar_url' class="avatar">
          <div class="name">{{user.loginname}}</div>
          <div class="create_at">注册时间:{{user.create_at|getTimeAgo}}</div>
          <div class="score">积分：{{user.score}}</div>
        </div>
        <div class="recent_topics">
          <h1>最近回复</h1>
          <ul>
            <li class="topic_item" v-for='item in user.recent_replies'>

              <div class="left">
                <router-link :to="{name:'user',params:{name:item.author.loginname}}" @click.native="flushCom">
                  <img :src='item.author.avatar_url' class="avatar">
                </router-link>
                <div class="content">
                  <router-link :to="{name:'topic',params:{id:item.id}}" class='qwe'>
                    <div class="title">{{item.title}}</div>
                  </router-link>
                  <div class="name">{{item.author.loginname}}</div>
                </div>
              </div>
              <div class="right">{{item.last_reply_at|getTimeAgo}}</div>

            </li>
          </ul>
        </div>
        <div class="recent_topics">
          <h1>最新发布</h1>
          <ul>
            <li class="topic_item" v-for='item in user.recent_topics'>
              <div class="left">
                <router-link :to="{name:'user',params:{name:item.author.loginname}}" @click.native="flushCom">
                  <img :src='item.author.avatar_url' class="avatar">
                </router-link>
                <div class="content">
                  <router-link :to="{name:'topic',params:{id:item.id}}" class='qwe'>
                    <div class="title">{{item.title}}</div>
                  </router-link>
                  <div class="name">{{item.author.loginname}}</div>
                </div>
              </div>
              <div class="right">{{item.last_reply_at|getTimeAgo}}</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import base from '../configs/base.js'
  import nvHead from '../components/header.vue'
  import utils from '../lib/utils.js';
    export default{
        data(){
            return{
                user:{}
            }
        },
        mounted(){
          // 获取url传的tab参数
          this.useranme = this.$route.params.name||'';
          // 获取url传的tab参数

          this.$http.get(base.target+'/user/'+this.useranme).then(response => {
            this.user = response.data.data
          console.log(this.user)
          }, response => {
            // error callback
          })
        },
        methods:{
          flushCom:function(){
            this.$router.go(0);
            console.log(1)
          }
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
<style lang="scss" scoped>
  .user_content{
    max-width: 1200px;
    margin: 20px auto 20px;
    .information{
      background: #fff;
      border-radius: 5px;
      padding: 20px;
      .avatar{
        width: 150px;
        border-radius: 50%;
        border: 1px solid rgba(50,65,87,0.3);
      }
      .name{
        font-size: 24px;
        font-weight: bold;
      }
    }
    .recent_topics{
      background: #fff;
      margin-top: 20px;
      border-radius: 5px;
      h1{
        text-align: left;
        padding: 10px 20px;
        border-bottom: 1px solid #d2d2d2;
      }
      ul{
        .topic_item{

            display: flex;
            border-bottom: 1px solid #d2d2d2;
            text-align: left;
            padding: 10px 20px;
            justify-content: space-between;
            align-items: center;
            color: #2c3e50;
            .left{
              display: flex;
              flex-direction: row;
              a{
                height: 50px;
                img{
                  width: 50px;
                  height: 50px;
                  border-radius: 50%;
                }
              }
              .content{
                margin-left: 10px;
                a{
                  color: #2c3e50;
                  .title{

                  }
                }
                a:hover{
                  text-decoration: underline;
                }
                .name{
                  color: #949494;
                }
              }
            }
            .right{

            }


        }
      }
    }
    .recent_replies{
      background: #fff;
      margin-top: 20px;
      border-radius: 5px;
    }
  }
</style>
