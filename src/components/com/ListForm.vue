<template>
  <div class="listForm">
    <div v-if="list.length">
      <div style="border-bottom: 0;padding-bottom:10px;padding-top:30px;">
        <Checkbox
          :indeterminate="indeterminate"
          :value="checkAll"
          @click.prevent.native="handleCheckAll">
          <span>批量操作：</span>
        </Checkbox>
        <fun-s class="funInline" @funSome="funSomeS"></fun-s>
        <div class="listForm-search">
          <Input type="text" v-model="search" placeholder="请输入..."></Input>
          <Button type="info" @click="searchFun" class="listForm-search-button">搜索</Button>
        </div>
      </div>
      <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
        <div class="listForm-labelSel" v-for="(v,i) in list">
          <Checkbox :label="v.docId"></Checkbox>
          <div class="listForm-labelBox">
            <img src="../../assets/smallLogo_03.jpg" alt="">
            <a v-show="v.content?v.content.length<100:false" :href="v.url" target="_blank"><h3 v-html="v.title"></h3>
            </a>
            <router-link v-show="v.content?v.content.length>100:false" :to="{name:'Text',params:{data:v,info:info}}"><h3
              v-html="v.title"></h3></router-link>
            <p v-show="v.content">
              <span>摘要：</span>
              <span>{{v.ext && v.ext != " " ? v.ext.slice(0, 80) + "..." : v.content ? v.content.replace(/<([^]*?)>/g, '').split("\n").join("").trim().slice(0, 80) + "..." : ''}}</span>
            </p>
            <p v-show="v.keywords!==' '">
              <span>涉及词：</span>
              <span class="cRed">{{v.suggest ? v.suggest[0].input.join(' ') : ''}}</span>
            </p>
            <p>
              <span>来源：</span>
              <span class="cBlue">{{v.sourceName}}</span>
              <span class="mLeft">媒体：</span>
              <span class="cBlue">{{v.mediaName}}</span>
            </p>
            <p>
              <span>发布时间：</span>
              <span>{{v.create_date ? v.create_date.replace('T', ' ') : v.spider_time.replace('T', ' ')}}</span>
            </p>
          </div>
          <div class="funBlockF">
            <fun class="funBlock" @funSome="funSome" :par="v"></fun>
          </div>
        </div>
      </CheckboxGroup>
    </div>
    <div v-else><h1 style="line-height: 200px;text-align: center">暂无符合条件的内容，请更换方案或筛选条件</h1></div>
  </div>
</template>
<script>
  import Fun from '../com/Fun.vue';
  import FunS from '../com/Funs.vue'
  export default{
    name: 'ListForm',
    components: {Fun, FunS},
    props: ['list', 'info'],
    data(){
      return {
        search: "",
        indeterminate: true,
        checkAll: false,
        checkAllGroup: []
      }
    },
    computed: {},
    methods: {
//        将fun组件的事件传递给父组件
      funSome: function (type, par) {
        this.$emit('funSome', type, par)
      },
      funSomeS: function (type) {
        let data = [];
        this.list.forEach(c => {
          if (this.checkAllGroup.includes(c.docId)) {
            data.push({
              docId: c.docId,
              docType: c.docType
            })
          }
        })
        this.$emit('funSomeS', type, this.checkAllGroup, data)
      },
      searchFun: function () {
        this.$emit('searchFun', this.search)
      },
//      多选框的全选
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          let arr = [];
          this.list.forEach(v => {
            arr.push(v.docId)
          })
          this.checkAllGroup = arr;
        } else {
          this.checkAllGroup = [];
        }
      },
      checkAllGroupChange (data) {
        if (data.length === this.list.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      }
    },
    mounted: function () {

    },
    watch: {
      list: function () {
        this.checkAllGroup = [];
        this.indeterminate = true;
        this.checkAll = false;
      }
    }

  }
</script>
<style scoped>
  .listForm-search {
    float: right;
    width: 280px;
    height: 34px;
    position: relative;
  }

  .listForm-search-button {
    position: absolute;
    right: 0;
    top: 0;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    /*background: #03b5f7;*/
    /*border-color: #03b5f7;*/
  }

  .listForm-labelSel .ivu-checkbox-group-item {
    display: initial;
  }

  .listForm-labelSel {
    display: block;
    background: #fcfcfc;
    padding: 10px;
    margin-top: 20px;
    border-radius: 5px;
    box-shadow: 0 2px 2px 1px #eee;
    border: 1px solid #f2f9fd;
  }

  .listForm-labelSel:hover {
    background: #f2f9fd;
    border-color: #bfe6fc;
    box-sizing: border-box;
    cursor: pointer;
  }

  .listForm-labelBox {
    display: inline-grid;
    position: relative;
    padding-left: 40px;
    width: calc(100% - 40px);
  }

  .listForm-labelBox a {
    color: #333;
  }

  .listForm-labelBox img {
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 30px;
    height: 30px;
    border-radius: 3px;
    border: 1px solid #ddd;
  }

  .listForm-labelBox p {
    color: #999;
    line-height: 26px;
  }

  .funInline {
    display: inline-flex;
  }

  .funBlockF {
    width: 100%;
    height: 30px;
  }

  .funBlock {
    float: right;
  }


</style>
