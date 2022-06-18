import React, { useState, useRef, DragEvent, useEffect } from 'react';
import cls from 'classnames';
import { toPercent, toPoint } from 'utils/tools'
import './index.less'

function Slider({ value, className, defaultValue = 0, disabled = false, onChange }: any) {

  const [track, setTrack] = useState({
    left: `${defaultValue * 100}%`,
    width: `${defaultValue * 100}%`,
  })

  const railRef = useRef<HTMLInputElement>(null)
  const handleRef = useRef<HTMLInputElement>(null)
  const lockRef = useRef<boolean>(false)

  useEffect(() => {
    setTrack({
      left: value,
      width: value,
    })
  }, [value])

  const handleSliderTrack = (e: any, triggleType?: 'click') => {
    if (!railRef.current) return;
    const railRefVal = railRef.current.getBoundingClientRect()
    if (e.clientX <= railRefVal.left) return;
    let diff = (e.clientX - railRefVal.left) / railRefVal.width
    if (diff < 0) {
      diff = 0;
    }
    if (diff > 1) {
      diff = 1
    }

    const diffPercent = toPercent(diff)

    setTrack({
      left: diffPercent,
      width: diffPercent,
    })

    if (triggleType === "click") {
      onChange && onChange(toPoint(diffPercent))
    }
  }

  const handleSliderMouseDown = (e: DragEvent<HTMLDivElement>) => {
    // e.preventDefault();
    const img = new Image();
    e.dataTransfer.setDragImage(img, 0, 0);
    lockRef.current = true;
  }

  const handleSliderMouseMove = (e: DragEvent<HTMLDivElement>) => {
    if (!lockRef.current) return;
    handleSliderTrack(e)
    e.preventDefault();
  }
  const handleSliderMouseUp = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    lockRef.current = false
    onChange && onChange(toPoint(track.left))
  }

  const handleRailClick = (e: any) => {
    handleSliderTrack(e, 'click')
  }

  return (
    <div className={cls("a-slider", className)}>
      <div className="a-slider-rail"
        ref={railRef}
        onClick={handleRailClick}
      ></div>
      <div
        className="a-slider-handle"
        style={{
          left: track.left,
          cursor: 'pointer'
        }}
        onDragStart={handleSliderMouseDown}
        onDrag={handleSliderMouseMove}
        onDragEnd={handleSliderMouseUp}
        draggable={true}
        ref={handleRef}
      ></div>
    </div>
  );
}

export default Slider;
