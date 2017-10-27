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
      <el-menu-item index="3">消息</el-menu-item>
      <el-menu-item index="3">关于</el-menu-item>
    </el-menu>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        activeIndex: '1',
        activeIndex2: '1'
      };
    },
    methods: {
      flushCom:function(){
        this.$router.go(0);
      }
    }
  }
</script>


