import React, { Component } from 'react';

export default class InputComp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: '张三'
        }
    }

    handleGetValue = (e) => {
        this.setState({
            name: e.target.value
        })
    }

    render() {
        return (
                <div className="InputComp">
                    <input type="text" value={this.state.name} onChange={this.handleGetValue}/>
                </div>
        );
    }
}