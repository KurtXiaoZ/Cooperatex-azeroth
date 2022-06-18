import { Node, DatumNearBy, DatumLines } from '../interface'
interface INT {
  x: number,
  y: number
}
interface Size {
  width: number,
  height: number
}
interface Position {
  top: number,
  left: number
}

export const getAllDatumLines = (nodes: Node[], centerLeft: number) => {
  let hor_border = [];
  let ver_border = [centerLeft];
  let hor_center = [];
  let ver_center = [centerLeft];
  let ver_simmetry = [];
  for (let i = 0; i < nodes.length; i++) {
    hor_border.push(nodes[i].position.top, nodes[i].position.top + nodes[i].size?.height);
    ver_border.push(nodes[i].position.left, nodes[i].position.left + nodes[i].size?.width);
    hor_center.push(nodes[i].position.top + nodes[i].size?.height / 2);
    ver_center.push(nodes[i].position.left + nodes[i].size?.width / 2);
    if (nodes[i].position.left > centerLeft) {
      ver_simmetry.push(nodes[i].position.left - 2 * (nodes[i].position.left - centerLeft));
    }
    if (nodes[i].position.left + nodes[i].size?.width < centerLeft) {
      ver_simmetry.push(nodes[i].position.left + nodes[i].size?.width + 2 * (centerLeft - nodes[i].position.left - nodes[i].size?.width));
    }
  }
  hor_border = Array.from(new Set(hor_border));
  ver_border = Array.from(new Set(ver_border));
  hor_center = Array.from(new Set(hor_center));
  ver_center = Array.from(new Set(ver_center));
  return {
    hor_border, ver_border, hor_center, ver_center, ver_simmetry
  };
};

/**
 * Caculate the movetement distance on node dragging.
 * @param startAt - the mouse position at the beginning
 * @param mousePos - the mouse position of current
 * @param position - the origin node position before dragging
 * @param size - the origin node size before dragging
 * @param datums - all the datumlines
 * @param mainCenterLeft - the left distance of the center line
 * @returns 
 */
 export const getDragDiff = (
  startAt: any,
  mousePos: any,
  position: any,
  size: any,
  datums: any,
  mainCenterLeft: number
) => {
  // console.log('----------datums:', datums)
  // how far the mouse moved
  let x = mousePos.x - startAt.x;
  let y = mousePos.y - startAt.y;
  // current border and center point position of the node
  let [
    top, bottom, left, right, centerTop, centerLeft
  ] = [
      position.top + y,
      position.top + y + size.height,
      position.left + x,
      position.left + x + size.width,
      position.top + y + size.height / 2,
      position.left + x + size.width / 2
    ];
  // find the closest datumline
  let datums_hor_nearby: DatumNearBy[] = [];
  let datums_ver_nearby: DatumNearBy[] = [];
  for (let i = 0; i < datums.hor_border.length; i++) {
    if (Math.abs(top - datums.hor_border[i]) < 10) {
      datums_hor_nearby.push({
        distance: datums.hor_border[i] - top,
        at: "hor",
        value: datums.hor_border[i]
      });
    }
    if (Math.abs(bottom - datums.hor_border[i]) < 10) {
      datums_hor_nearby.push({
        distance: datums.hor_border[i] - bottom,
        at: "hor",
        value: datums.hor_border[i]
      });
    }
  }
  for (let i = 0; i < datums.ver_border.length; i++) {
    if (Math.abs(left - datums.ver_border[i]) < 10) {
      datums_ver_nearby.push({
        distance: datums.ver_border[i] - left,
        at: "ver",
        value: datums.ver_border[i]
      });
    }
    if (Math.abs(right - datums.ver_border[i]) < 10) {
      datums_ver_nearby.push({
        distance: datums.ver_border[i] - right,
        at: "ver",
        value: datums.ver_border[i]
      });
    }
  }
  for (let i = 0; i < datums.hor_center.length; i++) {
    if (Math.abs(centerTop - datums.hor_center[i]) < 10) {
      datums_hor_nearby.push({
        distance: datums.hor_center[i] - centerTop,
        at: "hor",
        value: datums.hor_center[i]
      });
    }
  }
  for (let i = 0; i < datums.ver_center.length; i++) {
    if (Math.abs(centerLeft - datums.ver_center[i]) < 10) {
      datums_ver_nearby.push({
        distance: datums.ver_center[i] - centerLeft,
        at: "ver",
        value: datums.ver_center[i]
      });
    }
  }
  for (let i = 0; i < datums.ver_simmetry.length; i++) {
    if (Math.abs(left - datums.ver_simmetry[i]) < 10 && left > mainCenterLeft) {
      datums_ver_nearby.push({
        distance: datums.ver_simmetry[i] - left,
        at: "simmetry",
        value: datums.ver_simmetry[i]
      });
    }
    if (Math.abs(right - datums.ver_simmetry[i]) < 10 && right < mainCenterLeft) {
      datums_ver_nearby.push({
        distance: datums.ver_simmetry[i] - right,
        at: "simmetry",
        value: datums.ver_simmetry[i]
      });
    }
  }
  if (!datums_hor_nearby.length && !datums_ver_nearby.length) {
    return { x, y, horDatum: undefined, verDatum: undefined };
  } else {
    datums_hor_nearby.sort((a, b) => {
      if (a?.distance && b?.distance) {
        return (Math.abs(a.distance) - Math.abs(b.distance))
      }
      return a?.distance as number
    });
    datums_ver_nearby.sort((a, b) =>{
      if (a?.distance && b?.distance) {
        return (Math.abs(a.distance) - Math.abs(b.distance))
      }
      return a?.distance as number
    });
    const horDatum = datums_hor_nearby[0];
    const verDatum = datums_ver_nearby[0];
    if (horDatum?.distance) {
      y += horDatum.distance;
    }
    if (verDatum?.distance) {
      x += verDatum.distance;
    }
    return { x, y, horDatum, verDatum };
  }
};

export const moved = (position: any, diff: any) => {
  return {
    top: position.top + diff.y,
    left: position.left + diff.x
  }
};


const resizeOnTop = (startAt: INT, mousePos: INT, position: Position, datums: DatumLines) => {
  let datums_hor_nearby = [];
  for (let i = 0; i < datums.hor_border.length; i++) {
    if (Math.abs(datums.hor_border[i] - (position.top - startAt.y + mousePos.y)) < 10) {
      datums_hor_nearby.push({
        distance: datums.hor_border[i] - (position.top - startAt.y + mousePos.y),
        at: "hor",
        value: datums.hor_border[i]
      });
    }
  }
  for (let i = 0; i < datums.hor_center.length; i++) {
    if (Math.abs(datums.hor_center[i] - (position.top - startAt.y + mousePos.y)) < 10) {
      datums_hor_nearby.push({
        distance: datums.hor_center[i] - (position.top - startAt.y + mousePos.y),
        at: "hor",
        value: datums.hor_center[i]
      });
    }
  }
  datums_hor_nearby.sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance));
  const horDatum = datums_hor_nearby[0];
  let y = startAt.y - mousePos.y;
  if (horDatum) {
    y -= horDatum.distance;
  }
  return { y, horDatum };
};
const resizeOnBottom = (startAt: INT, mousePos: INT, position: Position, size: Size, datums: DatumLines) => {
  let datums_hor_nearby = [];
  for (let i = 0; i < datums.hor_border.length; i++) {
    if (Math.abs(datums.hor_border[i] - (position.top + size.height - startAt.y + mousePos.y)) < 10) {
      datums_hor_nearby.push({
        distance: datums.hor_border[i] - (position.top + size.height - startAt.y + mousePos.y),
        at: "hor",
        value: datums.hor_border[i]
      });
    }
  }
  for (let i = 0; i < datums.hor_center.length; i++) {
    if (Math.abs(datums.hor_center[i] - (position.top + size.height - startAt.y + mousePos.y)) < 10) {
      datums_hor_nearby.push({
        distance: datums.hor_center[i] - (position.top + size.height - startAt.y + mousePos.y),
        at: "hor",
        value: datums.hor_center[i]
      });
    }
  }
  datums_hor_nearby.sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance));
  const horDatum = datums_hor_nearby[0];
  let y = mousePos.y - startAt.y;
  if (horDatum) {
    y += horDatum.distance;
  }
  return { y, horDatum };
};
const resizeOnLeft = (startAt: INT, mousePos: INT, position: Position, datums: DatumLines, centerLeft: number) => {
  let datums_ver_nearby = [];
  for (let i = 0; i < datums.ver_border.length; i++) {
    if (Math.abs(datums.ver_border[i] - (position.left - startAt.x + mousePos.x)) < 10) {
      datums_ver_nearby.push({
        distance: datums.ver_border[i] - (position.left - startAt.x + mousePos.x),
        at: "ver",
        value: datums.ver_border[i]
      });
    }
  }
  for (let i = 0; i < datums.ver_center.length; i++) {
    if (Math.abs(datums.ver_center[i] - (position.left - startAt.x + mousePos.x)) < 10) {
      datums_ver_nearby.push({
        distance: datums.ver_center[i] - (position.left - startAt.x + mousePos.x),
        at: "ver",
        value: datums.ver_center[i]
      });
    }
  }
  for (let i = 0; i < datums.ver_simmetry.length; i++) {
    if (
      position.left - startAt.x + mousePos.x > centerLeft &&
      Math.abs(datums.ver_simmetry[i] - (position.left - startAt.x + mousePos.x)) < 10
    ) {
      datums_ver_nearby.push({
        distance: datums.ver_simmetry[i] - (position.left - startAt.x + mousePos.x),
        at: "simmetry",
        value: datums.ver_simmetry[i]
      });
    }
  }
  datums_ver_nearby.sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance));
  const verDatum = datums_ver_nearby[0];
  let x = startAt.x - mousePos.x;
  if (verDatum) {
    x -= verDatum.distance;
  }
  return { x, verDatum };
};
const resizeOnRight = (startAt: INT, mousePos: INT, position: Position, size: Size, datums: DatumLines, centerLeft: number) => {
  let datums_ver_nearby = [];
  for (let i = 0; i < datums.ver_border.length; i++) {
    if (Math.abs(datums.ver_border[i] - (position.left + size.width - startAt.x + mousePos.x)) < 10) {
      datums_ver_nearby.push({
        distance: datums.ver_border[i] - (position.left + size.width - startAt.x + mousePos.x),
        at: "ver",
        value: datums.ver_border[i]
      });
    }
  }
  for (let i = 0; i < datums.ver_center.length; i++) {
    if (Math.abs(datums.ver_center[i] - (position.left + size.width - startAt.x + mousePos.x)) < 10) {
      datums_ver_nearby.push({
        distance: datums.ver_center[i] - (position.left + size.width - startAt.x + mousePos.x),
        at: "ver",
        value: datums.ver_center[i]
      });
    }
  }
  for (let i = 0; i < datums.ver_simmetry.length; i++) {
    if (
      position.left + size.width - startAt.x + mousePos.x < centerLeft &&
      Math.abs(datums.ver_simmetry[i] - (position.left + size.width - startAt.x + mousePos.x)) < 10
    ) {
      datums_ver_nearby.push({
        distance: datums.ver_simmetry[i] - (position.left + size.width - startAt.x + mousePos.x),
        at: "simmetry",
        value: datums.ver_simmetry[i]
      });
    }
  }
  datums_ver_nearby.sort((a, b) => Math.abs(a.distance) - Math.abs(b.distance));
  const verDatum = datums_ver_nearby[0];
  let x = mousePos.x - startAt.x;
  if (verDatum) {
    x += verDatum.distance;
  }
  return { x, verDatum };
};

export const getResizeDiff = (
  direction: string,
  startAt: INT,
  mousePos: INT,
  position: Position,
  size: Size,
  datums: DatumLines,
  centerLeft: number
) => {
  let [x, y] = [0, 0];
  let horDatum: DatumNearBy | undefined = undefined;
  let verDatum: DatumNearBy | undefined = undefined;
  let val1, val2;
  switch (direction) {
    case "top":
      val1 = resizeOnTop(startAt, mousePos, position, datums);
      y = val1.y;
      horDatum = val1.horDatum;
      break;
    case "topright":
      val1 = resizeOnTop(startAt, mousePos, position, datums);
      y = val1.y;
      horDatum = val1.horDatum;
      val2 = resizeOnRight(startAt, mousePos, position, size, datums, centerLeft);
      x = val2.x;
      verDatum = val2.verDatum;
      break;
    case "right":
      val1 = resizeOnRight(startAt, mousePos, position, size, datums, centerLeft);
      x = val1.x;
      verDatum = val1.verDatum;
      break;
    case "bottomright":
      val1 = resizeOnRight(startAt, mousePos, position, size, datums, centerLeft);
      x = val1.x;
      verDatum = val1.verDatum;
      val2 = resizeOnBottom(startAt, mousePos, position, size, datums);
      y = val2.y;
      horDatum = val2.horDatum;
      break;
    case "bottom":
      val1 = resizeOnBottom(startAt, mousePos, position, size, datums);
      y = val1.y;
      horDatum = val1.horDatum;
      break;
    case "bottomleft":
      val1 = resizeOnLeft(startAt, mousePos, position, datums, centerLeft);
      x = val1.x;
      verDatum = val1.verDatum;
      val2 = resizeOnBottom(startAt, mousePos, position, size, datums);
      y = val2.y;
      horDatum = val2.horDatum;
      break;
    case "left":
      val1 = resizeOnLeft(startAt, mousePos, position, datums, centerLeft);
      x = val1.x;
      verDatum = val1.verDatum;
      break;
    case "topleft":
      val1 = resizeOnLeft(startAt, mousePos, position, datums, centerLeft);
      x = val1.x;
      verDatum = val1.verDatum;
      val2 = resizeOnTop(startAt, mousePos, position, datums);
      y = val2.y;
      horDatum = val2.horDatum;
      break;
    default:
      break;
  }
  return { x, y, horDatum, verDatum };
};

export const resized = (direction: string, position: Position, size: Size, diff: INT) => {
  let [left, top, width, height] = [position.left, position.top, size.width, size.height];
  let [isTopLimited, isBottomLimited, isLeftLimited, isRightLimited] = [0, 0, 0, 0];
  // Min width and min height limit is 20px.
  switch (direction) {
    case "top":
      if (diff.y < 20 - height) {
        top -= (20 - height);
        height = 20;
        isTopLimited = top;
      } else {
        top -= diff.y;
        height += diff.y;
      }
      break;
    case "topright":
      if (diff.y < 20 - height) {
        if (diff.x < 20 - width) {
          top -= (20 - height);
          width = 20;
          height = 20;
          isRightLimited = left + 20;
        } else {
          top -= (20 - height);
          width += diff.x;
          height = 20;
        }
        isTopLimited = top;
      } else {
        if (diff.x < 20 - width) {
          top -= diff.y;
          width = 20;
          height += diff.y;
          isRightLimited = left + 20;
        } else {
          top -= diff.y;
          width += diff.x;
          height += diff.y;
        }
      }
      break;
    case "right":
      if (diff.x < 20 - width) {
        width = 20;
        isRightLimited = left + 20;
      } else {
        width += diff.x;
      }
      break;
    case "bottomright":
      if (diff.y < 20 - height) {
        if (diff.x < 20 - width) {
          width = 20;
          height = 20;
          isRightLimited = left + 20;
        } else {
          width += diff.x;
          height = 20;
        }
        isBottomLimited = top + 20;
      } else {
        if (diff.x < 20 - width) {
          width = 20;
          height += diff.y;
          isRightLimited = left + 20;
        } else {
          width += diff.x;
          height += diff.y;
        }
      }
      break;
    case "bottom":
      if (diff.y < 20 - height) {
        height = 20;
        isBottomLimited = top + 20;
      } else {
        height += diff.y;
      }
      break;
    case "bottomleft":
      if (diff.y < 20 - height) {
        if (diff.x < 20 - width) {
          left -= (20 - width);
          width = 20;
          height = 20;
          isLeftLimited = left;
        } else {
          left -= diff.x;
          width += diff.x;
          height = 20;
        }
        isBottomLimited = top + 20;
      } else {
        if (diff.x < 20 - width) {
          left -= (20 - width);
          width = 20;
          height += diff.y;
          isLeftLimited = left;
        } else {
          left -= diff.x;
          width += diff.x;
          height += diff.y;
        }
      }
      break;
    case "left":
      if (diff.x < 20 - width) {
        left -= (20 - width);
        width = 20;
        isLeftLimited = left;
      } else {
        left -= diff.x;
        width += diff.x;
      }
      break;
    case "topleft":
      if (diff.y < 20 - height) {
        if (diff.x < 20 - width) {
          top -= (20 - height);
          left -= (20 - width);
          width = 20;
          height = 20;
          isLeftLimited = left;
        } else {
          top -= (20 - height);
          left -= diff.x;
          width += diff.x;
          height = 20;
        }
        isTopLimited = top;
      } else {
        if (diff.x < 20 - width) {
          top -= diff.y;
          left -= (20 - width);
          width = 20;
          height += diff.y;
          isLeftLimited = left;
        } else {
          top -= diff.y;
          left -= diff.x;
          width += diff.x;
          height += diff.y;
        }
      }
      break;
    default:
      break;
  }

  return {
    position: {
      top, left
    },
    size: {
      width, height
    },
    isTopLimited, isBottomLimited, isLeftLimited, isRightLimited
  }
};

export const modifyDatumsBasedOnSizeLimit = (
  isTopLimited: number,
  isBottomLimited: number,
  isLeftLimited: number,
  isRightLimited: number,
  datums: DatumLines,
  centerLeft: number
) => {
  let horDatum = undefined;
  let verDatum = undefined;
  if (isTopLimited > 0) {
    let val1 = datums.hor_border.filter(i => i === isTopLimited)[0];
    let val2 = datums.hor_center.filter(i => i === isTopLimited)[0];
    if (val1 || val2) {
      horDatum = {
        distance: 0,
        at: "hor",
        value: val1 || val2
      };
    }
  }
  if (isBottomLimited > 0) {
    let val1 = datums.hor_border.filter(i => i === isBottomLimited)[0];
    let val2 = datums.hor_center.filter(i => i === isBottomLimited)[0];
    if (val1 || val2) {
      horDatum = {
        distance: 0,
        at: "hor",
        value: val1 || val2
      };
    }
  }
  if (isLeftLimited > 0) {
    let val0 = isLeftLimited > centerLeft ? datums.ver_simmetry.filter(i => i === isLeftLimited)[0] : undefined;
    if (val0) {
      verDatum = {
        distance: 0,
        at: "simmetry",
        value: val0
      };
    } else {
      let val1 = datums.ver_border.filter(i => i === isLeftLimited)[0];
      let val2 = datums.ver_center.filter(i => i === isLeftLimited)[0];
      if (val1 || val2) {
        verDatum = {
          distance: 0,
          at: "ver",
          value: val1 || val2
        };
      }
    }
  }
  if (isRightLimited > 0) {
    let val0 = isRightLimited < centerLeft ? datums.ver_simmetry.filter(i => i === isRightLimited)[0] : undefined;
    if (val0) {
      verDatum = {
        distance: 0,
        at: "simmetry",
        value: val0
      };
    } else {
      let val1 = datums.ver_border.filter(i => i === isRightLimited)[0];
      let val2 = datums.ver_center.filter(i => i === isRightLimited)[0];
      if (val1 || val2) {
        verDatum = {
          distance: 0,
          at: "ver",
          value: val1 || val2
        };
      }
    }
  }
  return { horDatum, verDatum };
};
