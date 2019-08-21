import moment from "moment";
import querystring from 'querystring'
import request from '../utils/request'

interface IGetUserTokenInfo {
  code: string;
}
/**
 * 获取用户token
 * api doc url: http://localhost:8888
 * @param params 
 */
export async function getUserToken(params: IGetUserTokenInfo): Promise<any> {
    return request(`/public/wechat/oauth?code=${params.code}`, {
        method: 'GET',
    });
}

/**
 * 检查用户token
 * api doc url: http://localhost:8888
 * @param params 
 */
export async function checkUserToken(token: string): Promise<any> {
    return request(`/api/clock/info`, {
        method: 'GET',
        token,
    });
}

/**
 * 检查用户token
 * api doc url: http://localhost:8888
 * @param params 
 */
export async function getUserInfo(): Promise<any> {
    return request(`/api/user`, {
        method: 'GET',
    });
}

/**
 * 获取用户打卡信息
 * api doc url: http://localhost:8888
 * @param params 
 */
export async function getUserNum(): Promise<any> {
    return request(`/api/clock/info`, {
        method: 'GET',
    });
}

export interface IGetCalendarParams {
    date: Date;
}
/**
 * 获取打卡日历
 * api doc url: http://47.100.239.26:13000/project/16/interface/api/25
 * @param params 
 */
export async function getCalendar(param: IGetCalendarParams): Promise<any> {
    return request(`/api/clock/calendar?date=${moment(param.date).unix()}`, {
        method: 'GET',
    });
}

export interface IGetCardParams {
    date: Date;
}
/**
 * 获取打卡图片
 * api doc url: http://47.100.239.26:13000/project/16/interface/api/29
 * @param params 
 */
export async function getCard(param: IGetCardParams): Promise<any> {
    return request(`/api/clock/card?date=${moment(param.date).unix()}`, {
        method: 'GET',
    });
}

/**
 * 获取打卡提醒
 * api doc url: http://47.100.239.26:13000/project/16/interface/api/37
 * @param params 
 */
export async function getNotice(): Promise<any> {
    return request(`/api/user/conf`, {
        method: 'GET',
    });
}
export interface IsetNoticeParams {
    is_clock_in_notice_on: boolean;
    clock_in_notice_time: Date;
    is_clock_out_notice_on: boolean;
    clock_out_notice_time: Date;
}
/**
 * 修改打卡提醒
 * api doc url: http://47.100.239.26:13000/project/16/interface/api/33
 * @param params 
 */
export async function setNotice(params: IsetNoticeParams): Promise<any> {
    const body = {
        is_clock_in_notice_on: !!params.is_clock_in_notice_on,
        clock_in_notice_time: (moment(params.clock_in_notice_time).unix()),
        is_clock_out_notice_on: !!params.is_clock_out_notice_on,
        clock_out_notice_time: (moment(params.clock_out_notice_time).unix()),
    }
    return request(`/api/user/conf/clock/notice`, {
        method: 'PUT',
        body: JSON.stringify(body)
    });
}

/**
 * 早打卡
 * api doc url: http://47.100.239.26:13000/project/16/interface/api/39
 * @param params 
 */
export async function clockIn(): Promise<any> {
    return request(`/api/clock/in`, {
        method: 'POST',
    });
}

/**
 * 晚打卡
 * api doc url: http://47.100.239.26:13000/project/16/interface/api/39
 * @param params 
 */
export async function clockOut(): Promise<any> {
    return request(`/api/clock/out`, {
        method: 'POST',
    });
}