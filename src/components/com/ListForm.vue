<template>
  <div class="listForm">
    <div style="border-bottom: 0;padding-bottom:10px;padding-top:30px;">
      <Checkbox
        :indeterminate="indeterminate"
        :value="checkAll"
        @click.prevent.native="handleCheckAll">
        <span>批量操作：</span>
      </Checkbox>
      <fun class="funInline" @funSome="funSome" :par="checkAllGroup"></fun>
      <div class="listForm-search">
          <Input type="text" v-model="search" placeholder="请输入..."></Input>
          <Button type="info" @click="searchFun" class="listForm-search-button">搜索</Button>
      </div>
    </div>
    <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
      <div class="listForm-labelSel" v-for="(v,i) in list">
        <Checkbox :label="i"></Checkbox>
        <div class="listForm-labelBox">
          <img src="../../assets/smallLogo_03.jpg" alt="">
          <router-link :to="{name:'Text',params:{data:v,info:info}}"><h3 v-html="v.title"></h3></router-link>
          <p>
            <span>摘要：</span>
            <span>{{v.ext&&v.ext!=" " ? v.ext.slice(0, 80) + "..." : v.content.split("\n").join("").trim().slice(0, 80) + "..."}}</span>
          </p>
          <p>
            <span>涉及词：</span>
            <span class="cRed">{{v.keywords.split(',').join(' ')}}</span>
          </p>
          <p>
            <span>发布时间：</span>
            <span>{{v.create_date}}</span>
            <span class="mLeft">来源：</span>
            <span class="cBlue">{{v.media_name}}</span>
          </p>
        </div>
        <div class="funBlockF">
          <fun class="funBlock" @funSome="funSome" :par="v"></fun>
        </div>
      </div>
    </CheckboxGroup>
  </div>
</template>
<script>
  import Fun from '../com/Fun.vue';
  export default{
    name: 'ListForm',
    components: {Fun},
    props: ['list','info'],
    data(){
      return {
        search: "",
        indeterminate: true,
        checkAll: false,
        checkAllGroup: []
      }
    },
    computed: {

    },
    methods: {
      funSome: function (type, par) {
        this.$emit('funSome', type, par)
      },
      searchFun: function () {
        this.$emit('searchFun', this.search)
      },
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          let arr = [];
          for (let i = 0; i < this.list.length; i++) {
            arr.push(i)
          }
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
    watch:{
        list:function () {
          this.checkAllGroup=[]
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

  .listForm-search-button{
    position: absolute;
    right: 0;
    top:0;
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
  .listForm-labelSel:hover{
    background:#f2f9fd;
    border-color:#bfe6fc ;
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
