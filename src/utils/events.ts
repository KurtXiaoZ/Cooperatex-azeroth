import { deletePage } from 'services/past';
import { StoreContainer, StoreContext } from 'store'
import { zIndexBottom, zIndexDown, zIndexTop, zIndexUp } from './tools';

const setNewObject = (el: any) => ({
  ...el,
  id: new Date().valueOf()
})

export const store = StoreContext

export const handleCut = (element: any) => {
  const curPageData = store.state.pageData;
  const newNodes = (curPageData?.nodes || []).filter((item: any) =>
    element?.id !== item.id
  )
  store.setTempElement(setNewObject(element));
  store.setPageDate({
    ...curPageData,
    nodes: newNodes
  })
}

export const handleCopy = (element: any) => {
  store.setTempElement(setNewObject(element));
}


export const handlePaste = (element: any) => {
  if (Object.keys(store.state.tempElement).length) {
    const curPageData = store.state.pageData;
    const newNodes = (curPageData?.nodes || [])
    newNodes.push(store.state.tempElement);
    store.setTempElement({});
    store.setPageDate({
      ...curPageData,
      node: newNodes
    })
  }
}

export const handleDelete = (element: any) => {
  const curPageData = store.state.pageData;
  const newNodes = (curPageData?.nodes || []).filter((item: any) =>
    element?.id !== item.id
  )
  store.setPageDate({
    ...curPageData,
    nodes: newNodes
  })
}

export const handleShow = (element: any, isHide?: boolean) => {
  const curPageData = store.state.pageData;
  const newNodes = (curPageData?.nodes || []).map((node: any) => {
    if (element?.id === node.id) {
      return ({
        ...node,
        editableStatus: {
          ...node.editableStatus,
          isHide: !!isHide
        },
      })
    }
    return node;
  })
  store.setPageDate({
    ...curPageData,
    nodes: newNodes
  })
}

export const handleMove = (element: any, moveType: string) => {
  const curPageData = store.state.pageData;
  const length = curPageData?.nodes.length;
  let newNodes = curPageData?.nodes
  let idx = 1;
  (curPageData?.nodes || []).forEach((item: any, index: number) => {
    if (element?.id === item.id) {
      idx = index
    }
  })
  switch (moveType) {
    case 'up':
      zIndexUp(newNodes, idx, length)
      break;
    case 'down':
      zIndexDown(newNodes, idx, length)
      break;
    case 'top':
      zIndexTop(newNodes, idx, length)
      break;
    case 'bottom':
      zIndexBottom(newNodes, idx, length)
      break;
    default:
      break;
  }

  store.setPageDate({
    ...curPageData,
    nodes: newNodes
  })
}

export const handleLock = (element: any, isLock?: boolean) => {
  const curPageData = store.state.pageData;
  const newNodes = (curPageData?.nodes || []).map((node: any) => {
    if (element?.id === node.id) {
      return ({
        ...node,
        editableStatus: {
          ...node.editableStatus,
          resizable: !isLock
        },
      })
    }
    return node;
  })
  store.setPageDate({
    ...curPageData,
    nodes: newNodes
  })
}


const handlePageDelete = (page: any) => {
  const { pageId, pageList, position } = page
  const { projectId } = store.state.curProject;

  const queryDeletaPage = () => {
    deletePage({
      pageId,
      position,
      projectId,
    }).then((resData: any) => {
      if (resData && Array.isArray(resData)) {
        store.setPageList(resData)
        store.setPageDeleteModal({
          deleteModalVisible: false,
        })
      }
    })
  }

  if (Array.isArray(pageList) && pageList.length) {
    store.setPageDeleteModal({
      deleteModalVisible: true,
      page,
      queryDeletaPage
    })
  } else {
    queryDeletaPage()
  }

}


const rightMenuEvents: {
  [key: string]: any
} = {
  'cut': handleCut,
  'copy': handleCopy,
  'paste': handlePaste,
  'delete': handleDelete,
  'show': handleShow,
  'hide': (element: any) => handleShow(element, true),
  'lock': handleLock,
  'unlock': (element: any) => handleLock(element, true),
  'moveup': (element: any) => handleMove(element, 'up'),
  'movedown': (element: any) => handleMove(element, 'down'),
  'settotop': (element: any) => handleMove(element, 'top'),
  'settobottom': (element: any) => handleMove(element, 'bottom'),
  'pageDelete': handlePageDelete,
}

export default rightMenuEvents