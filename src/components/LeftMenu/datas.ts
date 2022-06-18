export const mockCurPageElementsData = [
  // {
  //   children: 'element',
  //   name: 'element',
  //   id: 789, type: 'div',
  //   size: {
  //     width: 100,
  //     height: 100
  //   },
  //   position: {
  //     left: 50,
  //     top: 50
  //   },
  //   editableStatus: {
  //     resizable: true,
  //   },
  // },
  //  {
  //   children: 'input',
  //   name: 'input',
  //   id: 779, type: 'input',
  //   position: {
  //     left: 50,
  //     top: 50
  //   },
  //   size: {
  //     width: 60,
  //     height: 24
  //   },
  //   editableStatus: {
  //     resizable: false,
  //   },
  // },
  // {
  //   children: 'button1',
  //   name: 'button1',
  //   id: 790, type: 'button',
  //   position: {
  //     left: 150,
  //     top: 50
  //   },
  //   size: {
  //     width: 66,
  //     height: 26
  //   },
  //   editableStatus: {
  //     resizable: true,
  //   },
  // },
  {
    name: 'Image templete',
    id: 7921,
    type: 'image',
    position: {
      left: 100,
      top: 100
    },
    size: {
      width: 50,
      height: 50
    },
  },

  // {
  //   children: 'element2',
  //   name: 'element2',
  //   id: 791, type: 'div',
  //   size: {
  //     width: 100,
  //     height: 100
  //   },
  //   position: {
  //     left: 50,
  //     top: 50
  //   },
  //   editableStatus: {
  //     resizable: false,
  //   },
  // },
  // {
  //   children: 'hide element3',
  //   name: 'hide element2',
  //   id: 792,
  //   type: 'div',
  //   size: {
  //     width: 50,
  //     height: 50
  //   },
  //   position: {
  //     left: 150,
  //     top: 150
  //   },
  //   editableStatus: {
  //     resizable: false,
  //     isHide: true
  //   },
  // }

]


export const defaultTreeData = [
  {
    title: 'parent 1',
    key: '1',
    level: 1,
    id: 111,
    children: [
      {
        title: 'parent 1-0',
        key: '10',
        level: 2,
        disabled: true,
        id: 1111,

        children: [
          {
            title: 'parent 0-0-0-0',
            key: '100',
            level: 3,
            disableCheckbox: true,
            id: 11113,

          },
          {
            title: 'parent 0-0-0-1',
            key: '101',
            level: 3,
            id: 11114,

          },
        ],
      },
      {
        title: 'parent 1-1',
        key: '11',
        level: 2,
        children: [
          {
            title: 'sss',
            // renderTitle: (title: string | number) =>  <span style={{ color: '#1890ff' }}>{title}</span>,
            key: '0-0-1-0',
            id: 11115,

          }
        ],
      },
    ],
  },
  {
    title: 'page 3',
    key: '2',
    level: 1,
    id: 123,
    children: [
      {
        title: 'string',
        key: '2-1',
        level: 2,
        id: 1231,
      }
    ]
  },
  {
    title: 'parent 2',
    key: '3',
    level: 1,
    id: 124,

  },
];