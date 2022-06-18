import React, { createElement, useMemo } from 'react';
import Card from '../common/Card/index';
import modifiers from './modifiers';
import { withStore, StoreProps } from 'store'
import './index.less';
import { filterSetters } from './config';

function VisualEditor({ store }: StoreProps) {
  const { state: { curElement, pageData }, setPageDate } = store;
/*
  const curNode = useMemo(() => {
    const newNode = deepFind(pageData?.nodes || [], 'id', curElement?.id, 'nodes')
    return newNode || curElement
  }, [curElement, pageData])

  const handleChange = (visualValue: any) => {
    const VEDeepMap = (list: any[]) => {
      return list.map((item: any) => {
        let newI: any = {}
        if (curNode?.id === item.id) {
          newI = {
            ...item,
            ...visualValue
          }
        }
        if (item.nodes && Array.isArray(item.nodes)) {
          newI.nodes = VEDeepMap(item.nodes)
        }

        return {
          ...item,
          ...newI,
        }
      })
    }

    const newNodes = VEDeepMap(pageData?.nodes || [])

    setPageDate(
      {
        ...pageData,
        nodes: [...newNodes]
      }, 'visual editor'
    )
  }

  const modifierList = useMemo(() => {
    let elementSetters = ['Background']
    if (curNode.type) {
      elementSetters = ['Alignment', 'Background', ...(filterSetters[curNode?.type] ? filterSetters[curNode?.type] : [])]
    }
    return (modifiers || []).map(((modifier = {}) => {
      for (const key in modifier) {
        return elementSetters?.includes(key) ? ({
          key: key,
          styleTitle: key,
          styleContent: createElement(modifier[key], {
            curElement: curNode,
            onChange: handleChange,
            elementSetters
          })
        }) : null
      }
    })).filter(i => !!i)
  }, [curNode])
*/


  return (
    <div className="visual-editor-container">
      
    </div>
  );
}

export default withStore(VisualEditor);