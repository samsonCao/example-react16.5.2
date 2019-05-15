import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
    Input,
    OutsideWrapper,
    Icon
} from '@/components';
import './index.less';

// TODO: 此处的all、queryOne函数需要组件外部作为参数传入，增加可扩展性 @caoyouzhi
@connect(
        state => ({
            loadings: state.loading.effects.NJContactSelect
        }),
        dispatch => ({
            all: dispatch.NJContactSelect.all,
            queryOne: dispatch.NJContactSelect.queryOne
        })
)
class AsyncSearchSelect extends Component {
    static propTypes = {
        all: PropTypes.func,

        onChange: PropTypes.func,

        loadings: PropTypes.object,

        /**
         * 当前操作的数据
         */
        value: PropTypes.number,

        queryOne: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            searchText: '',
            list: [],
            open: false,
            disabled: false,
            readonly: false
        };
        this.onQueryList = this.onQueryList.bind(this);

        // Debounce
        this.onQueryList = _.debounce(this.onQueryList, 700);
    }

    componentWillReceiveProps = async (nextProps) => {
        if (nextProps.value !== this.props.value) {
            await this.queryContactDetail(nextProps.value);
        }
    }

    queryContactDetail = async (id) => {
        const { queryOne } = this.props;
        if (!id) {
            this.setState({
                searchText: null
            });
            return;
        }
        await this.setState({ loading: true });
        const res = await queryOne({ id });
        await this.setState({
            searchText: res.data.name
        });
    };

    // 模糊搜索-查询负责人列表
    onQueryList = async () => {
        const value = this.state.searchText;
        if (value === '') {
            this.setState({
                list: []
            });
            const { onChange } = this.props;
            onChange && onChange(undefined);
            return;
        };
        try {
            // todo 此处的all函数需要组件外部作为参数传入，增加可扩展性
            const result = value.trim();
            const res = await this.props.all({ name: result });
            await this.setState({
                list: res.data,
                open: true
            });
        } catch (e) {
            await this.setState({
                list: [],
                open: true
            });
            const { onChange } = this.props;
            onChange && onChange(undefined);
        }
    };

    // 输入文字搜索
    onSelectChange = async (event) => {
        const value = event.target.value;
        await this.setState({
            searchText: value
        });
        await this.onQueryList();
    };

    // 获取焦点
    onFocus = () => {
        this.setState({
            open: true
        });
    };

    // 单击选中值
    onItemClick = (item) => {
        const { onChange } = this.props;
        this.setState({
            searchText: item.name,
            open: false,
            disabled: true,
            readonly: true
        });
        onChange && onChange(item.id);
    };

    // 点击icon清空值
    onIconClick = () => {
        this.setState({
            searchText: '',
            open: false,
            readonly: false
        });
        const { onChange } = this.props;
        onChange && onChange(undefined);
    };

    // 异步调用防止组件写在后执行setState方法
    componentWillUnmount() {
        this.onQueryList.cancel(); // in case we need to fire handler immediately.
    }

    render() {
        const {
            list,
            searchText,
            open,
            readonly
        } = this.state;
        const { loadings } = this.props;
        let suffix =  <span />;
        if (loadings.all) {
            suffix = <Icon type='loading' />;
        }
        if (!loadings.all && searchText) {
            suffix = <Icon type='close-circle' theme='filled' style={{ color: 'rgba(0,0,0,0.35)' }} onClick={this.onIconClick} />;
        }

        return (
                <OutsideWrapper onClickOutside={() => this.setState({ open: false })}>
                    <React.Fragment>
                        <Input
                                readonly={readonly ? 'readonly' : null}
                                size='small'
                                value={searchText}
                                onChange={this.onSelectChange}
                                onBlur={this.onBlur}
                                onFocus={this.onFocus}
                                style={{ width: '100%' }}
                                loading={open.toString()}
                                suffix={suffix}
                        />
                        {list.length > 0 && open && <div className='nj-asyncSearch'>
                            <div className='nj-asyncSearch__container scroll'>
                                <ul className='nj-asyncSearch__container-list'>
                                    {list.map(item => (
                                            <li
                                                    key={item.id}
                                                    value={item}
                                                    className='nj-asyncSearch__container-item'
                                                    onClick={() => this.onItemClick(item)}
                                            >{item.name}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>}
                        {list.length === 0 && open && <div className='nj-asyncSearch'>
                            <div className='nj-asyncSearch__container '>
                                <div className='nj-asyncSearch__container__none'>
                                    <span className='nj-asyncSearch__container__none-tips' disabled={true}>暂无数据</span>
                                </div>
                            </div>
                        </div>}
                    </React.Fragment>
                </OutsideWrapper>
        );
    }
}

export default AsyncSearchSelect;
