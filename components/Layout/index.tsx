// @ts-nocheck
import * as React from 'react'
import Link from 'next/link'
// import getConfig from 'next/config'
import { withRouter } from 'next/router'
import querystring from 'querystring'
import classNames from 'classnames'
import { Flex } from 'antd-mobile';
// @ts-ignore
import styles from './styles.less'

// const { publicRuntimeConfig } = getConfig();

interface Props {
    router: any;
    className?: string;
    children?: any;
}

class Layout extends React.Component<Props, {}> {
    state = {
        isShow: false,
    }
    componentDidMount() {
        const isShow = !localStorage.getItem('isShow');
        this.setState({
            isShow: isShow,
        });
    }
    render() {
        return (
            <div className={classNames(styles.page)}>
                {this.props.children}
            </div>
        )
    }
}

export default withRouter(Layout);
