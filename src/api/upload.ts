import {errorMsgTranslate} from '../utils/cn';
import { http } from './base';

export function getHost(ext: string) {
  return http({
    url: '/api/ibs/policy/texture',
    params: {ext}
  });
}

export async function uploadToOSS(File: File): Promise<any> {
  const response = await http({
    url: '/api/ibs/policy/texture',
    params: {ext: File.type.split('/').pop()}
  });
  if (response.data.c !== '0') {
    throw 'get policy error';
  }
  const { host, accessid, policy, signature, filename, callback } = response.data.d;
  const formData = new FormData();
  formData.append('key', filename);
  formData.append('policy', policy);
  formData.append('OSSAccessKeyId', accessid);
  formData.append('success_action_status', '200');
  formData.append('signature', signature);
  formData.append('file', File);

  await http({
    url: host,
    headers: { 'Content-Type': 'multipart/form-data' },
    method: 'post',
    data: formData
  });

  return {link: host + '/' + filename, filename: File.name};
}

export function processModel(ptextureid: string): Promise<any> {
  const reqConfig = {
    url: `/gateway/mg/api/materialinfowithdesc/ptexture/${ptextureid}`,
    params: {
      showoption: false,
      version: 1
    },
    method: 'get',
  };
  return http(reqConfig);
}

export function uploadMixMaterial(data) {
  return http({
    url: '/gateway/cms/vc/api/commodity/gettaskidofuploadtexture',
    data,
    method: 'post'
  });
}

export function pollModelProcess(taskid, onSuccess, onError) {
  let retry = 0;
  function _poll() {
    setTimeout(() => {
      http({
        url: `/gateway/cms/vc/api/commodity/checkasyncuploadtexture`,
        method: 'get',
        params: {taskid},
      }).then((res) => {
        switch (res.data.status) {
          case 3:
            onError();
          case 2:
            onSuccess();
            break;
          default:
            retry += 1;
            if (retry > 5) {
              onError('timeout during checking material status');
            } else {
              _poll();
            }
            break;
        }
      });
    }, 3000);
  }
  _poll();
}

export function batchUploadModels(data: object[]) {
  const reqConfig = {
    method: 'post',
    data,
    url: `/gateway/cms/vc/api/callbackmaterialwithcat`,
  };
  return http(reqConfig);
}

export function fetchCategory(): Promise<any> {
  const reqConfig = {
    method: 'get',
    url: '/api/wbs/texture/cats'
  };
  return http(reqConfig);
}

export function cattreev2(): Promise<any> {
  return http({
    method: 'get',
    url: '/gateway/cms/vc/api/material/cattreev2'
  });
}

export function getPtexture(id: string): Promise<any> {
  return http({
    method: 'get',
    url: `/gateway/mg/api/materialinfowithdesc/ptexture/${id}`,
    params: {
      showoption: false,
      version: 1
    }
  });
}
