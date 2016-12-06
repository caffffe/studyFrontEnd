问题：
1、为什么点一下小方块出来又消失了啊
无意中把<button>标签放到了<form>标签中，你会发现点击这个button变成了提交，相当于<inputtype="submit"/> 
这一点参见上面第二句标红的话就明白什么意思了。 
不要把<button>标签当成<form>中的input元素。 
所以每“提交”一次都刷新了页面，相当于没有做任何改变，哭。。。。纠结了好久
2、闭包问题
for(var i=0,len=con.childNodes.length;i<len;i++){
		if(con.childNodes[i]==event.target){
			var text=con.childNodes[i].innerText;
			con.childNodes[i].style.opacity="0";
			setTimeout(function(){
               con.removeChild(con.childNodes[i]);
               alert(i);//5
               alert(text);
			},1000);
			
			
}
因为一直报错con.childNodes[i]为Undefined，非常不能理解，原来是i=5，只有四个元素con.childNodes[i]肯定为undefined啦。
改正为
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
