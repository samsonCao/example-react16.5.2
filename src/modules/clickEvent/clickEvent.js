import React, { Component } from 'react';

export default class ClickEvent extends Component {
    state = {
        count: 0,
    }

    handleClickAdd = (e) => {
        this.setState({
            count: this.state.count += 1
        })
    }

    handleClickArguments = (args1, args2) => {
        console.log(args1, args2)
    }
    render() {
        return (
                <div className="Detail">
                    <div>
                        <button onClick={this.handleClickAdd}>点我增加</button>
                        <p> {this.state.count}</p>
                    </div>
                    <div>
                        <button onClick={() => this.handleClickArguments(100, 200)}>点击事件传递参数</button>
                        <p> 请在控制台查看consol.log()查看参数100， 200是否传递成功</p>
                    </div>
                </div>
        );
    }
}