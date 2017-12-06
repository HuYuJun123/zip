<template>
  <div class="hello">
    <main>
      <div style="width: 500px;height: 300px;margin:100px auto">
        <Form ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="账户" prop="pass">
            <Input type="text" v-model="formCustom.zhh" placeholder="请输入用户名"></Input>
          </FormItem>
          <FormItem label="密码" prop="pass">
            <Input type="password" v-model="formCustom.pass" placeholder="请输入密码"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formCustom')">登录</Button>
            <Button type="ghost" @click="handleReset('formCustom')" style="margin-left: 8px">注册</Button>
          </FormItem>
        </Form>
      </div>

    </main>

  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      const validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请完善信息'));
        } else {
          callback();
        }
      };
      return {
        formCustom: {
          zhh: '',
          pass: ''
        },
        ruleCustom: {
          pass: [
            {validator: validatePass, trigger: 'blur'}
          ],
        }
      }
    },
    methods: {
      setCookie(cname, cvalue, exdays){
        let d = new Date();
        d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
        let expires = "expires=" + d.toGMTString();
        document.cookie = cname + "=" + cvalue + "; " + expires;
      },
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.setCookie('zhh', this.formCustom.zhh, 7);
            location.href=this.$route.query.redirect?'#'+this.$route.query.redirect:'#/scheme'
          } else {
            this.$Message.error('Fail!');
          }
        })
      },
      handleReset(name){
        console.log(name)
      }
    }
  }
</script>
<style scoped>
  h1, h2 {
    font-weight: normal;
  }

  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin: 0 10px;
  }

  a {
    color: #42b983;
  }
</style>
