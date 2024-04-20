import { CSSProperties } from "react";

export const AnimatedLogo = (props: { style?: CSSProperties }) => {
  return (
    <div id="globe-mark" style={props.style}>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-rail"></span>
      <span className="globe-cross-1"></span>
      <span className="globe-cross-2"></span>
      <span className="globe-cross-3"></span>
      <span className="globe-cross-4"></span>
    </div>
  );
};
