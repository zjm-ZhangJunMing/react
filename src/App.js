import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';
import 'antd/dist/antd.css';
import Welcome from "./pages/welcome/index"
import MenuCom from "./pages/menu/index"
import PageMain from "./pages/pagemain/index"
import Tree from "./pages/tree/index"

const { Header, Content, Footer, Sider } = Layout;

//  const Topics= (props)=>{
//     return(
//         <div>首页</div>
//     )
// }
// const Home= ()=>{
//     return(
//         <div>机器人</div>
//     )
// }

class App extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    componentDidMount(){
        const {location}=this.props
        console.log(location)
    }
    render() {
        return (
            <Layout>
                <Router>
                <Sider
                    trigger={null}
                    collapsible
                    collapsed={this.state.collapsed}
                >

                    <div className="logo" />
                        <MenuCom/>
                </Sider>
                <Layout>
                    <Header style={{ background: '#000', padding: 0 }}>
            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
            <Icon
                className="trigger"
                type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                onClick={this.toggle}
                style={{cursor: 'pointer'}}
            />
            </span>
                        <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>Information Management System</span>
                        <span style={{color:'#fff', float:'right', paddingRight:'1%'}}>
                </span>
                    </Header>
                    <Content style={{ margin: '0 16px', background:"#fff"}}>
                        <Breadcrumb style={{ padding: '12px 0',background:"#f0f2f5"}}>
                            <Breadcrumb.Item>User</Breadcrumb.Item>
                            <Breadcrumb.Item>Bill</Breadcrumb.Item>
                        </Breadcrumb>
                        {/*<div style={{ padding: 24, background: '#fff', minHeight: 780 }}>*/}
                                    {/*<Route exact path="/app" component={Welcome}/>*/}
                                    {/*<Route  path="/app/home" component={PageMain}/>*/}
                                    {/*<Route path="/app/start" component={Tree}/>*/}
                        {/*</div>*/}
                        <div style={{width:"100%",height:"100%"}}>
                            <Route exact path="/app" component={Welcome}/>
                            <Route  path="/app/home" component={PageMain}/>
                            <Route path="/app/start" component={Tree}/>
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}>
                        Ant Design ©2016 Created by Ant UED
                    </Footer>
                </Layout>
                </Router>
            </Layout>
        );
    }
}

export default App;