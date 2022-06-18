import { CSSProperties } from "react";
import { buttonType, ButtonProps } from './components/accessories/Button';
import { IrSelectProps } from './components/accessories/IrSelect';
import { ShapeProps } from './components/accessories/Shape';
import { TextProps } from './components/accessories/Text';
import { DataProps } from './components/accessories/Data';
import { SliderProps } from './components/accessories/Slider';
import { SwitcherProps } from './components/accessories/Switcher';
import { ImageProps } from './components/accessories/Image';


import { menuType, MenuProps } from './components/accessories/Menu';
import { SelectProps } from "components/accessories/Select";

export interface PageData {
  name: string;
  id: number;
  nodes: Node[]
}

export interface PageList {
  pageName: string;
  pageId: number;
  children?: PageList[];
  position?: number | string
}

export interface Project {
  name: string;
  id: number;
  createTime: string;
  PageList: PageList[];
  releaseStatus: string;  // release status
}

export interface OriginProps extends ButtonProps, ShapeProps, TextProps, IrSelectProps, DataProps, SliderProps, SwitcherProps, MenuProps, ImageProps, SelectProps {
  text?: string,
  placeholder?: any
  innerText?: string,  // for text, reach-data
  defaultValue?: string,
  url?: string, // for image
  dataSource?: {  // for reach-data
    type: string,
    timer: string
  },
  // type?: menuType | buttonType,
  // more ……
}
export interface EditableStatus {
  // editable?: string[],
  // editable?: string[],
  // removable?: boolean,
  editable: string[],
  fixed?: boolean,
  resizable?: boolean,
  isHide?: boolean
}

// Edit status propstype
export interface Node {
  name: any, // name of node
  children?: Node[], // children of node, as the text of a input element
  nodes?: any,
  type: string, // type means the category of the node, which decide the default parameters, styles and interaction of a node
  id: string,  // unique id 
  classList?: string[],
  style?: CSSProperties, // style of the node itself
  substyle?: any,  // style of the node on hover, on disable, or styles of the nodes that relative to it 
  size: {
    width: number,
    height: number
  },
  position: {
    left: number,
    top: number
  },
  originProps?: OriginProps, // origin props of a element or a IR group
  editableStatus?: EditableStatus; // editable status on the canvas of a element
  // originProps?: OriginProps, // origin props of a element or a IR group
  // editableStatus?: {
  //   editable?: string[],
  //   removable?: boolean,
  //   fixed?: boolean,
  //   resizable?: boolean,
  // }, // editable status on the canvas of a element
  clickEvent?: {  // for button
    type: 'link' | 'submit' | 'modal' | 'drawer', // or others
    payload: any
  },
  events?: [
    {
      type: 'link',
    }
  ]
  groupId?: string,  // for nodes inside an IR group
  groupTyle?: string,
  groupRole?: string
}

export interface DatumLines {
  hor_border: number[],
  ver_border: number[],
  hor_center: number[],
  ver_center: number[],
  ver_simmetry: number[]
}

export interface DatumNearBy {
  distance?: number,
  at?: string,
  value: number
}