<template>
  <div :id="id" style="width: 700px;height: 400px;margin: 0 auto;display: block"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'Pie',
    props:['id','datas'],
    data () {
      return {
        charts: '',
        list: ['微博', '网站', '论坛', '微信', '外媒'],
        data: [
          {value: 335, name: '微博'},
          {value: 610, name: '网站'},
          {value: 234, name: '论坛'},
          {value: 135, name: '微信'},
          {value: 48, name: '外媒'}
        ],
      }
    },
    watch:{
        datas:function () {
          this.data=this.datas;
          this.list= this.datas.map(v=>v.name);
          this.$nextTick(function () {
            this.drawPie(this.id)
          })
        }
    },
    methods: {
      drawPie(id){
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {show: true},
              restore: {show: true},
            }
          },
          legend: {
            icon:'horizontal',
            data: this.list
          },
          series: [
            {
              name: '媒体来源',
              type: 'pie',
              radius: '55%',
              center: ['50%', '60%'],
              data:this.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                },
                normal:{
                  label:{
                    show:true,
                    formatter: '{b} : {d}%'
                  },
                  labelLine:{
                    show:true
                  }
                },
              }
            }
          ]
        })
      }
    },
    mounted(){
    },
  }
</script>
<style scoped>

</style>
