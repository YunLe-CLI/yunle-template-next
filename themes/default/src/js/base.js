/* global someFunction window:true $:true document:true PGTool:true navigator:true */
/* eslint no-undef: "error" */
function getQueryString(key) {
  const reg = new RegExp(`(^|&)${key}=([^&]*)(&|$)`);
  const result = window.location.search.substr(1).match(reg);
  return result ? decodeURIComponent(result[2]) : null;
}
function msgAlert(type, msg) {
  $(`.msg_${type}`).html(msg);
  $(`.msg_${type}`).animate({ top: 0 }, 500);
  setTimeout(() => { $(`.msg_${type}`).animate({ top: '-1rem' }, 500); }, 2000);
}
function inArr(data, arr) {
  let has = false;
  for (let i = 0; i < arr.length; i += 1) {
    if (data === arr[i]) {
      has = true;
      break;
    }
  }
  return has;
}
function setTitle(t) {
  document.title = t;
  const i = document.createElement('iframe');
  i.src = './images/header.png';
  i.style.display = 'none';
  i.onload = function load() {
    setTimeout(() => {
      i.remove();
    }, 9);
  };
  document.body.appendChild(i);
}
function getInfo(config, _data, cb) {
  $.ajax({
    type: 'POST',
    url: config.url,
    data: _data,
    success(data) {
      if (data.status === 200) {
        const nowStats = data.data.nowStats || {};
        const conditions = data.data.conditions || {};
        const userInfo = data.data.userInfo[0] || {};
        const setData = {};
        setData.works = nowStats.workNum || 0;
        setData.follow = nowStats.followsNum || 0;
        setData.fans = nowStats.fansNum || 0;
        setData.B_works = conditions.workNum || 0;
        setData.B_follow = conditions.followsNum || 0;
        setData.B_fans = conditions.fansNum || 0;
        setData.uPic = userInfo.avatar || '';
        setData.uName = userInfo.nickname || '';
        if (cb) {
          cb(setData);
        }
      } else {
        msgAlert('warning', data.message);
      }
    },
    error(err) {
      msgAlert('warning', err);
    },
  });
}
function init(config) {
  const initData = config;
  const $name = $('.js-name');
  const $pic = $('.js-pic');
  const $works = $('.js-works');
  const $fans = $('.js-fans');
  const $follow = $('.js-follow');
  // 头像
  if (initData.uPic) {
    $pic.attr('src', initData.uPic);
  }
  // 名称
  if (initData.uName) {
    $name.text(initData.uName);
  }
  $works.find('.daran-info span').text(initData.B_works);
  $follow.find('.daran-info span').text(initData.B_follow);
  $fans.find('.daran-info span').text(initData.B_fans);
  if (initData.works >= initData.B_works) {
    $works.addClass('ok');
  } else {
    $works.find('.daran-e').text(initData.B_works - initData.works);
  }
  if (initData.follow >= initData.B_follow) {
    $follow.addClass('ok');
  } else {
    $follow.find('.daran-e').text(initData.B_follow - initData.follow);
  }
  if (initData.fans >= initData.B_fans) {
    $fans.addClass('ok');
  } else {
    $fans.find('.daran-e').text(initData.B_fans - initData.fans);
  }
}

(() => {
  // 初始数据
  const initConfig = {
    devConfig: {
      // url: '/api/mock/checkV2',
      url: '/api/rap/481/user/expert/checkV2',
      locList: [
        'zh',
        'en',
        'th',
        'ko',
        'vi',
        'es-MX',
        'ru',
        'hi',
        'es',
        'pt',
        'in',
        'pt-BR',
        'ja',
      ],
      locLan: 'zh',
      uPic: '',
      uName: '',
      works: 0,
      follow: 0,
      fans: 0,
      B_works: 0,
      B_follow: 0,
      B_fans: 0,
      goTo_ios_one: 'camera360://2.0/pcmediapublish?maxCount=9',
      goTo_ios_two: 'camera360://2.0/topDresser',
      goTo_ios_three: 'camera360://2.0/pcmediapublish?maxCount=9',
      goTo_and_one: 'app://camera360/publish',
      goTo_and_two: 'app://camera360/masterListFriend',
      goTo_and_three: 'app://camera360/publish',
    },
    proConfig: {
      url: '/api/rap/481/user/expert/checkV2',
      locList: [
        'zh',
        'en',
        'th',
        'ko',
        'vi',
        'es-MX',
        'ru',
        'hi',
        'es',
        'pt',
        'in',
        'pt-BR',
        'ja',
      ],
      locLan: 'en',
      uPic: '',
      uName: '',
      works: 0,
      follow: 0,
      fans: 0,
      B_works: 0,
      B_follow: 0,
      B_fans: 0,
      goTo_ios_one: 'camera360://2.0/pcmediapublish?maxCount=9',
      goTo_ios_two: 'camera360://2.0/topDresser',
      goTo_ios_three: 'camera360://2.0/pcmediapublish?maxCount=9',
      goTo_and_one: 'app://camera360/publish',
      goTo_and_two: 'app://camera360/masterListFriend',
      goTo_and_three: 'app://camera360/publish',
    },
  };
  $(() => {
    const PGTools = new PGTool();
    const LAN_MAP = window.LAN_MAP;
    const env = window.__ENV__;
    const config = (
      env === 'production' ?
      initConfig.proConfig : initConfig.devConfig
    );
    let loc = config.locLan;
    config.uPic = getQueryString('uPic') || '';
    config.uName = getQueryString('uName') || '';
    config.works = getQueryString('works') || 0;
    config.follow = getQueryString('follow') || 0;
    config.fans = getQueryString('fans') || 0;
    config.B_works = getQueryString('B_works') || 0;
    config.B_follow = getQueryString('B_follow') || 0;
    config.B_fans = getQueryString('B_fans') || 0;
    $('html').attr('class', `lan-${loc}`);
    setTitle(LAN_MAP.lan_1[loc]);
    // 开发环境
    // if (env !== 'production') {
      PGTools.getNativeInfo = (cb) => {
        cb({});
      };
      PGTools.createSignature = (q, cb) => {
        cb({});
      };
    // }
    // end开发环境
    try {
      PGTools.getNativeInfo((res) => {
        const resData = res || {};
        const result = resData.result || {};
        const language = result.language || '';
        loc = language ? language.substring(0, 2) : 'en';
        if (loc === 'es') {
          if (language.indexOf('es-MX') !== -1) {
            loc = 'es-MX';
          } else {
            loc = 'es';
          }
        }
        if (loc === 'id') {
          loc = 'in';
        }
        if (language.indexOf('pt-BR') !== -1) {
          loc = 'pt-BR';
        }
        const has = inArr(loc, config.locList);
        if (!has) {
          loc = 'en';
        }
        config.locLan = loc || 'en';
        $('html').attr('class', `lan-${loc}`);
        $('html').attr('class', `lan-${loc}`);
        setTitle(LAN_MAP.lan_1[loc]);

        result.userId = result.uid;
        result.locale = result.language;
        result.UTCOffset = 0;
        result.appkey = 'zW4A1cZR2Ju3G05V';
        result.cid = '';
        delete result.gpid;
        delete result.idfa;
        result.grayScheme = 'A';
        result.initStamp = 0;
        result.latiude = 0;
        result.mcc = '';
        result.mnc = '';
        result.timeZone = '';
        result.token = result.userToken;
        delete result.udid;
        result.appname = result.appName;
        result.appversion = result.appVersion;
        delete result.language;
        delete result.mac;
        result.localTime = 0;
        result.geoinfo = result.geoInfo;
        delete result.geoInfo;
        delete result.mobile;
        result.longitude = 0;
        result.needUserInfo = 1;
        result.platform = 'h5';
        const decodeParams = {};
        /* eslint guard-for-in: "error" */
        for (const k1 in result) {
          decodeParams[k1] = decodeURIComponent(result[k1]);
        }

        const p = {
          params: decodeParams,
        };

        PGTools.createSignature(p, (r) => {
          decodeParams.sig = r.sig;
          getInfo(config, decodeParams, (setData) => {
            config.works = setData.works;
            config.follow = setData.follow;
            config.fans = setData.fans;
            config.B_works = setData.B_works;
            config.B_follow = setData.B_follow;
            config.B_fans = setData.B_fans;
            config.uPic = setData.uPic;
            config.uName = setData.uName;
            init(config);
          });
        });
        if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
          $('.js-goto-one').attr('href', config.goTo_ios_one);
          $('.js-goto-two').click(() => {
            PGTools.back();
          });
          $('.js-goto-three').attr('href', config.goTo_ios_three);
        } else if (/(Android)/i.test(navigator.userAgent)) {
          $('.js-goto-one').attr('href', config.goTo_and_one);
          $('.js-goto-two').attr('href', config.goTo_and_two);
          $('.js-goto-three').attr('href', config.goTo_and_three);
        }
      });
    } catch (e) {
      msgAlert('warning', 'PGTools error');
      $('html').attr('class', `lan-${loc}`);
      setTitle(LAN_MAP.lan_1[loc]);
    }
  });
})();
