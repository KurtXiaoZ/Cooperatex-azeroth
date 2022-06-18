export const mockPageData = {
  pageName: 'pageChildren1',
  id: 111,
  nodes: [
    {
      name: 'Image templete',
      id: 7921,
      type: 'image',
      position: {
        left: 100,
        top: 100
      },
      size: {
        width: 100,
        height: 100
      },
      // children: 'Image box'
    },
    // {
    //   id: 1640832505276,
    //   name: "text templete",
    //   type: "text",
    //   originProps: {
    //     value: "Add a text"
    //   },
    //   position: {
    //     left: 177.0052490234375,
    //     top: 30.028656005859375
    //   },
    //   size: {
    //     height: 28,
    //     width: 112
    //   },
    //   style: {
    //     color: "#c51f1f",
    //     fontFamily: 'normal',
    //     fontSize: 17,
    //     fontWeight: 'bold',
    //     opacity: 0.49,
    //   },
    // },
    // {
    //   // // children: 'element',
    //   name: 'element',
    //   id: '789',
    //   type: 'shape',
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
    //   style: {
    //     border: '1px solid red'
    //   }
    // },

    // {
    //   // // children: 'element-drag test',
    //   name: 'element test ',
    //   id: '7843',
    //   type: 'div',
    //   size: {
    //     width: 100,
    //     height: 100
    //   },
    //   position: {
    //     left: 75,
    //     top: 75
    //   },
    //   editableStatus: {
    //     resizable: false,
    //   },
    //   style: {
    //     border: '1px solid red'
    //   }
    // },
    // {
    //   // // // children: 'group test', 
    //   name: 'group test ',
    //   id: '78489',
    //   type: 'group',
    //   size: {
    //     width: 100,
    //     height: 100
    //   },
    //   position: {
    //     left: 75,
    //     top: 150
    //   },
    //   editableStatus: {
    //     resizable: false,
    //   },

    //   style: {
    //     border: '1px solid red'
    //   },
    //   children: [
    //     {
    //       name: 'group t1 ',
    //       id: '784893',
    //       type: 'group',
    //       size: {
    //         width: 100,
    //         height: 100
    //       },
    //       position: {
    //         left: 75,
    //         top: 75
    //       },
    //       editableStatus: {
    //         resizable: false,
    //       },
    //       style: {
    //         border: '1px solid red'
    //       },
    //       children: [
    //         {
    //           name: 'group t1-1',
    //           id: '7848928',
    //           type: 'line',
    //           size: {
    //             width: 100,
    //             height: 100
    //           },
    //           position: {
    //             left: 75,
    //             top: 75
    //           },
    //           editableStatus: {
    //             resizable: false,
    //           },
    //           style: {
    //             border: '1px solid red'
    //           },
    //         },
    //       ]
    //     },
    //     {
    //       name: 'group t2 ',
    //       id: '784892',
    //       type: 'group',
    //       size: {
    //         width: 100,
    //         height: 100
    //       },
    //       position: {
    //         left: 75,
    //         top: 75
    //       },
    //       editableStatus: {
    //         resizable: false,
    //       },
    //       style: {
    //         border: '1px solid red'
    //       },
    //       children: [
    //         {
    //           name: 'group t2-1',
    //           id: '784891',
    //           type: 'line',
    //           size: {
    //             width: 100,
    //             height: 100
    //           },
    //           position: {
    //             left: 75,
    //             top: 75
    //           },
    //           editableStatus: {
    //             resizable: false,
    //           },
    //           style: {
    //             border: '1px solid red'
    //           },
    //         },
    //         {
    //           name: 'group t2-2',
    //           id: '7848923',
    //           type: 'text',
    //           size: {
    //             width: 100,
    //             height: 100
    //           },
    //           position: {
    //             left: 75,
    //             top: 75
    //           },
    //           editableStatus: {
    //             resizable: false,
    //           },
    //           style: {
    //             border: '1px solid red'
    //           },
    //         },
    //       ]
    //     }
    //   ]

    // },

  ]
}

export const defaultSystemList = [
  {
    name: 'System1',
    total: 4,
    key: 'System1',
    finished: 2,
    id: 1,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1211,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 122111,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1231',
        id: 1231,
        hasFinished: true,
        hasShared: true,
        IRList: [
          {
            name: 'option1',
            key: 'option1',
            id: 124
          },
          {
            name: 'option2',
            key: 'option2',
            id: 1234
          },
          {
            name: 'option3',
            key: 'option3',
            id: 126
          },
        ],
        inboxStyle: 'dropbox',
        dropDownList: [
          {
            name: '5',
            key: '5',
          },
          {
            name: '10',
            key: '10',
          },
        ]
      },
      {
        name: 'Interactive rules # 678',
        id: 1241,
        hasFinished: true,
        inboxStyle: 'keyboard',
        hasShared: true,
        IRList: [
          {
            name: 'option1',
            key: 'option1',
            id: 124
          },
          {
            name: 'option2',
            key: 'option2',
            id: 1234
          },
          {
            name: 'option3',
            key: 'option3',
            id: 126
          },
        ],
      },
    ]
  },
  {
    name: 'System2',
    total: 4,
    key: 'System2',
    finished: 2,
    id: 2,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1212,
        hasFinished: true,
        hasShared: true,
        IRList: [
          {
            name: 'option1',
            key: 'option1',
            id: 124
          },
          {
            name: 'option2',
            key: 'option2',
            id: 1234
          },
          {
            name: 'option3',
            key: 'option3',
            id: 126
          },
        ],
      },
      {
        name: 'Interactive rules # 1',
        id: 1222,
        hasFinished: true,
        hasShared: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1232,
        hasFinished: true,
        inboxStyle: 'keyboard',
        hasShared: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1242,
        hasFinished: true,
        inboxStyle: 'dropbox',
        hasShared: false,
        dropDownList: [
          {
            name: '5',
            key: '5',
          },
          {
            name: '10',
            key: '10',
          },
        ]
      },
      {
        name: 'Interactive rules # 1',
        id: 1252,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1262,
        hasFinished: false,
      },
    ]
  },
  {
    name: 'System3',
    total: 4,
    key: 'System3',
    finished: 2,
    id: 3,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1213,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1223,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1233,
        hasFinished: true,
      },
      {
        name: 'Interactive rules # 1',
        id: 1243,
        hasFinished: true,
      },
    ]
  },
  {
    name: 'System4',
    total: 4,
    key: 'System4',
    finished: 2,
    id: 4,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1214,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1224,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1234,
        hasFinished: true,
      },
      {
        name: 'Interactive rules # 1',
        id: 1244,
        hasFinished: true,
      },
    ]
  },
  {
    name: 'System5',
    total: 4,
    key: 'System5',
    finished: 2,
    id: 5,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1215,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1225,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1235,
        hasFinished: true,
      },
      {
        name: 'Interactive rules # 1',
        id: 1245,
        hasFinished: true,
      },
    ]
  },
  {
    name: 'System6',
    total: 4,
    key: 'System6',
    finished: 2,
    id: 6,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1216,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1226,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1236,
        hasFinished: true,
      },
      {
        name: 'Interactive rules # 1',
        id: 1246,
        hasFinished: true,
      },
    ]
  },
  {
    name: 'System7',
    total: 4,
    key: 'System7',
    finished: 2,
    id: 7,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1217,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1227,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1237,
        hasFinished: true,
      },
      {
        name: 'Interactive rules # 1',
        id: 1247,
        hasFinished: true,
      },
    ]
  },
  {
    name: 'System8',
    total: 4,
    key: 'System8',
    finished: 2,
    id: 8,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1218,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1228,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1238,
        hasFinished: true,
      },
      {
        name: 'Interactive rules # 1',
        id: 1248,
        hasFinished: true,
      },
    ]
  },
  {
    name: 'System9',
    total: 4,
    key: 'System9',
    finished: 2,
    id: 9,
    IRList: [
      {
        name: 'Interactive rules # 1',
        id: 1219,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1229,
        hasFinished: false,
      },
      {
        name: 'Interactive rules # 1',
        id: 1239,
        hasFinished: true,
      },
      {
        name: 'Interactive rules # 1',
        id: 1249,
        hasFinished: true,
      },
    ]
  },

]