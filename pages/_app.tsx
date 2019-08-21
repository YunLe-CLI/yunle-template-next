import React from "react";
import App, { Container } from "next/app";
import Router from 'next/router'
import {Helmet} from "react-helmet";
import NProgress from 'nprogress'
import { ApolloProvider } from "react-apollo";

import withApollo from "../lib/withApollo";


Router.events.on('routeChangeStart', (url: string) => {
    console.log('Navigating to: ', url);
    NProgress.start()
})
Router.events.on('routeChangeComplete', (url: string) => {
    console.log('Completed navigation to: ', url);
    NProgress.done()
})
Router.events.on('routeChangeError', (url: string) => {
    console.log('error navigation to: ', url);
    NProgress.done()
})

export interface AppProps {
  readonly router: any;
  readonly apolloClient: any;
  readonly Component: any;
}

class MyApp extends App<AppProps, {}> {
    render() {
        const { Component, apolloClient, router } = this.props;
        return (
            <Container>
                <ApolloProvider client={apolloClient}>
                    <Helmet>
                        <html />
                    </Helmet>
                    <Component router={router} />
                </ApolloProvider>
            </Container>
        );
    }
}

export default withApollo(MyApp);
