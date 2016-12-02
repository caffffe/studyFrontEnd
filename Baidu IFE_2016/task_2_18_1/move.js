
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
	if(text=="")
		return;
	var addhtml="<div class='box' onclick='removeOwn("+text+")'>"+text+"</div>";
	var html=addhtml+con.innerHTML;
    con.innerHTML=html;
}

function rightIn(){	
	var text=document.getElementsByTagName("input")[0].value;
	if(text=="")
		return;
	var addhtml="<div class='box' onclick='removeOwn("+text+")'>"+text+"</div>";
	var html=con.innerHTML+addhtml;
    con.innerHTML=html;
}
function rightOut(){
   con.removeChild(con.lastChild);
}
function leftOut(){
	con.removeChild(con.firstChild);
}
function removeOwn(text){
	for(var i=0,len=con.childNodes.length;i<len;i++){
		if(con.childNodes[i].innerText==text){
			con.removeChild(con.childNodes[i]);
			alert(text);
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
};


