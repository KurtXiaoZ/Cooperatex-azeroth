import { useMemo } from 'react'

//  expanded children only included in expandedKeys  
export const flattenChildren = (originArr: any[], resultArr: any[], expandedKeys: string[]) => {
  originArr.forEach((item: { children: any; key: string }) => {
    resultArr.push(item);
    if (item.children && expandedKeys.includes(item.key)) {
      flattenChildren(item.children, resultArr, expandedKeys)
    }
  })
}

// expanded all children
export const flatten = (originArr: any[], resultArr: any[]) => {
  originArr.forEach((item: { children: any; }, index: any) => {
    resultArr.push(item);
    if (item.children) {
      flatten(item.children, resultArr)
    }
  })
}

export const useFlatten = (dataSource: any, expandedKeys?: string[]) => {
  const datas = useMemo(() => {
    let temp: any[] = [];
    expandedKeys && Array.isArray(expandedKeys) ? flattenChildren(dataSource, temp, expandedKeys) : flatten(dataSource, temp)
    return temp
  }, [dataSource, expandedKeys])
  return datas
}


