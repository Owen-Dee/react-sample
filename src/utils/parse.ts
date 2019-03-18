import {CascaderOptionType} from 'antd/lib/cascader';

interface ICategories {
  name: string;
  parentId: number;
  prodCatId: number;
}

function findParent(data: ICategories[], parentId: number | null, parentObj: object) {
  data.forEach((d: ICategories) => {
    if (parentId) {
      if (d.parentId === parentId) {
        parentObj[d.prodCatId] = {name: d.name};
      }
    } else if (!d.parentId) {
      parentObj[d.prodCatId] = {name: d.name};
    }
  });
  Object.keys(parentObj).map(key => {
    if (key === 'name') {
      return;
    }
    findParent(data, Number(key), parentObj[key]);
  });
}

function parseCate(pids: object, rv: CascaderOptionType) {
  Object.keys(pids).forEach(p => {
    if (p === 'name') {
      return;
    }
    const obj = {value: p, label: pids[p].name, children: []};
    rv.push(obj);
    parseCate(pids[p], obj.children);
  });
}

export function buildCascader(data) {
  const pids: any[] = [];
  data.forEach((d, index) => {
    pids.push({
      value: String(index),
      label: d.baseCatName,
      children: d.physicalTextures.map(pt => ({
        value: pt.obsPtextureId,
        label: pt.name
      }))
    });
  });
  return pids;
}
