/**
 * Created by Administrator on 2016/3/23.
 */
window.onload=function(){
    imgLocation("container","box");

    window.onscroll=function(){
        var imgData={"data":[{"src":"2.jpg"},{"src":"3.jpg"},{"src":"4.jpg"},{"src":"5.jpg"},{"src":"6.jpg"}]};
        if(checkFlag()){
            var cparent=document.getElementById("container");
            for(var i=0;i<imgData.data.length;i++){
                var ccontent=document.createElement("div");
                ccontent.className="box";
                cparent.appendChild(ccontent);

                var boximg=document.createElement("div");
                boximg.className="box_img";
                ccontent.appendChild(boximg);

                var img=document.createElement("img");
                img.src="img/"+imgData.data[i].src;
                boximg.appendChild(img);

            }
           imgLocation("container","box");
      }
    }

}



function imgLocation(parent,content){/**/
    //将parent下的content全部取出
    var cparent=document.getElementById(parent);
    var ccontent=getChildElement(cparent,content);
    //console.log(ccontent);
    var imgWidth=ccontent[0].offsetWidth;//得到图片宽度
    var cols=Math.floor(document.documentElement.clientWidth/imgWidth);//得到一行可以显示多少张图片
    cparent.style.cssText="width:"+imgWidth*cols+"px;margin:0 auto;";
   //注意：cssText会覆盖之前的样式

    var BoxHeightArr=[];

    for(var i=0;i<ccontent.length;i++){
       if(i<cols) {
           BoxHeightArr[i] = ccontent[i].offsetHeight;
           //console.log(BoxHeightArr[i]);
       }
        else{
           var minHeight=Math.min.apply(null,BoxHeightArr);
           //console.log(minHeight);
           var minIndex=getminheightLocation(BoxHeightArr,minHeight);
           ccontent[i].style.position="absolute";
           ccontent[i].style.top=minHeight+"px";
           ccontent[i].style.left=ccontent[minIndex].offsetLeft+"px";
           BoxHeightArr[minIndex]=BoxHeightArr[minIndex]+ccontent[i].offsetHeight;
       }
    }
}

function getminheightLocation(BoxHeightArr,minHeight){
    for(var i in BoxHeightArr){
        if(BoxHeightArr[i]==minHeight){
            return i;
        }
    }
}
function getChildElement(parent,content){
    var contentArr=[];
    var allcontent=parent.getElementsByTagName("*");
    for(var i=0;i<allcontent.length;i++){
        if(allcontent[i].className==content){
            contentArr.push(allcontent[i]);
        }
    }
    return contentArr;
}
/*
随鼠标滚动加载
*/

function checkFlag(){
    var cparent=document.getElementById("container");
    var ccontent=getChildElement(cparent,"box");
    var lastContentHeight=ccontent[ccontent.length-1].offsetTop;
    // console.log(lastContentHeight);
    var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
    // console.log(scrollTop);
    var pageHeight=document.documentElement.clientHeight||document.body.clientHeight;
    //console.log(lastContentHeight+" "+scrollTop+" "+pageHeight);
    if(lastContentHeight<scrollTop+pageHeight){
        return true;
    }
}
