<template>
  <div :id="id" style="width: 600px;height: 400px;margin: 0 auto;display: block"></div>
</template>
<script>
  import echarts from 'echarts'
  export default {
    name: 'Annular',
    props:['id'],
    data () {
      return {
        charts: '',
        list: ['微博', '网站', '论坛', '微信', '外媒','头条'],
        data: [
          {value: 335, name: '微博'},
          {value: 610, name: '网站'},
          {value: 234, name: '论坛'},
          {value: 135, name: '微信'},
          {value: 48, name: '外媒'},
          {value: 100, name: '头条'}
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
              name:'访问来源',
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
    //调用
    mounted(){
      this.$nextTick(function () {
        this.drawPie(this.id)
      })
    }
  }
</script>
<style scoped>

</style>
