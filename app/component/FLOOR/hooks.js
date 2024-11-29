// hooks.js
import { useState, useEffect } from "react";

export const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLaptop, setIsLaptop] = useState(window.innerWidth > 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      setIsLaptop(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { isMobile, isLaptop };
};
