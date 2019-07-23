//动态菜单
const menuList = [
    {
        'title': "首页",
        'key': '/app/home'
    }, {
        'title': "机器人设置",
        'key': '/robot',
        'children':[{
            'title': "开启步骤",
            'key': '/app/start',
        }]
    }
];
export default menuList;