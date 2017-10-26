<template>
    <div>
      <nv-head></nv-head>

      <section id="page">
        <!-- 首页列表 -->
        <ul class="posts-list">
          <li v-for="item in topics">
            <router-link :to="{name:'topic',params:{id:item.id}}">
              <div class="left">
                <!--<img class="avatar" src="../assets/img/logo.png">-->
                <img class="avatar" :src="item.author.avatar_url">
                <div class="status">{{item.reply_count+'/'+item.visit_count}}</div>
                <el-button :type="getTabInfo(item.tab, item.good, item.top, true)">
                  {{getTabInfo(item.tab, item.good, item.top, false)}}
                </el-button>
                <div class="title">{{item.title}}</div>
              </div>
              <div class="right">
                <!--<img class="avatar" src="../assets/img/logo.png">-->
                <div>{{item.last_reply_at | getTimeAgo}}</div>
              </div>
            </router-link>
          </li>
        </ul>
      </section>

    </div>
</template>

<script>
    import base from '../configs/base.js'
    import nvHead from '../components/header.vue'
    import utils from '../lib/utils.js';

    export default{
        data(){
            return{
                msg:'hello vue',
                topics: [],
            }
        },
        mounted(){
          this.$http.get(base.target+'/topics').then(response => {
            this.topics = response.data.data
          }, response => {
            // error callback
          })
        },
        methods:{
          getTabInfo(tab, good = false, top, isClass) {
            return utils.getTabInfo(tab, good, top, isClass);
          },
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
  .posts-list{
    li{
      a{
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        border-bottom: 1px solid #324157;
        cursor: pointer;
        color: #324157;
        .left{
          display: flex;
          flex-direction: row;
          align-items: center;
          .avatar{
            width: 50px;
            /*height: 100%;*/
          }
          .status{
            width: 100px;
          }
          .title{
            margin-left: 10px;
          }
        }
        .right{
          display: flex;
          flex-direction: row;
          align-items: center;
          .avatar{
            width: 30px;
            height: 100%;
          }
        }
      }

    }
  }

</style>
