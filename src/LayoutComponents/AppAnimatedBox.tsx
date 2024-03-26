import { CSSProperties, ReactNode, forwardRef } from "react";

export const AppAnimatedBox = forwardRef<
  HTMLDivElement,
  { children?: ReactNode; style?: CSSProperties }
>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{ transition: "0.2s", overflow: "hidden", ...props.style }}
    >
      {props.children}
    </div>
  );
});
