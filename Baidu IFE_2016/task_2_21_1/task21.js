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
$=function(el){
  return document.querySelector(el);
}
var con=document.getElementById("container");
var operateArr={
   arrs:[],
   insert:function(){
      var text=document.getElementsByTagName("textarea")[0].value;
      // alert("aa");
      operateArr.arrs.push(text);
      var addhtml="<div class='box'>"+text+"</div>";
      con.innerHTML=con.innerHTML+addhtml;
   }
   // search:function(){
   //    var searchText=document.getElementById("searchText").value;
   //    var searchLen=searchText.length;
   //    var boxs=document.getElementsByClassName("box");
   //    for(var i=0,len=operateArr.arrs.length;i<len;i++){
   //          boxs[i].innerHTML=operateArr.arrs[i];
   //          var str=boxs[i].innerHTML;
   //          //var replace=str.replaceAll(searchText,"<span>"+searchText+"</span>");
   //          var replace=str.replace(new RegExp(searchText,'g'),'<span>'+searchText+'</span>');
   //          boxs[i].innerHTML=replace;
        
   //    }
   // }
};
window.onload=function(){
  var insertBtn=document.getElementById("insertBtn");
  EventUtil.addHandler(insertBtn,"click",operateArr.insert);
  // var searchBtn=document.getElementById("searchBtn");
  // EventUtil.addHandler(searchBtn,"click",operateArr.search);
  //console.log(operateArr.arrs);
};