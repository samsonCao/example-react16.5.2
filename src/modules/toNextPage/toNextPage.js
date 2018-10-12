import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class ToNextPage extends Component {
    state = {
        redirect: false
    }

    handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({redirect: true});
    }

    render() {
        console.log(this.state.redirect,22222)
        if (this.state.redirect) {
            //使用场景1-简单路由 to是字符串
            // return <Redirect push to="/Detail" />;

            // 使用场景2传递更多参数-带参数的 to-带search参数的字符串
            // return <Redirect push to="/sample?a=xxx&b=yyy" />

            //使用场景3-传一个对象过去，里面可以放任意参数
            return <Redirect to={{
                pathname: '/Detail',
                search: '?utm=helloWorld',
                data: 'xxx'
            }}/>

        }

        return (
                <div className="Detail">
                    <button onClick={this.handleOnClick} type="button">点我--跳转Detail页面</button>
                </div>
        );
    }
}