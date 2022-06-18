export const elList = [
  {
    title: 'Image',
    icons: ['Shape', 'ShapeClicked'],
    id: '1223',
    elementDefaultData: {
      name: 'Image templete',
      type: 'image',
      position: {
        left: 100,
        top: 100
      },
      size: {
        width: 200,
        height: 200
      },

      // children: 'Image box'
    }

  },
  {
    title: 'Text',
    icons: ['Text', 'TextClicked'],
    id: '123',
    elementDefaultData: {
      name: 'text templete',
      type: 'text',
      position: {
        left: 100,
        top: 100
      },
      size: {
        width: 112,
        height: 28
      },
      originProps: {
        value: 'Add a text'
      }
    }
  },
  // {
  //   title: 'Paragraph',
  //   icons: ['Text', 'TextClicked'],
  //   id: '1278',
  //   elementDefaultData: {
  //     name: 'Paragraph templete',

  //     type: 'text',
  //     position: {
  //       left: 100,
  //       top: 100
  //     },
  //     size: {
  //       width: 112,
  //       height: 88
  //     },
  //     originProps: {
  //       value: 'Add a paragraph Add a paragraph Add a paragraph Add a paragraph'
  //     }
  //   }
  // },

  {
    title: 'Line',
    icons: ['Line', 'LineClicked'],
    id: '18923',
    elementDefaultData: {
      name: 'line templete',
      type: 'line',
      position: {
        left: 200,
        top: 200
      },
      size: {
        width: 112,
        height: 1
      },
      style: {
        background: '#707070'
      }
    }
  },
  {
    title: 'Shape',
    icons: ['Shape', 'ShapeClicked'],
    id: '234',
    children: [
      {
        title: 'Rectangle',
        icons: ['Rectangle', 'RectangleClicked'],
        id: '123-1',
        elementDefaultData: {
          type: 'shape',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 150,
            height: 100
          },
          // children: 'rectangle',
          originProps: {
            shape: 'rectangle',
          },
        },
      },
      {
        title: 'Triangle',
        icons: ['Triangle', 'TriangleClicked'],
        id: '123-2',
        elementDefaultData: {
          type: 'shape',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 0,
            height: 0
          },
          // children: 'Triangle',
          originProps: {
            shape: 'triangle',
          },
        },
      },

      {
        title: 'Circle',
        icons: ['Circle', 'CircleClicked'],
        id: '123-3',
        elementDefaultData: {
          type: 'shape',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 100,
            height: 100
          },
          // children: 'Circle',
          originProps: {
            shape: 'circle',
          },
        },
      },
      {
        title: 'Pentagon',
        icons: ['Pentagon', 'PentagonClicked'],
        id: '1233-4',
        elementDefaultData: {
          type: 'shape',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 54,
            height: 112
          },
          // children: 'Pentagon',
          originProps: {
            shape: 'pentagon',

          },
        },
      },
      {
        title: 'Hexagon',
        icons: ['Hexagon', 'HexagonClicked'],
        id: '1234-5',
        elementDefaultData: {
          type: 'shape',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 100,
            height: 100
          },
          // children: 'Hexagon',
          originProps: {
            shape: 'hexagon',
          },
        },
      },

      {
        title: 'Octagon',
        icons: ['Octagon', 'OctagonClicked'],
        id: '1223-6',
        elementDefaultData: {
          type: 'shape',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 112
          },
          // children: 'Octagon',
          originProps: {
            shape: 'octagon',

          },
        },
      },
      {
        title: 'Star',
        icons: ['Star', 'StarClicked'],
        id: '1233-7',
        elementDefaultData: {
          type: 'shape',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 54,
            height: 112
          },
          // children: 'Star',
          originProps: {
            shape: 'star',

          },
        },
      },
    ]
  },
  {
    title: 'Button',
    icons: ['Button', 'ButtonClicked'],
    id: '1234',
    children: [
      {
        title: 'Button',
        icons: ['Circlebutton1', 'Circlebutton1Clicked'],
        id: '123-1',
        customIcon: true,
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'default',
          },
          style: {
            borderRadius: '16px',
            border: '1px solid #999999',
          }
        },

      },

      {
        title: 'Button',
        icons: ['Circlebutton2', 'Circlebutton2Clicked'],
        id: '1234-2',
        customIcon: true,
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'primiry',
          },
          style: {
            borderRadius: '16px',
          }
        }
      },
      {
        title: 'Button',
        icons: ['Circlebutton3', 'Circlebutton3Clicked'],
        id: '123-3',
        customIcon: true,
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'default',
          },
          style: {
            borderRadius: '16px',
            border: '1px solid #999999',
          }
        },

      },

      {
        title: 'Button',
        icons: ['Circlebutton4', 'Circlebutton4Clicked'],
        id: '1234-4',
        customIcon: true,
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'primiry',
          },
          style: {
            borderRadius: '16px',
            background: '#ffffff'
          }
        }
      },
      {
        title: 'Button',
        icons: ['Squarebutton1', 'Squarebutton1Clicked'],
        id: '1223-5',
        customIcon: true,
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'default',
          },
          style: {

          }
        }
      },
      {
        title: 'Button',
        icons: ['Squarebutton2', 'Squarebutton2Clicked'],
        id: '1233-6',
        customIcon: true,
        type: 'button',
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'primiry',
          },
          style: {

          }
        }
      },
      {
        title: 'Button',
        icons: ['Squarebutton3', 'Squarebutton3Clicked'],
        id: '1223-7',
        customIcon: true,
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'default',
          },
          style: {

          }
        }
      },
      {
        title: 'Button',
        icons: ['Squarebutton4', 'Squarebutton4Clicked'],
        id: '1233-8',
        customIcon: true,
        type: 'button',
        elementDefaultData: {
          type: 'button',
          position: {
            left: 100,
            top: 100
          },
          size: {
            width: 112,
            height: 32
          },
          // children: 'button',
          originProps: {
            type: 'primiry',
          },
          style: {
            background: '#ffffff'

          }
        }
      },

    ]
  },

  {
    title: 'Menu',
    icons: ['Shape', 'ShapeClicked'],
    id: '123345',
    children: [
      {
        title: 'Top',
        icons: ['Squarebutton4', 'Squarebutton4Clicked'],
        id: '12234',
        customIcon: true,
        type: 'menu',
        elementDefaultData: {
          type: 'menu',
          name: 'top menu templete',
          position: {
            left: 0,
            top: 0
          },
          size: {
            width: 414,
            height: 48
          },
          editableStatus: {
            resizable: false
          },
          originProps: {
            menuType: 'top',
            theme: 'primiry',
            menuItems: [
              {
                type: 'item',
                title: 'item0',
                key: 124,
              },
              {
                type: 'item',
                title: 'item1',
                key: 1241,
              },
              {
                type: 'item',
                title: 'item2',
                key: 1242,
              },
            ],


          },
        }
      },
      {
        title: 'Bottom',
        icons: ['Squarebutton4', 'Squarebutton4Clicked'],
        id: '122394',
        customIcon: true,
        type: 'menu',
        elementDefaultData: {
          type: 'menu',
          name: 'bottom menu templete',
          position: {
            left: 0,
            bottom: 0
          },
          size: {
            width: 414,
            height: 48
          },
          // children: 'Menu box',
          editableStatus: {
            resizable: false
          },
          originProps: {
            menuType: 'bottom',
            theme: 'default',
            menuItems: [
              {
                type: 'item',
                title: 'item0',
                key: 124,
              },
              {
                type: 'item',
                title: 'item1',
                key: 1241,
              },
              {
                type: 'item',
                title: 'item2',
                key: 1242,
              },
            ],


          },
        }
      },
      {
        title: 'Hamburger',
        icons: ['Squarebutton4', 'Squarebutton4Clicked'],
        id: '12236',
        customIcon: true,
        type: 'menu',
        elementDefaultData: {
          type: 'menu',
          name: 'hamburger menu templete',
          position: {
            left: 0,
            top: 0
          },
          size: {
            width: 34,
            height: 34
          },
          // children: 'Menu box',
          originProps: {
            menuType: 'hamburger',
            menuItems: [
              {
                type: 'item',
                title: 'item0',
                key: 124,
              },
              {
                type: 'item',
                title: 'item1',
                key: 1241,
              },
              {
                type: 'item',
                title: 'item2',
                key: 1242,
              },
            ],


          },
        }
      },
      {
        title: 'Drawer',
        icons: ['Squarebutton4', 'Squarebutton4Clicked'],
        id: '12239',
        customIcon: true,
        type: 'menu',
        elementDefaultData: {
          type: 'menu',
          name: 'drawer menu templete',
          position: {
            left: 0,
            top: 0
          },
          size: {
            width: 34,
            height: 34
          },
          // children: 'Menu box',
          originProps: {
            menuType: 'drawer',
            menuItems: [
              {
                type: 'category',
                title: 'Category1',
                key: 124,
              },
              {
                type: 'item',
                title: 'item1',
                key: 1241,
              },
              {
                type: 'item',
                title: 'item2',
                key: 1242,
              },
            ],
          },
        }
      },
    ]

  },
  {
    title: 'Switcher',
    icons: ['Shape', 'ShapeClicked'],
    id: '123673',
    elementDefaultData: {
      type: 'switcher',
      name: 'switcher templete',
      position: {
        left: 100,
        top: 100
      },
      size: {
        width: 300,
        height: 200
      },
      nodes: [
        {
          id: 111,
          type: 'switcherItem',
          name: 'item1',
          size: {
            width: '100%',
            height: '100%'
          },
          position: {
            left: 0,
            top: 0
          },
          editableStatus: {
            resizable: false,
          },
          nodes: [
            {
              name: 'image',
              id: 779,
              type: 'image',
              position: {
                left: 0,
                top: 0
              },
              size: {
                width: 60,
                height: 32
              },
              editableStatus: {
                resizable: false
              }
            }
          ]
        },
        {
          type: 'switcherItem',
          name: 'item2',
          id: 112,
          editableStatus: {
            resizable: false,
          },
          size: {
            width: '100%',
            height: '100%'
          },
          position: {
            left: 0,
            top: 0
          },
          nodes: [{
            name: 'element',
            id: 789,
            type: 'shape',
            size: {
              width: 60,
              height: 50
            },
            position: {
              left: 0,
              top: 0
            },
            editableStatus: {
              resizable: false,
            },
            style: {
              border: '1px solid red'
            }
          }]
        },

        {
          type: 'switcherItem',
          name: 'item3',
          id: 113,
          editableStatus: {
            resizable: false,
          },
          size: {
            width: '100%',
            height: '100%'
          },
          position: {
            left: 0,
            top: 0
          },
          nodes: [{
            name: 'element test ',
            id: 7843,
            type: 'div',
            size: {
              width: 100,
              height: 100
            },
            position: {
              left: 50,
              top: 25
            },
            editableStatus: {
              resizable: false,
            },
            style: {
              border: '1px solid red'
            }
          }]
        }
      ],
      originProps: {
        switcherItems: [
          {
            title: 'item1',
            key: 111,
            nodes: [
              {
                name: 'image',
                id: '779',
                type: 'image',
                position: {
                  left: 0,
                  top: 0
                },
                size: {
                  width: 60,
                  height: 32
                },
                editableStatus: {
                  resizable: false
                }
              }
            ]
          },
          {
            title: 'item2',
            key: 112,
            nodes: [{
              // // children: 'element',
              name: 'element',
              id: '789',
              type: 'shape',
              size: {
                width: 100,
                height: 100
              },
              position: {
                left: 50,
                top: 50
              },
              editableStatus: {
                resizable: false,
              },
              style: {
                border: '1px solid red'
              }
            }]
          },

          {
            title: 'item3',
            key: 113,
            nodes: [{
              // // children: 'element-drag test',
              name: 'element test ',
              id: '7843',
              type: 'div',
              size: {
                width: 100,
                height: 100
              },
              position: {
                left: 75,
                top: 75
              },
              editableStatus: {
                resizable: false,
              },
              style: {
                border: '1px solid red'
              }
            },]
          }
        ]
      }

    }
  },
  {
    title: 'Slider',
    icons: ['Shape', 'ShapeClicked'],
    id: '123893',
    elementDefaultData: {
      type: 'slider',
      name: 'slider templete',
      position: {
        left: 100,
        top: 100
      },
      size: {
        width: 300,
        height: 200
      },
      // children: 'Slider box',
      originProps: {
        speed: 1,
        autoplay: true,
        deley: 3,
        showDots: true,
        pause: true,
        sliderItems: [
          {
            src: 'https://tse1.mm.bing.net/th/id/OET.54ce9862d2f14c8a98b3293177b68fef?w=272&h=272&c=7&rs=1&o=5&dpr=1.5&pid=1.9',
            key: 'food',
            link: '/foodid09878'
          },
          {
            src: 'https://tse1.mm.bing.net/th/id/OET.78ce7af723884ac490770562e7c3c36c?w=272&h=135&c=7&rs=1&o=5&dpr=1.5&pid=1.9',
            key: 'freezen',
            link: '/freezenid09878'
          },
          {
            src: 'https://tse1.mm.bing.net/th/id/OET.dee5892ccc10463c9dc6e49a96cc5c55?w=272&h=135&c=7&rs=1&o=5&dpr=1.5&pid=1.9',
            key: 'Merry Christmas',
            link: '/merryid09878'
          }
        ]
      }
    }
  },
  {
    title: 'Data',
    icons: ['Shape', 'ShapeClicked'],
    id: '129033',
    elementDefaultData: {
      type: 'data',
      name: 'data templete',
      position: {
        left: 100,
        top: 100
      },
      size: {
        width: 112,
        height: 28
      },
      originProps: {
        value: 'Data'
      }
    }
  },
]


