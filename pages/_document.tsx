import Document, { Html, Head, Main, NextScript } from 'next/document'
import React from "react";
import * as theme from '../theme';

class MyDocument extends Document {
    // @ts-ignore
    static async getInitialProps(ctx) {
        const initialProps: any = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        const primaryColor = theme["brand-primary"];
        const __NEXT_DATA__: any = this.props.__NEXT_DATA__ || {};
        const { page }: any = __NEXT_DATA__;
        console.log(page, 111)
        return (
            <Html lang="zh-cmn-Hans" data-scale="true">
                <Head>
                    <link rel="icon" href="/static/favicon.ico" />
                    <link rel="shortcut icon" href="/static/favicon.ico" />
                    <link rel="icon" sizes="16x16 32x32 64x64" href="/static/favicon.ico" />
                    <link rel="icon" type="image/png" sizes="96x96" href="/static/favicon-96.png" />
                    <link rel="icon" type="image/png" sizes="32x32" href="/static/favicon-32.png" />
                    <link rel="apple-touch-icon" href="/static/favicon-57.png" />
                    <link rel="apple-touch-icon" sizes="114x114" href="/static/favicon-114-precomposed.png" />
                    <link rel="apple-touch-icon" sizes="72x72" href="/static/favicon-72-precomposed.png" />
                    <link rel="apple-touch-icon" sizes="144x144" href="/static/favicon-144-precomposed.png" />
                    <link rel="apple-touch-icon" sizes="60x60" href="/static/favicon-60.png" />
                    <link rel="apple-touch-icon" sizes="120x120" href="/static/favicon-120-precomposed.png" />
                    <link rel="apple-touch-icon" sizes="76x76" href="/static/favicon-76.png" />
                    <link rel="apple-touch-icon" sizes="152x152" href="/static/favicon-152-precomposed.png" />
                    <link rel="apple-touch-icon" sizes="180x180" href="/static/favicon-180-precomposed.png" />
                    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no" key="viewport" />
                    <link href="https://cdn.bootcss.com/nprogress/0.2.0/nprogress.css" rel="stylesheet" />
                    <link href="https://cdn.bootcss.com/driver.js/0.9.7/driver.min.css" rel="stylesheet" />
                    <script src="https://cdn.bootcss.com/driver.js/0.9.7/driver.min.js" />
                    <style type="text/css">
                        {
                            `
                              #nprogress .bar {
                                background: ${primaryColor}!important;
                              }
                              #nprogress .peg {
                                box-shadow: 0 0 10px ${primaryColor}, 0 0 5px  ${primaryColor}!important;
                              }
                              #nprogress .spinner-icon {
                                border-top-color: ${primaryColor}!important;
                                border-left-color: ${primaryColor}!important;
                              }
                              .markdown-body {
                                box-sizing: border-box;
                                min-width: 200px;
                                max-width: 980px;
                                margin: 0 auto;
                                padding: 45px;
                              }
                            `
                        }
                    </style>
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
