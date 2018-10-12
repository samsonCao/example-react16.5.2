import React, { Component } from 'react';
import ajax from '../utils/util';

export default class AjaxMethod extends Component {
    state = {
        mapData: '尚未开始',
    }

    componentDidMount() {
        // ajax({
        //     method: 'POST',
        //     url: 'xxx',
        //     data: {
        //         cityId: '',
        //         key: ''
        //     },
        //     success: function (response) {
        //         console.log(response)
        //     }
        // });

        this.setState({
            mapData: '请求成功了'
        })
    }

    handelAjax = () => {
        // ajax({
            //     method: 'POST',
            //     url: 'xxx',
            //     data: {
            //         cityId: '',
            //         key: ''
            //     },
            //     success: function (response) {
            //         console.log(response)
            //     }
            // });
        this.setState({
            mapData: '再次请求成功了'
        })

    }

    render() {
        return (
                <div>
                   <div>
                       ajax请求： {this.state.mapData}
                   </div>
                    <button onClick={this.handelAjax}>再次请求</button>
                </div>
        );
    }
}