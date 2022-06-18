import React, { useState } from 'react';
import cls from 'classnames';
import { Node } from 'interface';
import DrawerMenu from './DrawerMenu';
import HamburgerMenu from './HamburgerMenu';
import { withStore } from 'store'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import './index.less';

export type menuType = 'top' | 'bottom' | 'drawer' | 'hamburger';

export interface MenuProps {
  menuType?: menuType,
  theme?: 'default' | 'primiry',
  curPageId?: number,
  menuItems?: {
    title: string | any,
    key: string | number,
    type?: string
    // children?: {
    //   title: string | any,
    //   key: string | number,
    // }[]
  }[]
}

interface LinkTabProps {
  label?: string;
  href?: string;
}

function LinkTab(props: LinkTabProps) {
  return (
    <Tab
      component="a"
      onClick={(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        event.preventDefault();
      }}
      {...props}
    />
  );
}

function NavTabs({ Navs = [] }: any) {
  const [value, setValue] = React.useState(0);

  const handleChange = (newValue: any) => {
    setValue(newValue);
  };

  return (
    <Tabs value={value} onChange={handleChange} aria-label={"nav tabs example"}>
      {Navs.map((item: any) => <LinkTab label={item.name} href={item.id} />)}
    </Tabs>
  );
}


function Menu(node: Node) {
  const { style, children, originProps = {} } = node

  const { menuItems = [], menuType, theme, curPageId } = originProps || {};
  const handleChangePage = () => {

  }
  const renderMenuNav = () => (
    <div className={cls("menu-nav", theme)}>
      <NavTabs Navs={menuItems} />
    </div>
  )

  return (
    <div className="accessory-element-menu-wap">
      <div
        className="accessory-element-menu"
        style={style}
      >
        {menuType === 'top' && (
          renderMenuNav()
        )}

        {menuType === 'bottom' && (
          renderMenuNav()
        )}
        {menuType === 'drawer' && (
          <DrawerMenu menuList={menuItems} />
        )}
        {menuType === 'hamburger' && (
          <HamburgerMenu menuList={menuItems} />
        )}
      </div>
    </div>
  );
}

export default Menu;

