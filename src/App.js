import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="placeHolder">visible div</div>
      <div className="placeHolder">
        <Observer>
          <div>also visible</div>
        </Observer>
      </div>
    </div>
  );
}

const Observer = ({ children }) => {
  const [setRef, visible] = useIntersect({ threshold: 0.5 });

  return (
    <div ref={setRef} className={`${visible ? "show" : "hidden"}`}>
      {children}
    </div>
  );
};

const useIntersect = (options) => {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, options);

    if (ref) {
      observer.observe(ref);
    }

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, visible];
};

export default App;
