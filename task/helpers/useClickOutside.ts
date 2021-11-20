import { MutableRefObject, useCallback, useEffect, useRef } from "react";

const useClickOutside = <ElementType extends HTMLDivElement = HTMLDivElement>({
  isActive = true,
  onClick,
}: {
  isActive?: boolean;
  onClick: () => void;
}): [ref: MutableRefObject<ElementType | null>] => {
  const componentRef = useRef<ElementType>(null);

  const preventClick = useCallback((e) => e.stopPropagation(), []);

  useEffect(() => {
    if (isActive) {
      document.addEventListener("mousedown", onClick);
      document.addEventListener("touchstart", onClick);

      return () => {
        document.removeEventListener("mousedown", onClick);
        document.removeEventListener("touchstart", onClick);
      };
    }
  }, [isActive, onClick]);

  useEffect(() => {
    if (componentRef && componentRef.current) {
      const place = componentRef.current;
      place.addEventListener("mousedown", preventClick);
      place.addEventListener("touchstart", preventClick);

      return () => {
        place.removeEventListener("mousedown", preventClick);
        place.removeEventListener("touchstart", preventClick);
      };
    }
  }, [componentRef, preventClick]);

  return [componentRef];
};

export default useClickOutside;
