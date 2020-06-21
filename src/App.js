import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div className="hidden">hidden div</div>
      <Observer>
        <div>show</div>
      </Observer>
    </div>
  );
}

const Observer = ({ children }) => {
  const [setRef, visible] = useIntersect({ threshold: 0.5 });
  console.log(visible);

  return (
    <div ref={setRef} className={`${visible ? "show" : "hidden"}`}>
      {children}
    </div>
  );
};

const useIntersect = (options) => {
  const [ref, setRef] = useState(null);
  const [visible, setVisible] = useState(false);
  console.log(ref);

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
