import React, { useEffect, useState } from 'react';
import { gData } from 'utils/treeData';
import './index.less';
import 'assets/index.less';
import Tree from 'rc-tree';
import ArrowIcon from '../ArrowIcon';
import Icon from '../Icon';
import { changeKeyName, isArray } from 'utils/tools';

function allowDrop({ dropNode, dropPosition }: any) {
  if (!dropNode.children) {
    if (dropPosition === 0) return false;
  }
  return true;
}

const RcTree = (props: any) => {

  const { dataSource, handleData, defaultExpandedKeys, handleSelect, ...restProps } = props

  const [gData, setGData] = useState([])
  const [autoExpandParent, setAutoExpandParent] = useState(true)
  const [expandedKeys, setExpandedKeys] = useState(defaultExpandedKeys || [])

  useEffect(() => {
    setGData(dataSource)
  }, [dataSource])

  const onDrop = (info: { node: { key: any; pos: string; }; dragNode: { key: any; }; dropPosition: number; }) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split('-');
    const dropPosition = info.dropPosition - Number(dropPos[dropPos.length - 1]);

    const loop = (data: any[], key: any, callback: { (item: any, index?: any, arr?: any): void; }) => {
      data.forEach((item: { key: any; children: any; }, index: any, arr: any) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };
    const data = [...gData];

    // Find dragObject
    let dragObj: any;
    loop(data, dragKey, (item: any, index?: any, arr?: any) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (dropPosition === 0) {
      // Drop on the content
      loop(data, dropKey, (item: { children: any[]; }) => {
        // eslint-disable-next-line no-param-reassign
        item.children = item.children || [];
        // where to insert 
        item.children.unshift(dragObj);
      });
    } else {
      // Drop on the gap (insert before or insert after)
      let ar: any;
      let i: number = 0;
      loop(data, dropKey, (item: any, index?: any, arr?: any) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar?.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data)
    handleData && handleData(data)
  };

  const onExpand = (expandedKeys: any) => {
    setExpandedKeys(expandedKeys)
    setAutoExpandParent(false)
  };

  const onSelect = (selectedKeys: any, info: any) => {
    console.log('selected', selectedKeys, info);
    handleSelect && handleSelect(info)
  };

  return (
    <div className="draggable-tree">
      <Tree
        allowDrop={allowDrop}
        expandedKeys={expandedKeys}
        onExpand={onExpand}
        autoExpandParent={autoExpandParent}
        draggable
        onDrop={onDrop}
        treeData={gData}
        onSelect={onSelect}
        switcherIcon={(nodeProps: any) => {
          const { isLeaf, expanded } = nodeProps
          return !isLeaf ? < ArrowIcon iconStyle={{
            width: 9,
            height: 9
          }} point={expanded ? 'l' : "b"} /> : <span style={{
            minWidth: 20
          }} />
        }}
        {...restProps}
      />
      {/* </div> */}
    </div>
  );

}

export default RcTree
