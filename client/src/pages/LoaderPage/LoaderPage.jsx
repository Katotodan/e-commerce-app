import React, { useEffect, useState } from 'react';

export const LoaderPage = () => {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleCount((prev) => (prev >= 4 ? 0 : prev + 1));
    }, 500); // change dot every 500ms

    return () => clearInterval(interval); // cleanup
  }, []);

  return (
    <div style={{textAlign: "center", fontSize:"larger", width: "100%", marginTop: "1rem"}}>
      Loading
      {[...Array(4)].map((_, i) => (
        <span key={i} style={{ visibility: i < visibleCount ? 'visible' : 'hidden' }}>
          .
        </span>
      ))}
    </div>
  );
};
