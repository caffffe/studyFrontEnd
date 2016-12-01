/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
function getLength(time){
  if(time=="day")
     return 92;
   else if(time=="week")
     return 14;
   else if(time=="month")
     return 3;
}
/**
 * 渲染图表
 */
function renderChart() {
 
   var city=pageState["nowSelectCity"];
   if(city==-1)
     return;
   var time=pageState["nowGraTime"];
   console.log(chartData[time][city]);
   var currentData=chartData[time][city];
   
   var len=getLength(time);

   var chart=document.getElementById("aqi-chart-wrap");
   var width=chart.offsetWidth;
   var height=chart.offsetHeight;
   var dataWidth=Math.floor(width/len);
   var dataHeight=height/500;
   //console.log(height);

   var count=0;
   var html="";
   var chart=document.getElementById("aqi-chart-wrap");
   var divs=chart.getElementsByTagName("div");
   for(var j=0;j<divs.length;j++){
      divs[j].style.height="0px";
   }
   var i=0;
   if(time=="week")
     i+=92;
   else if(time=="month")
     i+=106;
   for(var data in currentData){
      divs[i].style.height=dataHeight*currentData[data];
      divs[i].title="日期"+data+"空气质量为"+currentData[data];
      i++;
      // var color='#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
      // html+="<div style='position:absolute;background:"+color+";width:"+dataWidth+";height:"+dataHeight*currentData[data]+
      // ";bottom:0;left:"+count*dataWidth+";transition:all 0.2s "+0.05*count+"s' title='日期"+data+"空气质量为"+currentData[data]+"'></div>"
      // count++;
   }

  /// chart.innerHTML=html;
}

/**
 * 初始化最开始的高度为0的图表，不需要任何数据
 */
function initChart(time){

   // var city=pageState["nowSelectCity"];
   // if(city==-1)
   //   return;
   // var time=pageState["nowGraTime"];

   // time="day";
  // console.log(chartData[time][city]);
  // var currentData=chartData[time]["北京"];
   
   var len=getLength(time);

   var chart=document.getElementById("aqi-chart-wrap");
   var width=chart.offsetWidth;
   var height=chart.offsetHeight;
   var dataWidth=Math.floor(width/len);
   //var dataHeight=height/500;
   //console.log(height);

   var count=0;
   var html="";
   for(var i=0;i<len;i++){
      var div=document.createElement("div");
      div.style.position="absolute";
      div.style.backgroundColor='#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
      div.style.width=dataWidth;
      div.style.height=0;

      if(time=="day")
         div.style.transition="0.15s "+(0.05*count)+"s";
      else if(time=="week")
         div.style.transition="0.3s "+(0.2*count)+"s";
      else
        div.style.transition="0.4s "+(0.4*count)+"s";

      div.style.bottom=0;
      div.style.left=count*dataWidth;
      count++;
      chart.appendChild(div);
      // var color='#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
      // html+="<div style='position:absolute;background:"+color+";width:"+dataWidth+";height:"+dataHeight*currentData[data]+
      // ";bottom:0;left:"+count*dataWidth+";transition:all 0.2s "+0.05*count+"s' title='日期"+data+"空气质量为"+currentData[data]+"'></div>"
      // count++;
   }
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
   
  // 设置对应数据

  // 调用图表渲染函数
  var radios=document.getElementsByName("gra-time");
 
  for(var i=0,len=radios.length;i<len;i++){
    if(radios[i].checked==true&&pageState["nowGraTime"]!=radios[i].value){
         pageState["nowGraTime"]=radios[i].value;
          console.log(radios[i].value);
          renderChart();
    }
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  
  // 设置对应数据

  // 调用图表渲染函数
  var select=document.getElementById("city-select");
  console.log(select.value);
  if(pageState["nowSelectCity"]!=select.value){
      pageState["nowSelectCity"]=select.value;
      renderChart();
  }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
     var radios=document.getElementsByName("gra-time");
 
    for(var i=0,len=radios.length;i<len;i++){
        radios[i].onchange=graTimeChange; 
   }
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var select=document.getElementById("city-select");
    //var count=-1;
   for(var prop in aqiSourceData){
       var option=document.createElement("option");
       option.innerText=prop;
       option.value=option.value;
       //count++;
       select.appendChild(option);
   }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
   select.onchange=citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData["day"]=aqiSourceData; 
  chartData["week"]={};
  chartData["month"]={}

  for(var city in aqiSourceData){
     var weekCount=1;
     var sumcount=0;
      var daycount=0; 
      var arr=aqiSourceData[city];
      chartData["week"][city]={};
      for(var date in arr){
         sumcount+=arr[date];
         daycount++;
         if(daycount==7){
            chartData["week"][city][weekCount]=Math.floor(sumcount/7);
            weekCount++;
            daycount=0;
            sumcount=0;
         }
      }
  }

   for(var city in aqiSourceData){
     var monthCount=1;
     var sumcount=0;
      var daycount=0; 
      var arr=aqiSourceData[city];
      chartData["month"][city]={}
      for(var date in arr){
         if(date.toString().slice(6,7)==monthCount){
            sumcount+=arr[date];
            daycount++;
         }
         else{
            chartData["month"][city][monthCount]=Math.floor(sumcount/daycount);
            monthCount++;
            sumcount=arr[date];
            daycount=1;
         }
      }
  }

  
}   

/**
 * 初始化函数
 */
function init() {
  initChart("day");
  initChart("week");
  initChart("month");
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();

}

init();