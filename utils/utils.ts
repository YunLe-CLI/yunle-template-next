import { Modal, Toast } from 'antd-mobile'
import { wxOuthUrl, clearToken } from './config';

export function reWxSing(): any {
    Toast.hide()
    clearToken()
    Modal.alert('用户登录失效', '是否重新授权登录?', [
        {
            text: '取消',
            onPress: () => {

            }
        },
        {
            text: '重新授权',
            onPress: () => {
                if (wxOuthUrl()) {
                    document.location.replace(wxOuthUrl());
                }
            }
        },
    ]);
}
