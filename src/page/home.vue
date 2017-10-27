<template>
    <div>
      <nv-head></nv-head>

      <section id="page">
        <!-- 首页列表 -->
        <ul class="posts-list">
          <li v-for="item in topics">

              <div class="left">
                <router-link :to="{name:'user',params:{name:item.author.loginname}}">
                  <img class="avatar" :src="item.author.avatar_url">
                </router-link>
                <div class="status">{{item.reply_count+'/'+item.visit_count}}</div>
                <el-button :type="getTabInfo(item.tab, item.good, item.top, true)">
                  {{getTabInfo(item.tab, item.good, item.top, false)}}
                </el-button>
                <router-link :to="{name:'topic',params:{id:item.id}}">
                  <div class="title">{{item.title}}</div>
                </router-link>
              </div>
              <div class="right">
                <!--<img class="avatar" src="../assets/img/logo.png">-->
                <div>{{item.last_reply_at | getTimeAgo}}</div>
              </div>
          </li>
        </ul>
      </section>
      <!--分页-->
      <div class="pagination" @click='flushCom'>
        <el-pagination
          layout="prev, pager, next"
          :total="999"
          :current-page.sync="page"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
</template>

<script>
    import base from '../configs/base.js'
    import nvHead from '../components/header.vue'
    import utils from '../lib/utils.js';
    import router from '../router'

    export default{
        data(){
            return{
                tab :'ask',
                page:1,
                topics: [],
            }
        },
        mounted(){
          // 获取url传的tab参数
          this.tab = this.$route.query.tab||'';
          // 获取url传的tab参数
          this.page = Number(this.$route.query.page||1)
          console.log(typeof this.page)

          this.$http.get(base.target+'/topics?tab='+this.tab+'&page='+this.page).then(response => {
            this.topics = response.data.data
          }, response => {
            // error callback
          })
        },
        methods:{
          getTabInfo(tab, good = false, top, isClass) {
            return utils.getTabInfo(tab, good, top, isClass);
          },
          handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            router.push({ path: '/', query: { tab: this.tab,page: val }})

//            this.flushCom()
          },
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
<style lang="scss">
  #page{
    max-width: 1200px;
    margin: 20px auto;
    background: #fff;
  }
  .posts-list{
    li{
      /*a{*/
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 20px;
        border-bottom: 1px solid #324157;
        /*cursor: pointer;*/

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
          a{
            color: #324157;
            .title{
              margin-left: 10px;
            }
          }
          a:hover{
            text-decoration: underline;
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
      /*}*/

    }
  }
.pagination{
  width: 310px;
  margin: 20px auto;
}
</style>
