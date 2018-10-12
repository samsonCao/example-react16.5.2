import React, { Component } from 'react';

export default class Detail extends Component {
    constructor(props) {
        super(props)
        this.state = {
                location: props.location
        }
    }
    renderLocation = () => {
        return Object.keys(this.props.location).map((item, index) => {
            return <div key={item}>
                <span>key: {item}----value:{this.props.location[item]}</span>
            </div>
        })
    };

    render() {
        return (
                <div className="Detail">
                    欢迎来到detail页面
                    可以通过this.props.location.state找到从toNextPage页面传递过来的参数
                    {this.renderLocation()}
                </div>
        );
    }
}