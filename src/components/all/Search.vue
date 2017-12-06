<template>
  <div class="allSearch">
    <main>
      <div style="width: 60%;height: 200px;margin: 0 auto" >
        <h1 style="line-height: 100px;text-align: center">全文搜索</h1>
        <div style="position: relative">
          <AutoComplete
            v-model="value1"
            :data="data1"
            @keyup.enter.native="search"
            @on-select="search"
            @on-search="handleSearch1"
            placeholder="请输入要搜索的关键词..."
            style="width: 300px;display: block;margin: 0 auto"></AutoComplete>
          <Button @click="search" type="ghost" shape="circle" icon="ios-search"
                  style="position: absolute;top: 0;right: 200px;border: 0"></Button>
        </div>
      </div>
      <div v-show="!act" style="padding:0 30px;background: white;margin-top: 20px;border: 1px solid #ddd">
        <ul class="searchList" v-show="listCon.length">
          <router-link :to="{name:'Texts',params:{data:v,info:textInfo}}" v-for="(v,i) in listCon" :key="i">
            <li>
              <h2 style="color: #333">{{v.title}}</h2>
              <p style="color: #999;line-height: 26px">摘要：{{v.content.substring(0,150)}}</p>
              <p style="color: #999;line-height: 26px">时间：{{v.date.split('T').join('  ')}}</p>
            </li>
          </router-link>
          <Page :current="pageNow" :total="total" simple style=" margin: 30px auto;
    width: 200px;"
                @on-change="page"></Page>
        </ul>
        <div v-show="!listCon.length">
          <h1 style="text-align: center;padding-top: 50px">素材载入中</h1>
          <img src="../../assets/loading.gif" alt="" style="display: block;margin: 0 auto;height: 100px">
        </div>
      </div>
    </main>
  </div>
</template>
<script>
  export default{
    name: '',
    data () {
      return {
        pageNow: 1,
        listCon: [],
        total: 0,
        act: true,
        value1: '',
        data1: []
      }
    },
    methods: {
//        获取搜索框的值如果改变就去调取相似的关键词
      handleSearch1 (value) {
          let values=value.trim();
        if (values !== '') {
          $.ajax({
            type: "POST",
            url: "http://10.100.82.221:8089/fullsearch/autoCompletion",
            contentType: "application/json; charset=utf-8",
            data: values.toString(),
            dataType: "json",
            success: (v) => {
              if (v.code === 100) {
                this.loading1 = false;
                this.data1 = v.obj.map(c => c.substring(0, 20));
                this.data1.unshift(values)
              }
            }
          })
        } else {
          this.data1 = [];
        }
      },
      page: function (v) {
        this.pageNow = v;
      },
      search(){
        this.act = false
        this.listCon=[]
        $.ajax({
          url: 'http://10.100.82.221:8089/fullsearch/search',
          async: false,
          type: 'POST',
          contentType: "application/json; charset=utf-8",
          data: this.value1,
          success: (c) => {
            if (c.code === 100) {
             this.listCon=c.obj;
            }
          }
        })
      }
    },
    computed: {
//        内容详情的数据
      textInfo: function () {
        let arr = [];
        arr.push({path: this.$route.path, name: '全文搜索'});
        arr.push({path: '', name: '文章详情'});
        return arr
      }
    },
    mounted: function () {

    },
  }
</script>
<style scoped>
  .searchList li {
    background: #fcfcfc;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 2px 1px #eee;
    border: 1px solid #f2f9fd;
  }

  .searchList li:hover {
    background: #f2f9fd;
    border-color: #bfe6fc;
    cursor: pointer;
  }
</style>
