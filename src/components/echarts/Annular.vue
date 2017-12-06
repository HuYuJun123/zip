<template>
  <div :id="id" style="width: 600px;height: 400px;margin: 0 auto;display: block"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'Annular',
    props:['id','datas'],
    data () {
      return {
        charts: '',
        list: ['敏感', '非敏感'],
        data: [
          {value: 335, name: '敏感'},
          {value: 710, name: '非敏感'},
        ],
      }
    },
    methods: {
      drawPie(id){
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {show: true},
              restore: {show: true},
            }
          },
          legend: {
            data:this.list
          },
          series: [
            {
              name:'情感分析',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: false,
                  position: 'center'
                },
                emphasis: {
                  show: true,
                  textStyle: {
                    fontSize: '30',
                    fontWeight: 'bold'
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:this.data,
              itemStyle: {
                normal:{
                  label:{
                    show:true,
                    formatter: '{b} : {c} \n ({d}%)'
                  },
                  emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  },
                  labelLine:{
                    show:true
                  }
                },}
            }
          ]
        })
      }
    },
    watch:{
      datas:function () {
        this.data=this.datas;
        this.list=this.datas.map(v=>v.name);
        this.$nextTick(function () {
          this.drawPie(this.id)
        })
      }
    },
    mounted(){

    }
  }
</script>
<style scoped>

</style>
