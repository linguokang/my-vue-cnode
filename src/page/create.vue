<template>
    <div>
      <nv-head></nv-head>
      <div class="w1200">
        <div class="p20">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
              <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>
            <el-form-item label="分类" prop="classify">
              <el-select v-model="ruleForm.classify" placeholder="请选择发布板块">
                <el-option label="问答" value="ask"></el-option>
                <el-option label="分享" value="share"></el-option>
                <el-option label="工作" value="job"></el-option>
                <el-option label="测试" value="dev"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="内容" prop="desc">
              <el-input type="textarea" v-model="ruleForm.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">立即发布</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
</template>

<script>
  import base from '../configs/base.js'
  import nvHead from '../components/header.vue'
  import utils from '../lib/utils.js';
  import {mapGetters} from 'vuex';
    export default{
        data(){
          return {
            AccessToken:'',
            ruleForm: {
              title: '',
              classify: '',
              desc: ''
            },
            rules: {
              title: [
                { required: true, message: '请输入标题', trigger: 'blur' },
                { min: 5, max: 20, message: '长度在 5 到 20 个字符', trigger: 'blur' }
              ],
              classify: [
                { required: true, message: '请选择发布板块', trigger: 'change' }
              ],
              desc: [
                { required: true, message: '请填写内容', trigger: 'blur' }
              ]
            }
          };
        },
        computed: {
          ...mapGetters({
            userInfo: 'getUserInfo'
          })
        },
        methods: {
          submitForm(formName) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                alert('submit!');
                this.postDate()
              } else {
                console.log('error submit!!');
            return false;
            }
            });
          },
          postDate:function(){

            this.$http.post(base.target+'/topics',{
              accesstoken:this.userInfo.token,
              title:this.ruleForm.title,
              tab:this.ruleForm.classify,
              content:this.ruleForm.desc,
            }).then(response => {
              console.log(response)
              if (response.success) {
                this.$router.push({
                  name: '/'
                });
              }else{
                alert(response.error_msg)
              }
             }, response => {
//              let error = JSON.parse(response.responseText);
                console.log(response);
              return false;
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
    text-align: left;
    .p20{
      padding: 20px;
    }

  }
</style>
