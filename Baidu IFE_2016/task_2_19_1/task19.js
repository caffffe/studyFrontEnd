
var con=document.getElementById("container");
var EventUtil={
	addHandler:function(element,type,handler){
        if(element.addEventListener){
        	element.addEventListener(type,handler,true);
        }
        else if(element.attachEvent){
        	element.attachEvent("on"+type,handler);
        }
        else{
        	element["on"+type]=handler;
        }
	}
};
function leftIn(){ 
	var text=document.getElementsByTagName("input")[0].value;
	var num=parseInt(text);
	var boxs=document.getElementsByClassName("box");
	var len=boxs.length;
    if(len>=60){
    	alert("队列数量不能超过60个");
    }
	if(isNaN(num)||num<10||num>100){
		alert("输入数字要在10-100之间")
		return;
	}
	var con=document.getElementById("container");
	var height=(num/100)*(parseInt(con.offsetHeight));
    
	var addhtml="<div class='box' style='height:"+height+"px;' onclick='removeOwn()'></div>";
	var html=addhtml+con.innerHTML;
    con.innerHTML=html;
}

function rightIn(){	
	var text=document.getElementsByTagName("input")[0].value;
	var num=parseInt(text);
    var boxs=document.getElementsByClassName("box");
     var len=parseInt(boxs.length);
	if(len>=60){
    	alert("队列数量不能超过60个");
    }
	if(isNaN(num)||num<10||num>100){
		alert("输入数字要在10-100之间");
		return;
	}
	var con=document.getElementById("container");
	var height=(num/100)*(parseInt(con.offsetHeight));

	var addhtml="<div class='box' style='height:"+height+"px;' onclick='removeOwn()'></div>";
	var html=con.innerHTML+addhtml;
    con.innerHTML=html;
}
function rightOut(){
   con.removeChild(con.lastChild);
}
function leftOut(){
	con.removeChild(con.firstChild);
}
function removeOwn(){
	for(var i=0,len=con.childNodes.length;i<len;i++){
		if(con.childNodes[i]==event.target){
			var text=con.childNodes[i].innerText;
			con.childNodes[i].style.opacity="0";
			setTimeout(function(i){
				return function(){
                  con.removeChild(con.childNodes[i]);
                  //alert(i);/
                  alert(text);
                  return i;
                 }
		   }(i),500);
			
			
		}
	}
}
function swap(box1,box2){
	var temp=box1.style.height;
	box1.style.height=box2.style.height;
	box2.style.height=temp;
}
//冒泡排序
function bubbleSort(){
   var boxs=document.getElementsByClassName("box");
   var len=parseInt(boxs.length);
   for(var i=0;i<len;i++){
   	  for(var j=i+1;j<len;j++){
   	  	 if((parseInt(boxs[i].style.height))>(parseInt(boxs[j].style.height))){
   	  	 	  swap(boxs[i],boxs[j]);
   	  	 }
   	  }
   }
}
window.onload=function(){
  var leftInBtn=document.getElementById("leftIn");
  EventUtil.addHandler(leftInBtn,"click",leftIn);
 var leftOutBtn=document.getElementById("leftOut");
 EventUtil.addHandler(leftOutBtn,"click",leftOut);
  var rightInBtn=document.getElementById("rightIn");
  EventUtil.addHandler(rightInBtn,"click",rightIn);
 var rightOutBtn=document.getElementById("rightOut");
 EventUtil.addHandler(rightOutBtn,"click",rightOut);
 var bubbleSortBtn=document.getElementById("bubbleSort");
 EventUtil.addHandler(bubbleSortBtn,"click",bubbleSort);
};


