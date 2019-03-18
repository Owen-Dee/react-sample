const aliyun = require('@qunhe/aliyun-coohom');
const {name, version} = require('../manifest.json');
const fs = require('fs-extra');

// 将配置文件一并发布到cdn，以供框架层反射式调用
fs.copySync('./manifest.json', './build/manifest.json');

const index = fs.readFileSync('./build/index.html', {encoding: 'utf8'});
const cssReg = /link href="(.*?)" rel/g
const csslink1 = cssReg.exec(index)[1];
const csslink2 = cssReg.exec(index)[1];
console.log(csslink1);
console.log(csslink2);
const jsReg = /script src="(.*?)">/g
const jslink1 = jsReg.exec(index)[1];
const jslink2 = jsReg.exec(index)[1];
console.log(jslink1);
console.log(jslink2);

// 写最终模板文件
const cdnhost = 'https://cdn.coohom.com';
const prefix = `/i18n/commercial-hive/${name}/${version}`;
const entryTemplate = fs.readFileSync('./scripts/entry.html').toString();
const entryDist = `
<link href="${cdnhost}${prefix}${csslink1}" rel="stylesheet">
<link href="${cdnhost}${prefix}${csslink2}" rel="stylesheet">
${entryTemplate}
<script src="${cdnhost}${prefix}${jslink1}"></script>
<script src="${cdnhost}${prefix}${jslink2}"></script>
`
fs.writeFileSync('./build/entry.html', entryDist);

aliyun.ossUtils.upload({
    dir: 'build',
    prefix,
});
