<template>
    <div>
        <div  id="mapContainer"></div>
    </div>
</template>

<script>
    export  default  {
        data()  {
            return  {
                car:require("../../common/img/car.png"),
                boat:require("../../common/img/boat.png"),
                Railway:require("../../common/img/train@2x.png"),
                flag:require("../../common/img/flag.png"),
                caryw:require("../../common/img/caryw.png"),
                boatyw:require("../../common/img/boatyw.png"),
                Railwayyw:require("../../common/img/trainyw.png"),
                flagyw:require("../../common/img/flagyw.png"),
                path:[],//处理后的数据
                paths:[],//处理前的数据
                userType:""//判断是业外还是非业外
            }
        },
        mounted()  {
            var  self=this;
            //  给window  定义全局方法  供ios  Android  调用  返回用户信息
            window['getFilterUserFromNative']  =  (str)  =>  {
                let  user=this.$api.formatNative(str);

                //  获取用户信息  处理逻辑
                const  USER=this.$api.getAppUser(user);
                self.userType=USER.customerCode.toLowerCase()=="yw" ? "yw" : ""
                self.mapgetData();
            };
        },
        methods:  {
            mapgetData(){
                var  self=this;
                var  vin  =  this.getUrlParams("vin");
                var  dealerCode  =  this.getUrlParams("dealerCode");
                var  orderId  =  this.getUrlParams("orderId");
                var  params  =  {
                    vin:  vin,
                    dealerCode:dealerCode
                }
                var  paramsyw  =  {
                    vin:  vin,
                    orderId:orderId
                }
                self.$api.post("crm/crmOrder/getRouteTrackByVin",self.userType=="yw" ? paramsyw : params,success => {
                    self.paths=success.repData;
                    self.mapMethod()
                },error => {
                    self.$toast.top("失败");
                })
            },
            setArr(path){
                let arr=path
                let sortId=0,
                    beforeType="",
                    newArr=[],
                    curList =[];

                for(let i=0;i<arr.length;i++){
                    let val=arr[i];
                    if(arr[i].type!=beforeType){
                        curList =[];
                        // if(i!=0){
                        // newArr[sortId-1].push(val);
                        // curList.push(arr[i-1]);
                        // }
                        curList.push(val);
                        newArr.push(curList);
                        sortId++;
                        beforeType=val.type;
                    }else{
                        curList.push(val);
                    }

                }
                for(let j=0;j<newArr.length;j++){
                    if(j<(newArr.length-1)){
                        newArr[j].push(newArr[j+1][0]);
                    }
                    if(newArr[j][0].type=="S"){
                        if(j!=0){
                            newArr[j].unshift(newArr[j-1][0]);
                        }

                    }
                }
                return newArr
            },
            mapMethod(){
                var self=this;
                //初始化地图
                var  map  =  new  AMap.Map("mapContainer",  {
                    zoom: 13,
                    center: [116.43, 39.92],
                    resizeEnable: true
                });
                //获取经纬度的长度
                var pathlength = self.paths.length - 1;
                //返回处理后的数据（进行水路描线，其他走公路）
                self.path=self.setArr(self.paths)
                for (var i = 0; i < self.path.length; i++) {
                    if(self.path[i].length>1 && self.path[i][1].type!="R"){
                        //水路
                        var polylinePath=[];
                        for(var k=0;k<self.path[i].length;k++){
                            polylinePath.push(new AMap.LngLat(self.path[i][k].lnglat[0],self.path[i][k].lnglat[1]))
                        }
                        var polyline = new AMap.Polyline({
                            path: polylinePath,
                            borderWeight: 2, // 线条宽度，默认为 1
                            draggable: false,//设置折线是否可拖拽移动，默认为false
                            lineJoin: 'round', // 折线拐点连接处样式默认值为'miter'尖角，其他可选值：'round'圆角、'bevel'斜角
                            lineCap: 'round',//折线两端线帽的绘制样式，默认值为'butt'无头，其他可选值：'round'圆头、'square'方头
                            strokeColor: "#0dad53", //线颜色
                            strokeOpacity: 1,       //线透明度
                            strokeWeight: 5,        //线宽
                            showDir: true,           //是否显示方向
                            strokeStyle: "solid",   //线样式
                            strokeDasharray: [10, 5], //补充线样式
                        });
                        map.add(polyline)
                    }else {
                        //公路路线
                        var pathMap=[];
                        var truckDriving = new AMap.TruckDriving({
                            map: map,
                            policy: 0, // 规划策略
                            size: 1, // 车型大小
                            isOutline: true,
                            outlineColor: '#ffeeee',
                            hideMarkers:true
                        })
                        for(var k=0;k<self.path[i].length;k++){
                            pathMap.push({lnglat:(self.path[i][k].lnglat)})
                        }
                        truckDriving.search(pathMap, function(status, result) {})
                    }
                }
                // 创建起点标记
                var marker1 = new AMap.Marker({
                    position: new AMap.LngLat(self.paths[0].lnglat[0], self.paths[0].lnglat[1]),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
                    // title: '北京',
                    // url(https://webapi.amap.com/theme/v1.3/markers/n/start.png) no-repeat
                    animation: "AMAP_ANIMATION_DROP",
                    icon: "https://webapi.amap.com/theme/v1.3/markers/n/start.png",
                    zIndex: 100//多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
                    // content:"<span>起点</span>"
                });
                // 创建终点标记
                var marker2 = new AMap.Marker({
                    position: new AMap.LngLat(self.paths[pathlength].lnglat[0], self.paths[pathlength].lnglat[1]),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
                    // title: '北京',
                    animation: "AMAP_ANIMATION_BOUNCE",
                    // icon: "https://webapi.amap.com/theme/v1.3/markers/n/end.png",
                    zIndex: 100,//多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
                    // content:"<span>终点</span>"
                    icon: new AMap.Icon({
                        image: self.userType=="yw" ? this.flagyw : this.flag,
                        size: new AMap.Size(72, 72),  //图标大小
                        imageSize: new AMap.Size(40,40)
                    })
                });
                //创建经过点标记
                for (var i = 1; i < self.paths.length - 1; i++) {
                    var iconPicture=self.paths[i].type == "S" ? this.boat : (self.paths[i].type == "R" ? this.car : this.Railway)
                    var iconPictureyw=self.paths[i].type == "S" ? this.boatyw : (self.paths[i].type == "R" ? this.caryw : this.Railwayyw)
                    map.add(new AMap.Marker({
                            position: new AMap.LngLat(self.paths[i].lnglat[0], self.paths[i].lnglat[1]),   // 经纬度对象，如 new AMap.LngLat(116.39, 39.9); 也可以是经纬度构成的一维数组[116.39, 39.9]
                            // title: '北京',
                            animation: "AMAP_ANIMATION_DROP",
                            icon: new AMap.Icon({
                                image:  self.userType=="yw" ? iconPictureyw : iconPicture,
                                size: new AMap.Size(72, 72),  //图标大小
                                imageSize: new AMap.Size(40,40)
                            }),
                            // icon: self.path[i].sea == true ? "/static/img/boat.318dc35.png" : "/static/img/car.a45e0dd.png",
                            zIndex: 88//多个点标记叠加时，通过该属性使级别较高的点标记在上层显示默认zIndex：100
                            // content:"<span>终点</span>"
                        })
                    )
                }
                // 创建纯文本标记
                var text = new AMap.Text({
                    text: self.paths[pathlength].location,
                    textAlign: 'center', // 'left' 'right', 'center',
                    verticalAlign: 'top', //middle 、bottom
                    draggable: false,
                    cursor: 'pointer',
                    zIndex: 1000,
                    // angle:10,
                    style: {
                        'padding': '.75rem 1.25rem',
                        'margin-bottom': '1rem',
                        'border-radius': '.25rem',
                        'background-color': '#fff',
                        'border-width': 0,
                        'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
                        'text-align': 'center',
                        'font-size': '12px',
                        'color': '#000'
                    },
                    position: self.paths[pathlength].lnglat
                });
                text.setMap(map);
                map.add([marker1,marker2])
            },
            getUrlParams(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null) return unescape(r[2]);
                return null;
            }
        }
    }
</script>

<style scoped>
    .amap-logo {
        /*display: none !important;*/
        opacity: 0;
    }

    .amap-copyright {
        opacity: 0 !important;
    }
</style>

