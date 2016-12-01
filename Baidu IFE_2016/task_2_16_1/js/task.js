/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var table=document.getElementById("aqi-table");



/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city=document.getElementById("aqi-city-input").value.trim();
    var value=document.getElementById("aqi-value-input").value.trim();
    if(city==""&&value==""){
         alert("城市和空气质量整数不得为空！")
         return;
    }
     if(!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/)){
        alert("城市名必须为中英文字符！")
        return;
    }
    if(!value.match(/^\d+$/)) {
        alert("空气质量指数必须为整数！")
        return;
    }
    aqiData[city]=value;
    console.log(aqiData);
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	table.innerHTML="";
	var tr=document.createElement("tr");
    var td=document.createElement("td");
    var text=document.createTextNode("城市");
    td.appendChild(text);
    tr.appendChild(td);
    td=document.createElement("td");
    text=document.createTextNode("空气质量");
    td.appendChild(text);
    tr.appendChild(td);
    td=document.createElement("td");
    text=document.createTextNode("操作");
    td.appendChild(text);
    tr.appendChild(td);
    table.appendChild(tr);
    for(var key in aqiData){   
       var tr=document.createElement("tr");
       var td=document.createElement("td");
       var text=document.createTextNode(key);
       td.appendChild(text);
       tr.appendChild(td);
       td=document.createElement("td");
       text=document.createTextNode(aqiData[key]);
       td.appendChild(text);
       tr.appendChild(td);
       td=document.createElement("td");
       var btn=document.createElement("button");
       btn.appendChild(document.createTextNode("删除"));
       td.appendChild(btn);
       tr.appendChild(td);
       document.getElementById("aqi-city-input").value="";
       document.getElementById("aqi-value-input").value="";
         table.appendChild(tr);
     }
     //注意性能，如果用innerHTML拼接会简单，性能也会好很多

}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  //console.log('2');
  var btn=event.target||event.srcElement;
  console.log(btn);
  var city=btn.parentNode.parentNode.firstChild.innerHTML;
  console.log(city);
  delete aqiData[city];
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  var btn=document.getElementById("add-btn");
  btn.onclick=addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
  // var btns=document.getElementsByTagName("button");
  //这里特别注意一点，直接给btns循环加事件会出现问题，好像是情封大大说的，button是用js加入html文档的，所以不能直接给它加事件，这里验证了诶
  	if(table.addEventListener)
  	   table.addEventListener("click",delBtnHandle,false);
    else if(btn.attachEvent)
    	table.attachEvent("onclick",delBtnHandle);
    else
    	table.onclick=delBtnHandle;
  
}

init();
