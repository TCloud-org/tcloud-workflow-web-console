import { DescriptionsProps, theme } from "antd";
import Descriptions from "antd/es/descriptions";
import { Span } from "../Config/DataDisplayInterface";

export const AppDescriptions = (
  props: DescriptionsProps & {
    gap?: number;
  }
) => {
  const { token } = theme.useToken();

  return (
    <Descriptions
      column={Span[1]}
      colon={props.layout !== "vertical"}
      {...props}
      labelStyle={{
        fontWeight: 500,
        color: token.colorText,
        ...props.labelStyle,
      }}
      contentStyle={{
        color: token.colorTextLabel,
        ...props.contentStyle,
      }}
    />
  );
};
