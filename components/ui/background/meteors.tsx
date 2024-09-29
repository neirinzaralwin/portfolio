import { useEffect, useState } from "react";

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  const generateMeteorStyles = () => {
    return [...new Array(number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      animationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));
  };

  useEffect(() => {
    const updateMeteorStyles = () => {
      setMeteorStyles(generateMeteorStyles());
    };

    updateMeteorStyles();

    const handleResize = debounce(() => {
      updateMeteorStyles();
    }, 300); // Adjust the debounce delay as needed

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [number]);

  return (
    <div className="meteors-container">
      {meteorStyles.map((style, index) => (
        <div key={index} className="meteor" style={style}></div>
      ))}
    </div>
  );
};
function debounce(func: () => void, wait: number) {
  let timeout: NodeJS.Timeout | null = null;
  return function (...args: any[]) {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(null);
    }, wait);
  };
}
