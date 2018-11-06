
import Link from 'next/link';
import React from 'react';
import { Button } from 'antd';
import WithDva from '../utils/store';

import styles from './index.less';

class Page extends React.Component {
  static async getInitialProps(props) {
    // first time run in server side
    // other times run in client side ( client side init with default props
    // console.log('get init props');
    const {
      pathname, query, isServer, store,
    } = props;
    // dispatch effects to fetch data here
    await props.store.dispatch({ type: 'index/init' });
    return {
      // dont use store as property name, it will confilct with initial store
      pathname, query, isServer, dvaStore: store,
    };
  }

  render() {
    const { index } = this.props;
    const { name, count } = index;
    // console.log('rendered!!');
    return (
      <div className={styles.wrap}>
      Hi,{name}!! &nbsp;
        <p>count:&nbsp; {count}</p>
        <p>
          <Button type="primary" onClick={() => { this.props.dispatch({ type: 'index/caculate', delta: 1 }); }} >
        plus
          </Button>
        </p>
        <p>
          <Button type="primary" onClick={() => { this.props.dispatch({ type: 'index/caculate', delta: -1 }); }} >
          minus
          </Button>
        </p>
        <p>
          <Link href="/users">
            <a>Go to /users</a>
          </Link>
        </p>
      </div>
    );
  }
}

export default WithDva((state) => { return { index: state.index }; })(Page);
