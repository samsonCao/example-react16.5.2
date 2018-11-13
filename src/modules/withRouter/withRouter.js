import React, { Component } from 'react';
import { withRouter} from 'react-router-dom';

//withRouter高阶组件，提供了history让你使用~
//这是官方推荐做法哦。但是这种方法用起来有点难受，
//比如我们想在redux里面使用路由的时候，我们只能在组件把history传递过去。。
class WithRouterRedirect extends Component {


    handleOnClick = () => {

        //注意--即使不引用withRouter 并且不把组件WithRouterRedirect和withRouter绑定
        // this.props.history.push("/ajaxMethod");也是可以直接执行的
        this.props.history.push("/ajaxMethod");

        //测试git flow
    }

    render() {
        return (
                <div className="Detail">
                    <button onClick={this.handleOnClick} type="button">withRouter方式跳转-跳转ajax请求页面</button>
                </div>
        );
    }
}

// 把组件WithRouterRedirect和withRouter绑定
export default withRouter(WithRouterRedirect);