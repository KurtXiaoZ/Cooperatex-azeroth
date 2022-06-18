export const toPercent = (point: number) => {
  let str = Number(point * 100).toFixed(0);
  str += "%";
  return str;
}

export const toPoint = (percent: string) => {
  let str = Number(percent.replace("%", ""));
  str = str / 100;
  return toDecimal(str);
}

export const toDecimal = (x: any) => {
  let f = parseFloat(x);
  if (isNaN(f)) return;
  f = Math.round(x * 100) / 100;
  return f;
}

/**
* to change index of array item
* @param {array} arr array
* @param {number} index1 the index of to add item  
* @param {number} index2 the index of to delete item
* 
*/
export function swapArray(arr: any[], index1: number, index2: number) {
  arr[index1] = arr.splice(index2, 1, arr[index1])[0];
  return arr;
}

//handle array to move up
export function zIndexUp(arr: any[], index: number, length: number) {
  if (index + 1 !== length) {
    swapArray(arr, index, index + 1);
  }
}

//handle array to move down
export function zIndexDown(arr: any[], index: number, length: number) {
  if (index !== 0) {
    swapArray(arr, index, index - 1);
  }
}


//handle array to top
export function zIndexTop(arr: any[], index: number, length: number) {
  if (index + 1 !== length) {
    let moveNum = length - 1 - index;
    for (let i = 0; i < moveNum; i++) {
      swapArray(arr, index, index + 1);
      index++;
    }
  }
}

//handle array to bottom

export function zIndexBottom(arr: any[], index: number, length: number) {
  if (index !== 0) {
    let moveNum = index - 0;
    for (let i = 0; i < moveNum; i++) {
      swapArray(arr, index, index - 1);
      index--;
    }
  }
}

/**
 * deep replace
 * @param {Array} arr origin array
 * @param {Function} condition callback
 * @param {String} children children key
 */
export const deepReplace = (originlist: any[], condition: any, key: string, node: any) => {
  return (originlist || []).map((item: any) => {
    const newItem = { ...item }
    if (item[key] === node[key]) {
      condition(newItem)
    } else if (Array.isArray(item.children) && item.children.length) {
      deepReplace(item.children, condition, key, node)
    }
    return newItem
  })
}

/**
 * deep forEach
 * @param {Array} arr origin array
 * @param {Function} condition callback
 * @param {String} children children key
 */
export const deepForeach = (originlist: any[], condition: any, children: string, key: string | number,) => {
  return originlist.map((item: any) => {
    if (item.key === key) {
      const newChildren = condition(item[children])
      return {
        ...item,
        [children]: newChildren
      }
    } else if (children && item[children] && item[children].length) {
      deepForeach(item[children], condition, children, key)
    }
  })
}

/**
 * deep map
 * @param {Array} arr origin array
 * @param {Function} renderItem callback
 * @param {String} children children key
 */
export const deepMap = (originlist: any[], renderItem: any, children: string) => {
  return originlist.map((item: any) => {
    if (children && item[children] && item[children].length) {
      renderItem(item)
      deepMap(item[children], renderItem, children)
    } else {
      return renderItem(item)
    }
  })
}

const replaceMap = (originlist: any[], source: any, newSourceItem: any, destination: any, newDestinationItem: any, children: string) => {
  return originlist.map((item: any) => {
    if (item.key === source.droppableId) {
      return { ...item, ...newSourceItem }
    } else if (item.key === destination.droppableId) {
      return { ...item, ...newDestinationItem }
    } else if (children && item[children] && item[children].length) {
      replaceMap(item[children], source, newSourceItem, destination, newDestinationItem, children)
    } else {
      return item
    }
  })
}

const findItem = (originlist: any[], children: string, source: any, destination: any) => {

  let tempItem: any = {};
  let newSourceItem = {};
  let newDestinationItem = {};

  const deepFind = (originlist: any) => {
    originlist.forEach((item: any) => {
      if (item.key === source.droppableId) {
        tempItem = item[children].splice(source.index, 1)[0]
        newSourceItem = {
          ...item,
          [children]: [...item[children]]
        }
      } else if (tempItem.key && item.key === destination.droppableId) {
        item[children].splice(destination.index, 0, tempItem);
        newDestinationItem = {
          ...item,
          [children]: [...item[children]]
        }
      } else if (children && item[children] && item[children].length) {
        deepFind(item[children])
      }
    })
  }

  deepFind(originlist)

  return {
    newSourceItem,
    newDestinationItem
  }
}


export const arrReplace = (originlist: any[], children: string, source: any, destination: any) => {

  let temptArr = [];
  const { newSourceItem, newDestinationItem } = findItem(originlist, children, source, destination)

  temptArr = replaceMap(originlist, source, newSourceItem, destination, newDestinationItem, children)

  console.log('---------temptArr:', temptArr)

  return originlist

}
export const isArray = (list: any) => list && Array.isArray(list)

export const changeKeyName = (list: any, fieldNames: {
  title: string;
  key: string;
  children: string;
}, renderTitle?: any) => {
  return (list || []).map((i: any) => {
    const newI: any = {}
    newI.title = renderTitle ? renderTitle(i) : i[fieldNames.title];
    newI.key = i[fieldNames.key];
    newI.children = i[fieldNames.children];
    newI.type = i.type;
    newI.style = null;
    if (newI.children && Array.isArray(newI.children)) {
      newI.children = changeKeyName(newI.children, fieldNames, renderTitle)
    }
    return {
      ...i,
      ...newI,

    };
  });
}

export function base64toBlob(dataurl: any) {
  let arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
};
