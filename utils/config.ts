import isAbsoluteUrl from "is-absolute-url";
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

const ENV: string = publicRuntimeConfig.APP_ENV;
export function getEnv(): string {
    let env = 'production';
    switch (ENV) {
        case 'production': {
            env = 'production';
            break
        }
        case 'development': {
            env = 'development';
            break
        }
        case 'qa': {
            env = 'qa';
            break
        }
        default: {
            env = 'production';
        }
    }
    return env;
}

export function getOrigin(url: string): string {
    // eslint-disable-next-line
    let origin = '';
    if (isAbsoluteUrl(url)) {
        return url
    }
    // debugger
    switch (getEnv()) {
        case 'production': {
            origin = 'https://clockapi.laolusays.com';
            break
        }
        case 'development': {
            origin = 'https://clockapi.hexiao-o.com';
            break
        }
        case 'qa': {
            origin = 'https://clockapi-test.laolusays.com';
            break
        }
        default: {
            origin = '';
        }
    }
    return origin + url;
}

export function getVersion(): string {
    const VERSION: string = '';
    return `v${VERSION || '0.0.0'}`
}
export function setToken(token: string): any {
    return localStorage.setItem('token', token);
}
export function getToken(): any  {
    return localStorage.getItem('token');
}
export function clearToken(): any  {
    return localStorage.removeItem('token');
}
interface IConfig {
    appid: string;
    redirect_uri: string;
    wxOuthUrl: () => string;
}

export const appid: string = getEnv() === 'production' ? 'wxa2cd01ab4c0b8a9a' : (getEnv() === 'qa' ? 'wx302a2df3ad67fe5f' : 'wxdb51e94023d131ec');
export const redirect_uri: (path?: string) => string = (path) => {
    let url = '';
    if (typeof window !== 'undefined') {
        url = window && window.location ? window.location.origin+window.location.pathname : '';
    } else {
        url = getEnv() === 'production' ? 'https://clockapi.laolusays.com' : (getEnv() === 'qa' ? 'https://clockapi-test.laolusays.com' : 'http://dakadev.hexiao-o.com');
        url+=path;
    }
    return encodeURI(url);
};
export const wxOuthUrl: (path?:string) => string = (path) => {
    return `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appid}&redirect_uri=${redirect_uri(path)}&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect`
}
const config:Readonly<IConfig> =  {
    appid,
    redirect_uri: redirect_uri(),
    wxOuthUrl,
}
export default config;
