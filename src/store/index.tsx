import React from 'react'
import { Provider, Subscribe, Container, ProviderProps, SubscribeProps } from 'unstated';
import { PageData, Node, PageList } from '../interface'
import { mockPageData } from 'pages/Home/datas'
import { updatePageData } from 'services/past';
import { debounce } from 'lodash';

declare type Optional<T = {}> = {
  [K in keyof T]?: T[K];
};

declare type PageDeleteModal = {
  deleteModalVisible: boolean,
  page?: any,
  queryDeletaPage?: any
}

declare type IRDataModal = {
  ruleDetailVisible: boolean,
  data?: any,
}

export type IStoreState = {
  pageData: PageData | any,
  pageList: PageList[],
  curElement: Node | any,
  tempElement: Node | any,
  curGroup: Node[],
  mainMenu: any,
  curProject: any,
  canvasSize: number,
  canvasBackground: string,
  pageDeleteModal: PageDeleteModal,
  curIRData: IRDataModal
};

export class StoreContainer extends Container<IStoreState> {
  public state: IStoreState = {
    pageData: mockPageData,
    pageList: [],
    curElement: {},
    tempElement: {},
    curGroup: [],
    mainMenu: new Map(),
    curProject: {
      name: 'project0',
      key: 'p-0',
      id: '0'
    },
    canvasSize: 100,
    canvasBackground: '#ffffff',
    pageDeleteModal: {
      deleteModalVisible: false
    },
    curIRData: {
      ruleDetailVisible: false,
    }
  };

  public setPageDate = (data: any, from?: string) => {
    console.log('store setPageDate:', from, data)
    this.setState({ pageData: data });
    // this.queryUpdatePageData(data).then((resData: any) => {
    //   if (resData) this.setState({ pageList: data });
    // })
  }
  public setCanvasSize = (size: number) => {
    this.setState({ canvasSize: size });
  }

  public setCanvasBackground = (backgroundCorlor: string) => {
    this.setState({ canvasBackground: backgroundCorlor });

  }
  public setPageList = (list: any) => {
    this.setState({ pageList: list });
  }

  public setCurProject = (project: any) => {
    this.setState({ curProject: project });
  }

  public setCurElement = (curElem: any) => {
    console.log('-----------store setCurElement', curElem)
    this.setState({ curElement: curElem });
  }

  public setCurGroup = (newGroup: Node[]) => {
    this.setState({ curGroup: newGroup });
  }

  public setTempElement = (elem: any) => {
    this.setState({ tempElement: elem });
  }

  public setMainMenu = (newMainMenu: any[]) => {

    this.setState({ mainMenu: newMainMenu });
  }

  public setPageDeleteModal = (modalData: PageDeleteModal) => {
    this.setState({ pageDeleteModal: modalData });
  }

  public setCurIRData = (IRData: IRDataModal) => {
    this.setState({ curIRData: IRData });
  }

  // initialize
  public initializePage = async (require: () => any) => {
    const newCurPageData = await require();
    this.setPageDate(newCurPageData)
  };

  public queryUpdatePageData = async (data: any) => debounce(await updatePageData(data), 800)
}

export type StoreProps = { store: StoreContainer }

export const StoreContext = new StoreContainer();

export const StoreProvider = (props: { value?: Optional<IStoreState>; children: React.ReactNode; }) => {
  const { value = {}, children = null } = props;
  Object.assign(StoreContext.state, value);
  return <Provider children={children} inject={[StoreContext]} />
};

export const StoreSubscribe = (props: Pick<SubscribeProps, 'children'>) => {
  return <Subscribe {...props} to={[StoreContext]} />
}

export function withStore(Component: any): any {
  return React.forwardRef((props: any, ref) => {
    return (
      <Subscribe to={[StoreContext]} >
        {(store) => <Component {...props} store={store} ref={ref} />}
      </Subscribe>
    )
  })
}