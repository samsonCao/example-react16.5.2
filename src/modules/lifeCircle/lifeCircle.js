import React, {Component} from 'react';

export default class LifeCircle extends Component {

    constructor(props) {
        console.log(props,'props执行了')
        super(props);
        // Don't call this.setState() here!
        this.state = {
            counter: 0
        };

        //点击事件写法2
        // this.handleCountAdd = this.handleCountAdd.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        console.log(this, nextProps, prevState, 'getDerivedStateFromProps执行了');
        if (nextProps.counter !== undefined && nextProps.counter !== prevState.counter) {
            return {
                counter: nextProps.counter
            };
        }
        return null;
    }


    componentDidMount() {
        console.log(this, arguments, 'componentDidMount执行了')
        this.setState({
            counter: 1
        })
    }

    /**
     * 如果componentDidMount执行了this.setState()
     * 组件会先执行static getDerivedStateFromProps()
     * 再执行shouldComponentUpdate()
     * 然后执行render 重新渲染页面
     * */



    shouldComponentUpdate(newProps, newState) {
        console.log(this, arguments, newProps, newState,'shouldComponentUpdate执行了');
        console.log(newState.counter, this.state.counter,'对比')

        //true会更新  false不会更新
        return newState.counter !== this.state.counter;
    }


    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log(this, arguments, prevProps, prevState,'getSnapshotBeforeUpdate执行了')
        if (prevState.counter < this.state.counter) {
            return this.state.counter
        }
        return null;
    }

    componentDidUpdate(prevProps, prevState, counter) {
        console.log(this, prevProps, prevState, counter, 'componentDidUpdate执行了')
        // if (counter !== null) {
        //     this.setState({
        //         counter: counter
        //     })
        // }
    }


    componentWillUnmount(){
        //例如在其他地方定义的定时器，可以在该组件中清除
        // let timer = setTimeout(function () {
        //
        // }, 200)

        // clearInterval(timer)
    }

    componentDidCatch(error, info) {
        console.log(this, arguments, error, info, 'componentDidCatch执行了')
        this.setState({ hasError: true });
        // You can also log the error to an error reporting service
        // logErrorToMyService(error, info);
    }

    //点击事件写法2
    // handleCountAdd() {
    //     this.setState({
    //         counter: this.state.counter + 1
    //     })
    // }

    //点击事件写法1
    handleCountAdd = () => {
        this.setState({
            counter: this.state.counter + 1
        })
    }

    render() {
        console.log('render执行了')

        //点击事件写法1
        return <div className="blogPage" onClick={this.handleCountAdd}>
            <div>{this.state.counter}</div>
            <button>点我增加</button>
        </div>;

        // 点击事件写法2
        // return <div className="blogPage" onClick={this.handleCountAdd}>{this.state.counter}</div>;
    }
}