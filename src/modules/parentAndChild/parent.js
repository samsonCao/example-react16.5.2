import React, { Component } from 'react';
import ChildComponent from './childComponent';

export default class Parent extends Component {
    // 约束性组件-要先在state中定义属性name
    state = {
        name: '初始值',
    }

    /**
     *第六步:在父组件中执行，父组件通过this.props.callBack(e.target.value)，
     *并通过this.setState({name:name})把子组件的改变的值赋值给父组件的内部的状态数据name
     * */
    handleChange = (name) => {
        this.setState({
            name: name
        })
        console.log(name,99999)
    }

    render() {
        return (
                <div className="blogPage">
                    {/*为子组件传递属性数据、状态数据、方法*/}
                    {/*属性数据name（string类型）-来源于状态数据this.state.name*/}
                    {/*属性数据(function类型)callBack--在子组件第五步触发，在当前组件第六步触发函数体内的具体方法*/}
                    <ChildComponent name={this.state.name} callBack={this.handleChange}/>
                    <span className="parent-desc">父组件接收值: {this.state.name}</span>
                </div>
        );
    }
}