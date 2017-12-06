<template>
  <Row class="keyWords">
    <i-col span="8">
      <ul class="keywordLeft">
        <li v-for="(v,k) in list" @click="keyWordsTitle(v)" :class="">{{k}}</li>
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
      <div @click="aaa">qqq</div>
    </i-col>
  </Row>
</template>
<script>
  export default{
    name: '',
    props: ['list'],
    data(){
      return {
        listV: [],
        indeterminate: true,
        checkAll: false,
        checkAllGroup: [],
      }
    },
    computed: {},
    methods: {
        aaa:function () {
          console.log(this.checkAllGroup)
          console.log(this.listV)
        },
      keyWordsTitle: function (v) {
        this.listV = v
      },
      keyWordsInfo: function () {
        this.$emit('keyWordsInfo', this.title)
      },
      handleCheckAll () {
        if (this.indeterminate) {
          this.checkAll = false;
        } else {
          this.checkAll = !this.checkAll;
        }
        this.indeterminate = false;

        if (this.checkAll) {
          this.checkAllGroup=this.checkAllGroup.concat(this.listV);
        } else {
          this.checkAllGroup.forEach(v=>{
              if (this.listV.includes(v)){
                  console.log(1)
                  let index=this.checkAllGroup.indexOf(v);
                  if (index>=0){
                    this.checkAllGroup.splice(index,1)
                  }

              }
          })
        }
      },
      checkAllGroupChange (data) {
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
