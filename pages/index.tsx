import * as React from 'react'
import classNames from 'classnames'
import {Helmet} from "react-helmet";
// @ts-ignore
import styles from './styles.less'

import Layout from '../components/Layout'


export interface HomeProps {
  isLogin: boolean;
  router: any;
  setTheme?: any;
  theme?: any;
  client: any;
}
export interface HomeState {}
class Home extends React.Component<HomeProps, HomeState> {
    state: HomeState = {};
    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <Layout className={classNames(styles.page)}>
                <Helmet>
                    <title>test page</title>
                </Helmet>
                <div className={classNames(styles.page)}>
                    123
                </div>
            </Layout>
        )
    }
}

export default Home;
