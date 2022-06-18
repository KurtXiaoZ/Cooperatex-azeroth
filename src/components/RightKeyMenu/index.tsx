import React, { useEffect, useMemo } from "react";
import rightMenuEvents from "utils/events";
import { allRightMenuList } from './datas'
import './index.less'

interface IProps {
  element?: any;
  fromList?: boolean;
  menuList?: any[];
  tempData?: any
}

interface RightMenuEvent {
  key: any
}

const RightKeyMenu = ({ element, fromList, menuList, tempData }: IProps) => {

  const rightMenuList = useMemo(() => {
    if (menuList) return menuList;
    if (!element) {
      const newList = allRightMenuList.filter((group: any) => group.type === 'elementDataKey').map((group: any) => {
        const { children } = group;
        return {
          ...group,
          children: children.filter((item: any) => item.key === 'paste')
        }
      })
      return newList
    }

    if (element.editableStatus?.resizable) {
      const newList = allRightMenuList.filter((group: any) => group.type === 'elementDataKey' || group.type === 'elementStatusKey').map((group: any) => {
        const { children } = group;
        return {
          ...group,
          children: children.filter((item: any) => item.key === 'paste' || item.key === 'unlock' || item.key === 'hide')
        }
      })
      return newList
    }

    if (!fromList) {
      const newList = allRightMenuList.map((group: any) => {
        if (group.type === 'elementStatusKey') {
          const { children } = group;
          return {
            ...group,
            children: children.filter((item: any) => item.key !== 'show')
          }
        }
        return group
      })
      return newList
    }

    return allRightMenuList
  }, [element])

  const handleItemClick = (rightMenuEvent: RightMenuEvent) => {
    const { key } = rightMenuEvent
    rightMenuEvents[key]?.(element);
  }

  return (
    <div className="right-key-menu-container">
      <div className="right-key-menu-content">
        {rightMenuList.map((item: any) => {
          const { children } = item;
          return <ul className="right-key-menu-content">
            {
              children.map((menuKey: any) => {
                const { name, key, operationKeys } = menuKey;
                const isLocked = element && (!element?.editableStatus?.resizable && menuKey.isLocked);
                return <li
                  className={`right-key-menu-item ${isLocked ? 'locked' : ''}`}
                  key={key}
                  onClick={(e: any) => !isLocked && handleItemClick(menuKey)}
                >
                  <span>{name}</span>
                  <span>{operationKeys}</span>
                </li>
              })
            }
          </ul>
        })}
      </div>
    </div>
  )
}

export default RightKeyMenu;