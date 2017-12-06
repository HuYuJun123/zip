<template>
  <div>
    <Row class="keyWords">
      <i-col span="8">
        <ul class="keywordLeft">
          <li v-for="(v,k) in list" @click="keyWordsTitle(v)" :style="listV===v?'color:#fff;background:#2db7f5':''">{{k}}</li>
        </ul>
      </i-col>
      <i-col span="16" class="keywordRight">
        <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;width: 100%">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll">全选
          </Checkbox>
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
          <Checkbox :label="v" v-for="(v,i) in listV" :key="i"></Checkbox>
        </CheckboxGroup>
      </i-col>
    </Row>
    <Row style="margin: 20px" type="flex" justify="center" :gutter="30">
      <i-col span="5">
        <Button type="info" @click="ok">确定</Button>
      </i-col>
      <i-col span="5">
        <Button @click="cancel">取消</Button>
      </i-col>
    </Row>
  </div>
</template>
<script>
  export default{
    name: '',
    props: ['list'],
    data(){
      return {
//          展示列表
        listV: [],
//        多选框的操作
        indeterminate: true,
        checkAll: false,
        checkAllGroup: [],
//        存储列表
        lists: []
      }
    },
    computed: {},
    methods: {
//      刷新展示列表
      keyWordsTitle: function (v) {
        this.checkAll = false;
        this.listV = v;
        this.checkAllGroup = []
      },
//      全选的操作
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;
        if (this.checkAll) {
          this.checkAllGroup = this.listV;
          this.listV.forEach(v => {
            if (!this.lists.includes(v)) {
              this.lists.push(v)
            }
          });
        } else {
          this.checkAllGroup.forEach(v => {
            if (this.listV.includes(v)) {
              let index = this.checkAllGroup.indexOf(v);
              if (index >= 0) {
                this.checkAllGroup.splice(index, 1)
              }

            }
          })
        }
      },
//      选项改变时操作
      checkAllGroupChange (data) {
        data.forEach(v => {
          if (!this.lists.includes(v)) {
            this.lists.push(v)
          }
        });
        if (data.length === this.listV.length) {
          this.indeterminate = false;
          this.checkAll = true;
        } else if (data.length > 0) {
          this.indeterminate = true;
          this.checkAll = false;
        } else {
          this.indeterminate = false;
          this.checkAll = false;
        }
      },
//      将选中的列表发送给父组件
      ok () {
        this.$emit('keyWordsInfo', this.lists);
        this.$Message.info('添加成功');
      },
      cancel () {
        this.$emit('cancel', this.lists);
        this.$Message.info('您已取消操作');
      },
    },

    watch: {
//        解决iview框架的bug  未完成
      listV(){
        this.listV.forEach(c => {
          if (this.lists.includes(c)) {
            this.checkAllGroup.push(c)
          }
        })
      },
      list(){
        this.lists = [];
        this.checkAll = false;
        this.checkAllGroup = [];
//          给展示列表一个初始值
        let index = 0;
        $.each(this.list, (i, v) => {
          if (!index) {
            this.listV = v
          }
          index++;
        })
      }
    },
    mounted: function () {

    }

  }
</script>
<style scoped>
  .keywordLeft, .keywordRight {
    display: flex;
    flex-wrap: wrap;
  }

  .keyWords ul li {
    padding: 5px;
    margin: 5px;
    cursor: pointer;
    border: 1px solid #eee;
    border-radius: 5px;
  }

  .keyWords ul li.active {
    background: skyblue;
    color: white;
  }
</style>
