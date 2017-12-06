<!--生成pdf文件的中转站-->
<template>
  <main>
  <ul class="preview" style="background: #fff;height: auto">
    <h1 style="text-align: center;line-height: 100px;font-size: 30px">{{$route.query.title}}</h1>
    <li>
      <h2>媒体来源明细</h2>
      <Pie id="PieViewP" :datas="pie"></Pie>
      <h2>信息来源统计</h2>
      <Columnar id="ColumnarViewP" :datas="columnar"></Columnar>
      <h2>信息情感分布</h2>
      <Annular id="annularViewP" :datas="annular"></Annular>
    </li>
  </ul>
  </main>
</template>
<script>
  import Pie from '../echarts/Pie.vue'
  import Annular from '../echarts/Annular.vue'
  import Columnar from '../echarts/Columnar.vue'
  export default{
    name: 'Preview',
    components: { Pie, Annular, Columnar},
    data(){
      return {
        pie: {},
        columnar: {},
        annular: {}
      }
    },
    computed: {},
    mounted(){
      let s1 = document.createElement('script');
      s1.src = 'https://code.jquery.com/jquery-git.js';
      document.body.appendChild(s1);
      let s2 = document.createElement('script');
      s2.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.js';
      document.body.appendChild(s2);
      let s3 = document.createElement('script');
      s3.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.0.272/jspdf.debug.js';
      document.body.appendChild(s3);
      $.ajax({
        type: "POST",
        url: "http://10.100.82.221:8089/briefing/detail",
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(this.$route.query.id),
        dataType: "json",
        success: (v) => {
          if (v.code === 100) {
            let data = v.obj;
            this.pie = data.sourceChart.map(v => {
              return {value: v.count, name: v.name}
            });
            this.columnar = data.mediaChart.map(v => {
              return {value: v.count, name: v.name}
            });
            this.annular = data.sensitiveChart.map(v => {
              if (v.name === '1') {
                return {value: v.count, name: '敏感'}
              } else {
                return {value: v.count, name: '非敏感'}
              }
            }).reverse();
            let title = this.$route.query.title
            setTimeout(()=>{
              let pdf = new jsPDF('p', 'pt', 'a4');
              pdf.addHTML(document.body, function () {
                pdf.save(title + '.pdf');
              });
            },1000)
            setTimeout(()=>{
             location.href='#/bulletin'
            },2000)
          }
        }
      });
    },
    methods: {}

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
    text-align: center;
    line-height: 60px;
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
