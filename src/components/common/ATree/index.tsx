import React, { useEffect, useMemo, useRef, useState } from 'react';
import Search from '../Search';
import Icon from '../Icon';
import './index.less';
import RcTree from '../RcTree';
import { changeKeyName } from 'utils/tools';
import { flatten } from 'utils/hooks';

interface IProps {
  dataSource?: any[];
  onSelect?: (value: any) => any;
  extraList?: any[];
  [props: string]: any
}

function Tree({ dataSource = [], onSelect, fieldNames = {
  title: 'title',
  id: 'id',
  children: 'children',
}, renderTitle, extraList, ...restProps }: IProps) {

  const [datas, setDatas] = useState<any[]>([]);
  const [searchValue, setSearchValue] = useState<any>('')

  useEffect(() => {
    const newData = changeKeyName(dataSource, fieldNames, renderTitle)
    setDatas([...newData])
  }, [dataSource])

  const searchList = useMemo(() => {
    let newList: any[] = [];
    if (searchValue) {
      // TODO: To be optimized
      flatten(dataSource, newList)
      newList = (newList || []).filter((item: any) => {
        return item[fieldNames.title].search(searchValue) !== -1 && !item.children
      })
    }
    return newList
  }, [searchValue])

  const handleSearch = (value: any) => {
    // console.log('-------tree search value:', value)
    // setSearchValue(value)
    let newList: any[] = [];

    if (searchValue) {
      // TODO: To be optimized
      console.log('-------tree search value:', value)

      flatten(dataSource, newList)
      // newList = (newList || []).filter((item: any) => {
      //   return item[fieldNames.title].search(searchValue) !== -1 && !item.children
      // })
      console.log('-------newList:', newList)
    }
  }

  const handleSelect = (node: any) => {
    if (!node.children) {
      onSelect && onSelect(node)
    }
  }

  return (
    <div className="tree-container">
      <div className="tree-header" >
        <Search showSearch onChange={handleSearch} />
        {extraList && <div className="tree-extra">{extraList.map((extra: any, index: number) => React.cloneElement(extra, {
          key: index
        }))}</div>}
      </div>
      <div>
        {searchList.length ? searchList.map((node: any) => (
          <div
            key={node.key}
            className={"tree-node search-list"}
          >
            <span
              className="tree-switcher"
            >
              <Icon name={(node.type && node.type.replace(node.type[0], node.type[0].toUpperCase())) || 'pagesChecked'} />
            </span>
            <span
              style={{ padding: '0 4px' }}
              onClick={() => handleSelect(node)}
            >
              {node[fieldNames.title]}
            </span>
          </div>))
          : <RcTree
            dataSource={datas}
            handleSelect={handleSelect}
            icon={(nodeProps: any) => {
              const { expanded, data } = nodeProps;
              return <Icon name={!Array.isArray(data[fieldNames.children]) ? (data.type && data.type.replace(data.type[0], data.type[0].toUpperCase())) || 'pagesChecked' : expanded ? 'Folder' : 'FolderCheckedUnfold'} />
            }}
            {...restProps}
          />
        }
      </div>
    </div>
  );
}

export default Tree;