/*
* 功能：表格统计
* 日期：2017-11-14
* */

$(function () {
    //添加日期
    var obj = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];
    //数据加载
    dataLoading(obj);
    //动态求和函数
    summationFunction();
});

/*数据加载*/
function dataLoading(obj) {
    //求和容器
    var num = [];
    obj.forEach(function (item) {
        $("tbody").append("<tr><td>"+item+"</td></tr>")
    });
    //添加内容
    $.getJSON("json/data.json",function (res) {
        for (var x in res){
            //添加thead
            $("thead tr").append("<th>" + res[x].name + "</th>");
            //添加tbody
            (res[x].value).forEach(function (arr,idx) {
               $("tbody tr").eq(idx).append("<td contenteditable='true'>" + arr + "</td>")
            });
            //求和
            var str = (res[x].value).reduce(function (a,b) {
                return a+b
            })
            //将每一项的求和push在一个数组里面
            num.push(str);
        }
        //添加tfoot求和的数据
        num.forEach(function (item) {
            $("tfoot tr").append("<td>" + item + "</td>")
        })

        objData(function (obj) {
            //调用柱状图函数
            graphical(obj.txtTh,obj.txtNum);
            //调用柱状图函数
            proportion(obj.txtTh,obj.sumTd)
        });

    })
}

/*动态求和函数*/
function summationFunction() {
    //获得焦点的时候添加选中效果
    $("tbody tr").on("focus" ,"td",function () {
        $(this).addClass("checked");
    });
    //失去焦点的时候添加选中效果
     $("tbody tr").on("blur" ,"td",function () {
        $(this).removeClass("checked");
    });

    //input事件
    $("tbody tr").on("input" ,"td",function () {
        var sumArry = [];
       //获取当前失去焦点元素的文本值
        var $txt = $(this).text();
        //判断当前的值是否为空
        if ($txt){
            sumArry.push($txt);
        }else {
            $(this).text("0")
        }
        //获取当前的索引值
        var $idx = $(this).index();
        //获取其他同级的位置元素的值
        for (var i = 0 ; i < $(this).parent().siblings().length ; i++ ){
           var abc =  $(this).parent().siblings().eq(i).children().eq($idx).text();
           //将获取到的文本值放在一个数组里
            sumArry.push(abc);
        }
        //求和
        var sum = sumArry.reduce(function (a,b) {
            return parseFloat(a)+parseFloat(b)
        });
        //将求和出来的数据加载出来
        $("tfoot td").eq($idx).text(sum);

        objData(function (obj) {
            //调用柱状图函数
            graphical(obj.txtTh,obj.txtNum);
            //调用柱状图函数
            proportion(obj.txtTh,obj.sumTd)
        });
    })
}


/*获取数据 加入图形中*/
function objData(callBack) {
    //数据容器
    var txtTh =[];
    var txtTd = [];
    var txtNum = [];
    var sumTd = [];
    //获取thead
    for (var j = 0 ; j < $("thead tr th").length -1; j++){
        var thT = $("thead th").eq(j + 1).text();
        txtTh.push(thT);
    };
    //获取tbody
    var TrData =  $("tbody tr");
    for (var n = 0 ; n < $("tbody tr").eq(1).children("td").length - 1 ; n++){
        for(var i = 0; i < $("tbody tr").length; i++){
            txtTd.push(parseFloat(TrData.eq(i).children("td").eq(n + 1).text()))
        }
        txtNum.push(txtTd)
        txtTd = []
    }
    //获取总计
    for (var k = 0 ; k < $("tfoot td").length -1 ; k++){
        var a = parseFloat($("tfoot td").eq(k + 1).text())
        sumTd.push(a)
    }
    txtNum.push(txtTd);
    if (callBack){
        callBack({txtTh,txtNum,sumTd})
    }
}

var obj = ["星期一","星期二","星期三","星期四","星期五","星期六","星期日"];


/*生活消费数据*/
function graphical(txtTh,txtNum)  {
        var myChartBar = echarts.init(document.getElementById('cylGraph'),"dark");
        var option = {
        //  图表标题
            title: {
            textStyle:{
            fontFamily:"微软雅黑",
                fontSize:20,
                color:"#B7D9F3"
        },
        //标题的文本内容设置
        text: '本周生活消费数据',
        top:12
    },
        // 鼠标悬浮提示工具
        tooltip: {},
        // 图注
        legend: {
        //系列项
            data:txtTh,
            orient: 'vertical',
            itemGap:38.5,
            right: 0,
            top: 50
        },
        xAxis: {
        // x轴
            data: obj
        },
        // Y轴
        yAxis: {},
        // 柱状图的之间的间距
        barGap:"3%",
        // 系列配置
            series: [
                {
                    name:txtTh[0],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[0]
                },
                {
                    name:txtTh[1],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[1]
                },
                {
                     name:txtTh[2],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[2]
                },{
                     name:txtTh[3],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[3]
                },{
                     name:txtTh[4],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[4]
                },{
                     name:txtTh[5],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[5]
                },{
                     name:txtTh[6],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[6]
                },{
                     name:txtTh[7],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[7]
                },{
                     name:txtTh[8],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[8]
                },{
                     name:txtTh[9],
                    //“bar"是柱状图 ,"line"是折线图，"pie"是饼状图
                    type: "bar",
                    data: txtNum[9]
                }
        ],
            grid:{
            left:30,
                top:50,
                right:90,
                bottom:50
        }
    };
        // 使用刚指定的配置项和数据显示图表。
        myChartBar.setOption(option);
    }

/*生活消费数据比重*/
function proportion(txtTh,sumTd) {
        var myChartPie = echarts.init(document.getElementById('pieChart'),"dark");
        myChartPie.setOption({
            title:{
                text:"本周生活消费比重",
                left:20,
                top:12,
                textStyle:{
                    fontFamily:"微软雅黑",
                    fontSize:20,
                    color:"#B7D9F3"
                },
            },
            legend:{
                data:txtTh,
                orient: 'vertical',
                right: 0,
                top: 140,
            },
            tooltip:{},
            series : [
                {
                    // name: '访问来源',
                    type: 'pie',
                    //设置饼状图大小
                    radius: '60%',
                    data:[
                        {value:sumTd[0], name:txtTh[0]},
                        {value:sumTd[1], name:txtTh[1]},
                        {value:sumTd[2], name:txtTh[2]},
                        {value:sumTd[3], name:txtTh[3]},
                        {value:sumTd[4], name:txtTh[4]},
                        {value:sumTd[5], name:txtTh[5]},
                        {value:sumTd[6], name:txtTh[6]},
                        {value:sumTd[7], name:txtTh[7]},
                        {value:sumTd[8], name:txtTh[8]},

                    ]
                }
            ]
        })
    }











