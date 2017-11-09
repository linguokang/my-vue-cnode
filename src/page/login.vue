<template>
    <div>
      <nv-head></nv-head>
      <div class="w1200">
        <el-form ref="form" :model="form" label-width="100px" class='form'>
          <el-form-item label="Access Token">
            <el-input v-model="form.AccessToken"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">立即登录</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
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
                msg:'hello vue',
                form:{
                  AccessToken:'323c434b-d315-4026-9a83-0e342ec31df6'
                },
                user:''
            }
        },
        methods: {
          onSubmit() {
            console.log('submit!');
            this.postDate()
          },
          postDate:function(){

            this.$http.post(base.target+'/accesstoken',{
              accesstoken:this.form.AccessToken
            }).then(response => {
              this.user = response.data
              let user = {
                loginname: this.user.loginname,
                avatar_url: this.user.avatar_url,
                userId: this.user.id,
                token: this.form.AccessToken
              };
              window.window.sessionStorage.user = JSON.stringify(user);
              this.$store.dispatch('setUserInfo', user);
//            alert(1)
              let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              this.$router.push({
                path: redirect
              });
             }, response => {
              // error callback
            })
          }
        },
        components:{
          nvHead
        }
    }
</script>
<style lang="scss" scoped>
  .w1200{
    max-width: 1200px;
    margin: 0 auto;
    .form{
      margin: 50px 20px;
    }
  }
</style>
