任务十七：零基础JavaScript编码（五）【已经结束】
面向人群：
零基础或初学者
难度：
中等
重要说明

百度前端技术学院的课程任务是由百度前端工程师专为对前端不同掌握程度的同学设计。我们尽力保证课程内容的质量以及学习难度的合理性，但即使如此，真正决定课程效果的，还是你的每一次思考和实践。

课程多数题目的解决方案都不是唯一的，这和我们在实际工作中的情况也是一致的。因此，我们的要求不仅仅是实现设计稿的效果，更是要多去思考不同的解决方案，评估不同方案的优劣，然后使用在该场景下最优雅的方式去实现。那些最终没有被我们采纳的方案，同样也可以帮助我们学到很多知识。所以，我们列出的参考资料未必是实现需求所必须的。有的时候，实现题目的要求很简单，甚至参考资料里就有，但是背后的思考和亲手去实践却是任务最关键的一部分。在学习这些资料时，要多思考，多提问，多质疑。相信通过和小伙伴们的交流，能让你的学习事半功倍。

任务目的

在上一任务基础上继续JavaScript的体验
接触更加复杂的表单对象
实现页面上的一个完整交互功能
用DOM实现一个柱状图图表
任务描述

参考以下示例代码，原始数据包含几个城市的空气质量指数数据
用户可以选择查看不同的时间粒度，以选择要查看的空气质量指数是以天为粒度还是以周或月为粒度
天：显示每天的空气质量指数
周：以自然周（周一到周日）为粒度，统计一周7天的平均数为这一周的空气质量数值，如果数据中缺少一个自然周的几天，则按剩余天进行计算
月：以自然月为粒度，统一一个月所有天的平均数为这一个月的空气质量数值
用户可以通过select切换城市
通过在"aqi-chart-wrap"里添加DOM，来模拟一个柱状图图表，横轴是时间，纵轴是空气质量指数，参考图（点击打开）。天、周、月的数据只根据用户的选择显示一种。
天：每天的数据是一个很细的矩形
周：每周的数据是一个矩形
月：每周的数据是一个很粗的矩形
鼠标移动到柱状图的某个柱子时，用title属性提示这个柱子的具体日期和数据
任务注意事项

实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
请注意代码风格的整齐、优雅
代码中含有必要的注释
示例图仅为参考，不需要完全一致
点击select或者radio选项时，如果没有发生变化，则图表不需要重新渲染
建议不使用任何第三方库、框架
示例代码仅为示例，可以直接使用，也可以完全自己重写




总结：
1、随机的颜色，本来想用一个数组然后用随机数选择下标，看别人的代码发现可以用  div.style.backgroundColor='#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);，哇！喜欢，学习了
2、用innerHTML取代createElement appendChild
3、之前css3动画没有变化，是因为原本没有div，创建div然后给他高度不会变化，所以要先创建好div，根据情况修改height,才会用transition动画