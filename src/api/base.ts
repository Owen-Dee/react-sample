import axios from 'axios';

const baseURL = '/';

export const http = axios.create({
  baseURL,
});

export function getCookie(name: string) {
  let arr;
  const reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)');
  return (arr = document.cookie.match(reg)) && unescape(arr[2]);
}

export function getAccountId() {
  return new Promise((resolve, reject) => {
    if ((window as any).SAAS_ENV && (window as any).SAAS_ENV.accountId) {
      resolve((window as any).SAAS_ENV.accountId);
      return;
    }

    const jwtToken = getCookie('qunhe-jwt');
    http({
      url: '/gateway/api/cs/data',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }).then(res => {
      const { extraData } = res.data;
      const { value } = extraData.filter(item => item.key === 'vc_id')[0];
      (window as any).SAAS_ENV = (window as any).SAAS_ENV || {};
      (window as any).SAAS_ENV.accountId = value;
      resolve(value);
    });
  });
}
