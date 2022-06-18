import React from 'react';
import Renderer from 'components/Renderer';
import { Node } from 'interface';

function Group(node: Node) {

  const { children = [], style } = node;

  console.log('-----style', style)

  const renderDeepMap = (originlist: any[]) => {
    return originlist.map((item: any, index: number) => {
      if (item.children && Array.isArray(item.children)) {
        return (
          <div key={item.id}>
            <Renderer node={item} />
            {renderDeepMap(item.children)}
          </div>
        )
      }
      return <Renderer node={item} />
    })
  }

  return (
    <div style={style}>

      {
        renderDeepMap(children)
      }
    </div>
  );
}

export default Group;
