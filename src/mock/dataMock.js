import Mock from 'mockjs';
import { mockPageData, defaultSystemList } from 'pages/Home/datas'
import { mockCurPageElementsData, defaultTreeData } from 'components/LeftMenu/datas'


const getProjectList = Mock.mock('/mock/reach/azeroth/aui/project/0.html',
  'GET',
  Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": [
      {
        key: 'p-1',
        name: 'project1',
        id: '1'
      },
      {
        key: 'p-2',
        name: 'project2',
        id: '2'

      },
      {
        key: 'p-3',
        name: 'project3',
        id: '3'

      },
      {
        key: 'p-4',
        name: 'project4',
        id: '4'

      },
      {
        key: 'p-5',
        name: 'project5',
        id: '5'

      },
      {
        key: 'p-6',
        name: 'project6',
        id: '6'

      },
      {
        key: 'p-7',
        name: 'project7',
        id: '7'

      },
      {
        key: 'p-8',
        name: 'project8',
        id: '8'

      },
    ]
  })
)

const getPageList = Mock.mock(`/reach/azeroth/aui/pages/0.html`,
  'GET',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": defaultTreeData
  }))

const getPageDate = Mock.mock(`/reach/azeroth/aui/nodes/1233.html`,
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "data": { name: 'page test 1', id: '1233', nodes: mockCurPageElementsData }
  }))

const addPage = nodeId => Mock.mock(`/reach/azeroth/aui/node/${nodeId}.html`,
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": []
  }))

const addPages = nodeId => Mock.mock(`/reach/azeroth/aui/node/${nodeId}.html`,
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": []
  }))

const updatePageDate = Mock.mock('/reach/azeroth/aui/update/project.html',
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": []
  }))


const updateNode = pageId => Mock.mock(`/reach/azeroth/aui/nodes/${pageId}.html`,
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "data": mockPageData
  }))


const addNode = Mock.mock('/azeroth/aui/add/node.html',
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": []
  }))
const getElements = Mock.mock('/reach/azeroth/aui/elements.html',
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": []
  }))
const getSystemList = Mock.mock('/reach/azeroth/aui/system.html',
  'get',
  () => Mock.mock({
    "success": true,
    "code": 100,
    "message": "success",
    "datas": defaultSystemList
  }))

export default {
  getProjectList,
  getPageList,
  getPageDate,
  addPage,
  addPages,
  updatePageDate,
  updateNode,
  addNode,
  getElements,
  getSystemList
}