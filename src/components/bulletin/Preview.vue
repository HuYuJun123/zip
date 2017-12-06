<template>
  <ul class="preview" id="preview">
    <li v-show="show.includes('1')">
      <h1>{{obj.s1?obj.s1:''}}、本期导读</h1>
      <p v-if="data.guide">{{data.guide}}</p>
      <p v-else="data.guide">
        舆情是“舆论情况”的简称，是指在一定的社会空间内，围绕中介性社会事件的发生、发展和变化，作为主体的民众对作为客体的社会管理者、企业、个人及其他各类组织及其政治、社会、道德等方面的取向产生和持有的社会态度。它是较多群众关于社会中各种现象、问题所表达的信念、态度、意见和情绪等等表现的总和。</p>
    </li>
    <li v-show="show.includes('2')">
      <h1>{{obj.s2?obj.s2:''}}、处置建议</h1>
      <p v-if="data.opioion">{{data.opioion}}</p>
      <p v-else="data.opioion">
        舆情是“舆论情况”的简称，是指在一定的社会空间内，围绕中介性社会事件的发生、发展和变化，作为主体的民众对作为客体的社会管理者、企业、个人及其他各类组织及其政治、社会、道德等方面的取向产生和持有的社会态度。它是较多群众关于社会中各种现象、问题所表达的信念、态度、意见和情绪等等表现的总和。</p>
    </li>
    <li>
      <h1 v-show="obj.s0">{{obj.s0?obj.s0:''}}、监测总览</h1>
      <div v-show="show.includes('3')">
        <h2>（{{obj.s3?obj.s3:''}}）监测概述</h2>
        <p v-if="data.mointor" style="margin: 20px 0">{{data.mointor}}</p>
        <p v-else="data.mointor" style="margin: 20px 0">
          舆情是“舆论情况”的简称，是指在一定的社会空间内，围绕中介性社会事件的发生、发展和变化，作为主体的民众对作为客体的社会管理者、企业、个人及其他各类组织及其政治、社会、道德等方面的取向产生和持有的社会态度。它是较多群众关于社会中各种现象、问题所表达的信念、态度、意见和情绪等等表现的总和。</p>
      </div>
      <div v-show="show.includes('4')">
        <h2>（{{obj.s4?obj.s4:''}}）媒体来源明细</h2>
        <Pie id="PieView" :datas="pie"></Pie>
      </div>
      <div v-show="show.includes('5')">
        <h2>（{{obj.s5?obj.s5:''}}）信息来源统计</h2>
        <Columnar id="ColumnarView" :datas="columnar"></Columnar>
      </div>
      <div v-show="show.includes('6')">
        <h2>（{{obj.s6?obj.s6:''}}）信息情感分布</h2>
        <Annular id="annularView" :datas="annular"></Annular>
      </div>
    </li>
    <li v-show="show.includes('7')">
      <h1>{{obj.s7?obj.s7:''}}、主要舆情</h1>
      <Table :columns="tableTitle" :data="table" ref="excel"></Table>
    </li>
    <li v-show="show.includes('8')">
      <h1>{{obj.s8?obj.s8:''}}、舆情导读</h1>
      <ul>
        <li class="amendConOne-ext" v-for="(v,i) in table">
          <h2>({{i + 1}}){{v.title}}</h2>
          <div style="border: 1px solid #f9f9f9;border-top: 0">
            <div class="amendConOne-ext1">
              <div>性质：<span v-show="!v.sensitiveStatus">非敏感</span><span v-show="v.sensitiveStatus">敏感</span></div>
              <div style="border-right: 1px solid #dfdddd;border-left:  1px solid #dfdddd">文章来源：{{v.mediaName}}</div>
              <div>时间：{{v.createDate.split('T').join('  ')}}</div>
            </div>
            <div style="border-bottom: 1px solid #f9f9f9;display: flex;color: #666;font-size: 12px">
              <div style="width: 100px;line-height: 60px;text-align: center;">内容</div>
              <p style="width: calc(100% - 100px);line-height: 30px">{{v.content.trim().substring(0, 100)}}...</p>
            </div>
            <a :href="v.url" class="amendCon-url">原文地址：<span>{{v.url}}</span></a>
          </div>
        </li>
      </ul>
    </li>
  </ul>
</template>
<script>
  import BrokenLine from '../echarts/BrokenLine.vue'
  import Pie from '../echarts/Pie.vue'
  import Annular from '../echarts/Annular.vue'
  import Columnar from '../echarts/Columnar.vue'
  import Lt from '../com/LT.vue'
  export default{
    name: 'Preview',
    components: {BrokenLine, Pie, Annular, Columnar, Lt},
    props: ['data'],
    data(){
      return {
//          序列号 obj
        obj: {},
        tableTitle: [
          {
            type: 'index',
            width: 60,
            align: 'center',
            title: '序列',
          },
          {
            title: '标题',
            key: 'title',
            align: 'center',
            width: 450
          },
          {
            title: '日期与来源',
            align: 'center',
            width: 150,
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    t: params.row.createDate ? params.row.createDate.split('T').join(' ') : params.row.spiderTime.split('T').join(' '),
                    l: params.row.mediaName,
                    n: 1
                  },
                }),
              ])
            }
          },
          {
            title: '属性',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h(Lt, {
                  props: {
                    s: params.row.sensitiveStatus,
                    n: 2,
                  },
                }),
              ])
            }
          },
        ],
        table: [],
        pie: {},
        columnar: {},
        annular: {},
        show: []
      }
    },
    computed: {},
    watch: {
      data: function () {
        this.table = this.data.table;
        this.pie = this.data.pie;
        this.columnar = this.data.columnar;
        this.annular = this.data.annular;
        this.show = this.data.show;
        //生成excel表单
        if (this.data.excel) {
          this.$refs.excel.exportCsv({
            filename: this.data.excel,
            columns: [{title: '标题', key: 'title'}, {title: '媒体来源', key: 'lai'}, {
              title: '新闻来源',
              key: 'lai1'
            }, {title: '时间', key: 'time'}, {title: '属性', key: 'shu'},],
            data: this.table.map(v => {
              return {
                title: v.title,
                lai: v.spiderName,
                lai1: v.mediaName,
                time: v.createDate.split('T').join('  '),
                shu: v.sensitiveStatus ? '敏感' : '非敏感'
              }
            })
          })
        } else if (this.data.word) {
          //生成word文件
          let s3 = document.createElement('script');
          s3.src = 'static/js/word.js';
          document.body.appendChild(s3);
        }
//        为每个模块添加序号,调用函数
        this.getSerial(this.show)
      }
    }
    ,
    methods: {
//      生成动态序列号  和data中的obj相连
      getSerial(data){
        let arr = ['占位', '一', '二', '三', '四', '五', '六', '七', '八'];
        let obj = {};
        let numB = 0;
        let numS=0;
        data.sort().forEach(c => {
          if (c<3) {
            obj['s' + c] = ++numB
          }else if(2<c&&c<7){
            if(!numS){
              numB++
              obj.s0=3
            }
            obj['s' + c] = ++numS
          }else if(c>6){
            obj['s' + c] = ++numB
          }
        });

        this.obj = {
          s0: arr[obj.s0],
          s1: arr[obj.s1],
          s2: arr[obj.s2],
          s3: arr[obj.s3],
          s4: arr[obj.s4],
          s5: arr[obj.s5],
          s6: arr[obj.s6],
          s7: arr[obj.s7],
          s8: arr[obj.s8]
        }
      }
    }
    ,
    mounted: function () {

    }
    ,

  }
</script>
<style scoped>
  .preview {
    padding: 20px 45px;
  }

  .preview h1 {
    font-size: 18px;
    line-height: 90px;
    color: #333;
  }

  .preview h2 {
    font-size: 16px;
    color: #333;
  }

  .preview p {
    text-indent: 20px;
    font-size: 14px;
    color: #999;
  }

  .amendConOne-ext {
    margin-top: 15px;
  }

  .amendConOne-ext h2 {
    font-size: 14px;
    color: #333;
    margin-bottom: 12px;
  }

  .amendConOne-ext1 {
    display: flex;
    color: #666;
    font-size: 14px;
    line-height: 40px;
    text-align: center;
    background: #f9f9f9;
  }

  .amendConOne-ext1 div {
    width: 33.3333333%;
  }

  .amendCon-url {
    color: #0265c2;
    font-size: 14px;
    line-height: 30px;
    padding-left: 15px;
  }

  .amendCon-url span:hover {
    text-decoration: underline;
  }
</style>
