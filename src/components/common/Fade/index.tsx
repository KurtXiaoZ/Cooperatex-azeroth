import React, { useMemo } from "react";
import { useSpring, animated } from "@react-spring/web";

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  type?: 'default' | 'fadeIn' | 'slidedIn';
  onEnter?: () => {};
  onExited?: () => {};
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(
  props,
  ref
) {
  const { in: open, type = 'default', children, onEnter, onExited, ...other } = props;

  const springProps = useMemo(() => {
    switch (type) {
      case 'fadeIn':
        return {
          from: { opacity: 0 },
          to: {
            opacity: open ? 1 : 0,
          },
          delay: 200
        }
      case 'slidedIn':
        return {
          from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
          to: { opacity: 1, transform: 'translate3d(0%,0,0)' },
          delay: 100
        }
      default:
        return {
          from: { opacity: 0, scale: 0 },
          to: {
            opacity: open ? 1 : 0,
            scale: open ? 1 : 0
          },
          delay: 100
        }
    }

  }, [type])

  const style = useSpring({
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
    ...springProps,
  });

  return (
    <animated.div ref={ref} style={{
      height: '100%',
      ...style
    }} {...other}>
      {children}
    </animated.div>
  );
});

export default Fade;
