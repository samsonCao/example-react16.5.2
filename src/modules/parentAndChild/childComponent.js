import React, {Component} from 'react';

// ChildComponent子组件---在index.js父组件中引用
export default class ChildComponent extends Component {
    constructor(props) {
        super(props);
        console.log(this.props, 22222);
        //第一步: 初始化通过this.props从父组件name属性及其值-此处是组件的属性数据
        const {name} = this.props;

        //第二步把name放到this.state中，属性数据变为子组件内部的状态数据
        this.state = {
            name,
        };
    }

    //替换了componentWillReceiveProps
    /**
     *第六步:在父组件中执行，父组件通过this.props.callBack(e.target.value)，
     *并通过this.setState({name:name})把子组件的改变的值赋值给父组件的内部的状态数据name
     * */
    /**
     * 第七步: 父组件name属性改变后，触发子组件<ChildComponent name=xxx>的name属性数据更新
     * 从而触发子组件更新，通过return方法再赋值给子组件的name状态数据。
     * */
    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(nextProps,'nextProps12121')
        /**
         * 对比下一个属性数据和子组件自身的上一次状态数据
         *不一致的话把下一次的属性数据赋值给当前组件的状态数据name
         * */
        if (nextProps.name !== undefined && nextProps.name !== prevState.name) {
            return {
                name: nextProps.name
            };
        }
        return null;
    }

    //第四步:定义onChange事件
    handleGetValue = (e) => {
        // 第五步:执行this.props.callBack，并把input的值e.target.value传递给父组件。
        this.props.callBack(e.target.value);
    }

    render() {
        return (
                <div className="childComp">
                    {/*第三步:赋值给input的value,并给input绑定onChange事件*/}
                    <input type="text" value={this.state.name} onChange={this.handleGetValue}/>
                    <span className="child-desc">我是子组件我的值改变了导致父组件值也改变了{this.state.name}</span>
                </div>
        );
    }
}