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
	},
  getEvent:function(event){
    return event||window.event;
  },
  getTarget:function(event){
    return event.target||event.srcElement;
  }
};

 
  window.onload=function(){
    var techContainer=document.getElementById("container");
    var inputTxt=document.getElementsByTagName("input")[0];
    var techTag=new CreateTag('technology',techContainer);
    EventUtil.addHandler(inputTxt,"keydown",techTag.insert.bind(techTag)); 
    EventUtil.addHandler(techContainer,"click",techTag.delete.bind(techTag));
  
    var hobbyContainer=document.getElementById("hobbyContainer");
    var hobbyTag=new CreateTag('hobby',hobbyContainer);
    var btn=document.getElementById("insertBtn");
    EventUtil.addHandler(btn,"click",hobbyTag.insert.bind(hobbyTag));
    EventUtil.addHandler(hobbyContainer,"click",hobbyTag.delete.bind(hobbyTag));
  
  };
function enter(event){
      event=EventUtil.getEvent(event);
      var target=EventUtil.getTarget(event);

      target.innerText="点击删除"+target.innerText;
      target.style.background="red";
}
function leave(event){
  event=EventUtil.getEvent(event);
  var target=EventUtil.getTarget(event);

  var text=target.innerText;
  target.innerText=text.replace("点击删除","");
  target.style.background="";
}
function CreateTag(tagType,container){
    this.tagType=tagType;
    this.container=container;
    this.arrs=[];
}
CreateTag.prototype={
   constructor:CreateTag,
   delete:function(event){
      event=EventUtil.getEvent(event);
      var target=EventUtil.getTarget(event);

       for(var i=0,len=this.arrs.length;i<len;i++){
          if(this.arrs[i]==target.innerText){
              break;
          }
       }
       for(;i<len-1;i++)
           this.arrs[i]=this.arrs[i+1];
      this.arrs.pop();
     // console.log(this.arrs[i]);
     // console.log(this.arrs);
      target.outerHTML="";
   },
   insert:function(event){
      event=EventUtil.getEvent(event);
      if(event.type=="keydown"){
        if(event.keyCode===13||event.keyCode===32||event.keyCode===188){
          var text=document.getElementsByTagName("input")[0].value;
          text=text.trim();
          document.getElementsByTagName("input")[0].value="";
          var len=this.arrs.length;
          for(var i=0;i<len;i++){
             if(this.arrs[i]==text)
                return;
          }
          //console.log(len);
          if(len>=10){
            this.arrs.shift();
            document.getElementsByClassName("box")[0].outerHTML="";
          }
          this.arrs.push(text);
          var addhtml="<div class='box'>"+text+"</div>";
          if(this.tagType=="technology")
             var addhtml="<div class='box' onmouseenter='enter()' onmouseleave='leave()'>"+text+"</div>";
             // var addhtml="<div class='box'>"+text+"</div>";
           else
             var addhtml="<div class='box' onmouseenter='operateArr.enter()' onmouseleave='operateArr.leave()' onclick='operateArr.delete()'>"+text+"</div>";
          //console.log(text);
          this.container.innerHTML=this.container.innerHTML+addhtml;
          
        }
      }
      else if(event.type=="click"){
     
      var text=document.getElementsByTagName("textarea")[0].value;
      text=text.trim();
      var inserts=text.split(/ |,|、|\n|，/);
      //var inserts=text.split(/[, 、/n]/);
       
      document.getElementsByTagName("textarea")[0].value="";
      
      for(var i=0,insertLen=inserts.length;i<insertLen;i++){    
          var len=this.arrs.length;
          var flag=0;
          for(var j=0;j<len;j++){
             if(this.arrs[j]==inserts[i]){
                flag=1;
                break;
             }
                
          }
          if(flag==1)
            continue;
          inserts[i]=inserts[i].trim();
          //console.log(len);
          if(len>=10){
            this.arrs.shift();
            document.getElementsByClassName("intbox")[0].outerHTML="";
          }
          this.arrs.push(inserts[i]);
          var addhtml="<div class='intbox' onmouseenter='enter()' onmouseleave='leave()'>"+inserts[i]+"</div>";
          this.container.innerHTML=this.container.innerHTML+addhtml;
      }
    }  
  }
}
