<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1" @click='flushCom'>
        <router-link :to="{ path: '/' }">首页</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类</template>
        <el-menu-item index="2-1" @click='flushCom'>
          <router-link :to="{ path: '/',  query: { tab: 'good' }}">精华</router-link>
        </el-menu-item>
        <el-menu-item index="2-2" @click='flushCom'>
          <router-link :to="{ path: '/', query: { tab: 'share' }}"> 分享</router-link>
        </el-menu-item>
        <el-menu-item index="2-3" @click='flushCom'>
          <router-link :to="{ path: '/', query: { tab: 'ask' }}">问答</router-link>
        </el-menu-item>
      </el-submenu>
      <el-menu-item index="3" @click="open()">消息</el-menu-item>
      <el-menu-item index="4" @click="open()">关于</el-menu-item>
      <!--<el-menu-item index="5" class='fr hovernone'>-->
      <div class="fr h100">
        <!--未登录-->
        <el-button type="primary" plain v-if="!userInfo.loginname" @click='goLogin'>登录</el-button>
        <!--已登录-->
        <div class="has_login" v-if="userInfo.loginname" @click='goUser'>
          <img :src="userInfo.avatar_url">
          <div>{{userInfo.loginname}}</div>
        </div>
        <el-button type="success"><router-link :to="{ path: 'create' }">发布话题</router-link></el-button>
      </div>

      <!--</el-menu-item>-->
    </el-menu>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';
  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    computed: {
      ...mapGetters({
        userInfo: 'getUserInfo'
      })
    },
    methods: {
      open() {
        this.$alert('待开发', {
            confirmButtonText: '确定'
      });
      },
      flushCom:function(){
        this.$router.go(0);
      },
      goLogin:function(){
        this.$router.push({
          name:'login',
          query: {
            redirect: encodeURIComponent(this.$route.path)
          }
        })
      },
      goUser() {
        this.$router.push({
          name: 'user',
          params: {
            name: this.userInfo.loginname
          }
        });
      }
    }
  }
</script>

<style lang="scss">
  .fr{
    float: right !important;;
  }
  .h100{
    display: flex;
    align-items: center;
    height: 60px;
    margin-right: 25px;
    a{
      color: #fff;
    }
  }
  .hovernone:hover{
    border-bottom: none;
  }
  .has_login{
    display: flex;
    flex-direction: row;

    img{
      width: 30px;
      height: 30px;
    }
    div{
      color: #fff;
      line-height: 30px;
      margin: 0 10px;
    }
  }
</style>

