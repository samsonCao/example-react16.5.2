import React, { Component } from 'react';
import ajax from '../utils/util';
import './ajaxForm.less'
import daJson from './dataJson.json';
import daJson2 from './ajaxForm2.json'

export default class AjaxForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            searchValue: '',
        }
    }


    componentDidMount() {
        const that = this;
        ajax({
            data: {
                searchValue: that.state.searchValue,
            },
            success(data) {
                //因为没有真实的接口此处肯定执行的是error所以this.setState放在error里面了
            },
            error() {
                console.log(daJson)
                if(daJson.code === 200) {
                    // ajax返回值
                    that.setState({
                        list:daJson.data.result
                    })
                }
            }
        });

        this.setState({
            mapData: '请求成功了'
        })
    }

    handelAjax = () => {
        const that = this;
        ajax({
            data: {
                searchValue: that.state.searchValue,
            },
            success(data) {
                //因为没有真实的接口此处肯定执行的是error所以this.setState放在error里面了
            },
            error() {
                console.log(daJson2)
                if(daJson2.code === 200) {
                    // ajax返回值
                    that.setState({
                        list:daJson2.data.result
                    })
                }
            }
        });
    }

    backInitData = () => {
        const that = this;
        ajax({
            data: {
                searchValue: that.state.searchValue,
            },
            success(data) {
                //因为没有真实的接口此处肯定执行的是error所以this.setState放在error里面了
            },
            error() {
                console.log(daJson)
                if(daJson.code === 200) {
                    // ajax返回值
                    that.setState({
                        list:daJson.data.result
                    })
                }
            }
        });
    }



    render() {
        return (
                <div className="table-container">
                    <div className="search-input-content">
                        <input type="text" placeholder="输入任意值搜索"
                               style={{
                                   height: '30px',
                                   lineHeight: '30px',
                                   borderRadius: '5px',
                                   border: '3px solid #fff'
                               }}
                               onChange={(e) => this.setState({searchValue: e.target.value})}/>
                        <span className="search-btn"
                                onClick={this.handelAjax}>搜索</span>
                        <span className="search-btn"
                              onClick={this.backInitData}>返回原来的值</span>
                    </div>
                    <table className="table-content"  border="0" cellSpacing="0" cellPadding="0">
                        <caption>ajax请求返回表单</caption>
                        <thead>
                        <tr>
                            <th>客户编号</th>
                            <th>客户名称</th>
                            <th>品牌</th>
                            <th>门店数量</th>
                            <th>门店类型</th>
                            <th>银行账号</th>
                            <th>操作</th>
                        </tr>
                        </thead>
                        <tbody>
                        {console.log(this.state.list,111)}
                            {this.state.list.map((item,index) => {
                                return <tr key={item.id}>
                                    <td>{item.customerNo}</td>
                                    <td>{item.shopName}</td>
                                    <td>{item.brand}</td>
                                    <td>{item.storeCount}</td>
                                    <td>{item.typeTitle}</td>
                                    <td>{item.paymentCount}</td>
                                    <td>2</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
        );
    }
}