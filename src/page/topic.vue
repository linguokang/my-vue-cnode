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
            <div class="replies_box">
              <div class="replies_left">
                <div class="replie_author">
                  <router-link :to="{name:'user',params:{name:item.author.loginname}}">
                    <img class="avatar" :src="item.author.avatar_url">
                  </router-link>
                  <span class="name">{{item.author.loginname}}</span>
                </div>
                <div class="replie_content" v-html="item.content">

                </div>
              </div>
              <div class="replies_right">
                <i class="el-icon-star-off" v-if="!isUps(item.ups)" @click="like(item.id,item.ups)"></i>
                <i class="el-icon-star-on" v-if="isUps(item.ups)" @click="like(item.id,item.ups)"></i>
                {{item.ups.length}}
                <i class="el-icon-edit" @click='addReply(item.id)'></i>
              </div>
            </div>
            <div class="replies_comment">
              <div class="markdown"   v-if="userInfo.userId && curReplyId === item.id">
                <div class="title">添加回复</div>
                <markdown-editor v-model="content[item.id]" ref="markdownEditor"></markdown-editor>
                <el-button type="primary" @click='addReplies(item.id)'>回复</el-button>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <div class="markdown">
        <div class="title">添加回复</div>
        <markdown-editor v-model="content[topic.id]" ref="markdownEditor"></markdown-editor>
        <el-button type="primary" @click='addReplies(topic.id)'>回复</el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import nvHead from '../components/header.vue'
  import base from '../configs/base.js'
  import utils from '../lib/utils.js';
  import router from '../router'
  import {mapGetters} from 'vuex';
  import markdownEditor from 'vue-simplemde/src/markdown-editor'

  require ('../lib/simplemde.min.css');
    export default{
        data(){
            return{
              topic:{
                author:{
                  loginname:''
                },
                content:'',
                replies:[
                  {
                    author:{
                      loginname:''
                    }
                  }
                ]
              },
              content:{},
              curReplyId: ''
            }
        },
        mounted(){
          this.fetchDate()
          this.initArray()
        },
        computed: {
          ...mapGetters({
            userInfo: 'getUserInfo'
          }),
        simplemde () {
          return this.$refs.markdownEditor.simplemde
        }
        },
        methods:{
          addReply(id) {
            if(this.curReplyId == id){
              this.curReplyId = '';
            }else{
              this.curReplyId = id;
            }

            if (!this.userInfo.userId) {
              this.$router.push({
                name: 'login',
                params: {
                  redirect: encodeURIComponent(this.$route.path)
                }
              });
            }
          },
          addReplies(id){
            if (!this.userInfo.userId) {
              this.$router.push({
                name: 'login',
                params: {
                  redirect: encodeURIComponent(this.$route.path)
                }
              });
            }else{
              if(!this.content[id]){
                  this.$alert('内容不能为空', {
                    confirmButtonText: '确定'
                  });
                return false
              }
              this.$http.post (base.target+'/topic/'+this.topic.id+'/replies',{
                accesstoken:this.userInfo.token,
                content :this.content[id],
                reply_id :id
              }).then(response => {
              if (response.data.success) {
                this.topic.replies.push({
                  id: response.data.reply_id,
                  author: {
                    loginname: this.userInfo.loginname,
                    avatar_url: this.userInfo.avatar_url
                  },
                  content: this.content[id],
                  ups: [],
                });
              }

              this.content[id] = '';
            }, response => {
                // error callback
                console.log(response)
              })
            }

          },
          isUps(ups){
            return ups.contains(this.userInfo.userId)
          },
          fetchDate(){
            // 获取url传的id参数
            this.topicId = this.$route.params.id;

            this.$http.get(base.target+'/topic/'+this.topicId).then(response => {
              this.topic = response.data.data
            }, response => {
              // error callback
            })
          },
          like(id,ups){
            if (!this.userInfo.userId) {
              this.$router.push({
                name: 'login',
                params: {
                  redirect: encodeURIComponent(this.$route.path)
                }
              });
            }else{
              this.$http.post (base.target+'/reply/'+id+'/ups',{
                accesstoken:this.userInfo.token,
              }).then(response => {
                if(response.data.action == 'up'){
                ups.push(this.userInfo.userId)
                }else{
                  ups.remove(this.userInfo.userId)
                }
              }, response => {
                alert(response.data.error_msg)
              })
            }
          },
          initArray(){
            Array.prototype.indexOf = function(val) {
              for (var i = 0; i < this.length; i++) {
                if (this[i] == val) return i;
              }
              return -1;
            };
            Array.prototype.remove = function(val) {
              var index = this.indexOf(val);
              if (index > -1) {
                this.splice(index, 1);
              }
            };
            Array.prototype.contains = function(obj) {
              var i = this.length;
              while (i--) {
                if (this[i] === obj) {
                  return true;
                }
              }
              return false;
            }
          }

        },
        filters: {
          getTimeAgo(time) {
            return utils.getTimeAgo(time);
          }
        },
        components:{
          nvHead,
          markdownEditor
        }
    }
</script>
<style lang="scss">

  .topic{
    max-width: 1200px;
    background: #fff;
    margin: 20px auto;
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

          .replies_box{
            display: flex;
            justify-content: space-between;
            .replies_left{
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
            .replies_right{
              display: flex;
              align-items: center;
              i{
                margin: 0 5px;
              }
            }
          }
          .replies_comment{

          }
        }
      }
    }
    .markdown{
      text-align: left;
      margin-top: 20px;
      .title{
        text-align: left;
        font-size: 18px;
      }
    }

  }

</style>
