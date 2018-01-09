<template>
    <div>
      <nv-head></nv-head>
      <div class="w1200">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class='form'>
          <el-form-item label="Access Token" prop="accesstoken">
            <el-input v-model="ruleForm.accesstoken"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit('ruleForm')">立即登录</el-button>
            <el-button @click="resetForm('ruleForm')">取消</el-button>
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
              ruleForm:{
                accesstoken:'',
                name: '',
                },
                rules: {
                  accesstoken: [
                    { required: true, message: '请输入AccessToken', trigger: 'blur' },

                  ],

                },
                user:''
            }
        },
        methods: {
          onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.postDate()
                console.log('submit1!');
              } else {

                console.log('error submit!!');
                return false;
              }
            });


          },
          resetForm(formName) {
            console.log(1321)
            this.$refs[formName].resetFields();
          },
          postDate:function(){

            this.$http.post(base.target+'/accesstoken',{
              accesstoken:this.ruleForm.accesstoken
            }).then(response => {
              this.user = response.data
              let user = {
                loginname: this.user.loginname,
                avatar_url: this.user.avatar_url,
                userId: this.user.id,
                token: this.ruleForm.accesstoken
              };
              window.window.sessionStorage.user = JSON.stringify(user);
              this.$store.dispatch('setUserInfo', user);
              let redirect = decodeURIComponent(this.$route.query.redirect || '/');
              this.$router.push({
                path: redirect
              });
             }, response => {
                              this.$alert('accesstoken不正确')
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
