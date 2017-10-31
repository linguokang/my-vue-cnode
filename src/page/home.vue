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
                tab :'all',
                page:1,
                topics: [],
            }
        },
        mounted(){
//          this.getTopics()

          // 如果从详情返回并且之前存有对应的查询条件和参数
          // 则直接渲染之前的数据
          if ( window.window.sessionStorage.tab === this.tab) {
            console.log('获取缓存数据')
            this.topics = JSON.parse(window.window.sessionStorage.topics);
//            this.searchKey = JSON.parse(window.window.sessionStorage.searchKey)
//            this.$nextTick(() => $(window).scrollTop(window.window.sessionStorage.scrollTop));
          } else {
            console.log('获取服务端数据')
            this.getTopics();
          }
          this.initpage()
        },
        beforeRouteLeave(to, from, next) {
          // 如果跳转到详情页面，则记录关键数据
          // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
          if (to.name === 'topic') {
            console.log('跳去topic页面')
            // 当前滚动条位置
//            window.window.sessionStorage.scrollTop = $(window).scrollTop();
            // 当前页面主题数据
            window.window.sessionStorage.topics = JSON.stringify(this.topics);
            // 查询参数
//            window.window.sessionStorage.searchKey = JSON.stringify(this.searchKey);
            // 当前tab
            window.window.sessionStorage.tab = from.query.tab || 'all';
          }
//          $(window).off('scroll');
          next();
        },
        beforeRouteEnter(to, from, next) {
          if (from.name !== 'topic') {

            // 页面切换移除之前记录的数据集
            if (window.window.sessionStorage.tab) {
              window.window.sessionStorage.removeItem('topics');
              window.window.sessionStorage.removeItem('searchKey');
              window.window.sessionStorage.removeItem('tab');
            }
          }
          if (from.name == 'topic') {
            console.log('来自topic页面')
          }
          next();
        },
        methods:{
          getTopics(){
            // 获取url传的tab参数
            this.tab = this.$route.query.tab||'all';
            // 获取url传的tab参数


            this.$http.get(base.target+'/topics?tab='+this.tab+'&page='+this.page).then(response => {
              this.topics = response.data.data
          }, response => {
              // error callback
            })
          },
          initpage(){
            this.page = Number(this.$route.query.page||1)
          },
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
