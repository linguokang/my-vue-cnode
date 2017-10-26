<template>
  <div>
    <el-menu theme="dark" :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">首页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">分类</template>
        <el-menu-item index="2-1">精华</el-menu-item>
        <el-menu-item index="2-2">分享</el-menu-item>
        <el-menu-item index="2-3">问答</el-menu-item>
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
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>


