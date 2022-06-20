// @ts-nocheck

import { useRef, useEffect } from "react";

/**
 * Hook that alerts clicks outside of the passed ref
 */
function useOutsideAlerter(ref, handleClick) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && ref.current.style.display !== 'none') {
        handleClick();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

/**
 * Component that alerts if you click outside of it
 */
function OutsideAlerter({ handleClick, ...rest }) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, handleClick);

  return <div ref={wrapperRef} {...rest} />;
}

export default OutsideAlerter;
