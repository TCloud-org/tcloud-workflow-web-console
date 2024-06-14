import { CSSProperties, ReactNode, forwardRef } from "react";

export const AppSheet = forwardRef<
  HTMLDivElement,
  { style?: CSSProperties; children?: ReactNode }
>((props, ref) => {
  return (
    <div
      ref={ref}
      className="glass-bar py-6 px-4"
      style={{
        transition: "all 0.3s",
        overflow: "hidden",
        ...props.style,
      }}
    >
      {props.children}
    </div>
  );
});
