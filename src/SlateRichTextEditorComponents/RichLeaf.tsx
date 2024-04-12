import { theme } from "antd";
import { RenderLeafProps } from "slate-react";

export const RichLeaf = (props: RenderLeafProps) => {
  const { token } = theme.useToken();
  let { attributes, children, leaf } = props;

  if (leaf.bold) {
    children = <strong>{children}</strong>;
  }

  if (leaf.code) {
    children = (
      <code
        style={{
          backgroundColor: token.colorFillContent,
          padding: "2px",
          borderRadius: token.borderRadiusSM,
        }}
      >
        {children}
      </code>
    );
  }

  if (leaf.italic) {
    children = <em>{children}</em>;
  }

  if (leaf.underline) {
    children = <u>{children}</u>;
  }

  return <span {...attributes}>{children}</span>;
};
