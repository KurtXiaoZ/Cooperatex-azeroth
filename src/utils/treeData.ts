/* eslint-disable no-loop-func, no-mixed-operators, no-console, no-plusplus, no-underscore-dangle */

export function generateData(x = 3, y = 2, z = 1, gData = []) {
  // x：每一级下的节点总数。y：每级节点里有y个节点、存在子节点。z：树的level层级数（0表示一级）
  function _loop(_level: number, _preKey?: string, _tns?: any[]) {
    const preKey = _preKey || '0';
    const tns = _tns || gData;

    const children = [];
    for (let i = 0; i < x; i++) {
      const key = `${preKey}-${i}`;
      tns.push({ title: `${key}-label`, key: `${key}-key` });
      if (i < y) {
        children.push(key);
      }
    }
    if (_level < 0) {
      return tns;
    }
    const __level = _level - 1;
    children.forEach((key, index) => {
      tns[index].children = [];
      return _loop(__level, key, tns[index].children);
    });

    return null;
  }
  _loop(z);
  return gData;
}
export function calcTotal(x = 3, y = 2, z = 1) {
  /* eslint no-param-reassign:0 */
  const rec: any = (n: number) => (n >= 0 ? x * y ** n-- + rec(n) : 0);
  return rec(z + 1);
}
console.log('总节点数（单个tree）：', calcTotal());
// 性能测试：总节点数超过 2000（z要小）明显感觉慢。z 变大时，递归多，会卡死。

export const gData = generateData();

function isPositionPrefix(smallPos: string | any[], bigPos: string) {
  if (bigPos.length < smallPos.length) {
    return false;
  }
  // attention: "0-0-1" "0-0-10"
  if (bigPos.length > smallPos.length && bigPos.charAt(smallPos.length) !== '-') {
    return false;
  }
  return bigPos.substr(0, smallPos.length) === smallPos;
}
// console.log(isPositionPrefix("0-1", "0-10-1"));

// arr.length === 628, use time: ~20ms
export function filterParentPosition(arr: any[]) {
  const levelObj: any = {};
  arr.forEach(item => {
    const posLen = item.split('-').length;
    if (!levelObj[posLen]) {
      levelObj[posLen] = [];
    }
    levelObj[posLen].push(item);
  });
  const levelArr = Object.keys(levelObj).sort();
  for (let i = 0; i < levelArr.length; i += 1) {
    if (levelArr[i + 1]) {
      levelObj[levelArr[i]].forEach((ii: string | any[]) => {
        for (let j = i + 1; j < levelArr.length; j += 1) {
          levelObj[levelArr[j]].forEach((_i: string, index: string | number) => {
            if (isPositionPrefix(ii, _i)) {
              levelObj[levelArr[j]][index] = null;
            }
          });
          levelObj[levelArr[j]] = levelObj[levelArr[j]].filter((p: any) => p);
        }
      });
    }
  }
  let nArr: any[] = [];
  levelArr.forEach(i => {
    nArr = nArr.concat(levelObj[i]);
  });
  return nArr;
}
// console.log(filterParentPosition(
//   ['0-2', '0-3-3', '0-10', '0-10-0', '0-0-1', '0-0', '0-1-1', '0-1']
// ));

function loopData(data: any, callback: any) {
  const loop = (d: any[], level: number | string = 0) => {
    d.forEach((item, index) => {
      const pos = `${level}-${index}`;
      if (item.children) {
        loop(item.children, pos);
      }
      callback(item, index, pos);
    });
  };
  loop(data);
}

function spl(str: string) {
  return str.split('-');
}
function splitLen(str: string) {
  return str.split('-').length;
}

export function getFilterExpandedKeys(data: any, expandedKeys: string | any[]) {
  const expandedPosArr: any[] = [];
  loopData(data, (item: { key: string; }, index: any, pos: any) => {
    if (expandedKeys.indexOf(item.key) > -1) {
      expandedPosArr.push(pos);
    }
  });
  const filterExpandedKeys: any[] = [];
  loopData(data, (item: { key: any; }, index: any, pos: string) => {
    expandedPosArr.forEach(p => {
      if (
        ((splitLen(pos) < splitLen(p) && p.indexOf(pos) === 0) || pos === p) &&
        filterExpandedKeys.indexOf(item.key) === -1
      ) {
        filterExpandedKeys.push(item.key);
      }
    });
  });
  return filterExpandedKeys;
}

function isSibling(pos: string[] | void[], pos1: string[] | void[]) {
  pos.pop();
  pos1.pop();
  return pos.join(',') === pos1.join(',');
}

export function getRadioSelectKeys(data: any, selectedKeys: string | any[], key: any) {
  const res: any[] = [];
  const pkObjArr: any[][] = [];
  const selPkObjArr: any[] = [];
  loopData(data, (item: { key: any; }, index: any, pos: any) => {
    if (selectedKeys.indexOf(item.key) > -1) {
      pkObjArr.push([pos, item.key]);
    }
    if (key && key === item.key) {
      selPkObjArr.push(pos, item.key);
    }
  });
  const lenObj: any = {};
  const getPosKey = (pos: string, k: any) => {
    const posLen = splitLen(pos);
    if (!lenObj[posLen]) {
      lenObj[posLen] = [[pos, k]];
    } else {
      lenObj[posLen].forEach((pkArr: string[], i: string | number) => {
        if (isSibling(spl(pkArr[0]), spl(pos))) {
          // 后来覆盖前者
          lenObj[posLen][i] = [pos, k];
        } else if (spl(pkArr[0]) !== spl(pos)) {
          lenObj[posLen].push([pos, k]);
        }
      });
    }
  };
  pkObjArr.forEach(pk => {
    getPosKey(pk[0], pk[1]);
  });
  if (key) {
    getPosKey(selPkObjArr[0], selPkObjArr[1]);
  }

  Object.keys(lenObj).forEach(item => {
    lenObj[item].forEach((i: any[]) => {
      if (res.indexOf(i[1]) === -1) {
        res.push(i[1]);
      }
    });
  });
  return res;
}