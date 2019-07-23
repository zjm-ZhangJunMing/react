import React, {Component} from 'react';
import {Menu,Icon} from "antd";
import menuConfig from '../../config/menuConfig';
import {
    Link
} from 'react-router-dom';
import 'antd/dist/antd.css';

const {SubMenu} = Menu;
const MenuItem = Menu.Item;

export default class Index extends Component {

    componentWillMount() {
        const menuList = this.renderMenu(menuConfig);
        console.log(menuList);
        this.setState({
            menuList
        })
    }

    //使用递归
    renderMenu = (data) => {
        return data.map((item) => {
            // return(
                if(item.children){
                    return(
                        <SubMenu
                            key={item.key}
                            title={
                                <span>
                                    <Icon type="mail" />
                                    <span>{item.title}</span>
                                </span>
                            }
                        >
                            {item.children.map((items)=>{
                               return <Menu.Item key={items.key}>
                                        <Link to={items.key}>{items.title}</Link>
                                      </Menu.Item>
                            })}
                        </SubMenu>
                    )
                }else{
                    return(

                        <Menu.Item key={item.key}>
                            <Icon type="user" />
                            <span className="nav-text">{item.title}</span>
                            <Link to={item.key}></Link>
                        </Menu.Item>
                        )
                }
            // )
            // if (item.children) {
            //     return (
            //         <SubMenu key={item.key} title={item.title}>
            //             {this.renderMenu(item.children)}
            //         </SubMenu>
            //     )
            // } else {
            //     return (
            //         <MenuItem key={item.key} title={item.title}>
            //             {item.title}
            //         </MenuItem>
            //     )
            // }
        })
    };

    render() {
        return (
            <Menu mode="inline"
                theme='dark'>
                {this.state.menuList}
            </Menu>
        );
    }
}