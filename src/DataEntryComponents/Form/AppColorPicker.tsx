import { cyan, generate, green, presetPalettes, red } from "@ant-design/colors";
import type { ColorPickerProps } from "antd";
import { Col, ColorPicker, Divider, Row, theme } from "antd";
type Presets = Required<ColorPickerProps>["presets"][number];

const genPresets = (presets = presetPalettes) =>
  Object.entries(presets).map<Presets>(([label, colors]) => ({
    label,
    colors,
  }));

export const AppColorPicker = (props: {
  value?: string;
  onChange?: (e: any) => void;
}) => {
  const { token } = theme.useToken();

  const { value, onChange } = props;

  const presets = genPresets({
    primary: generate(token.colorPrimary),
    red,
    green,
    cyan,
  });

  const customPanelRender: ColorPickerProps["panelRender"] = (
    _,
    { components: { Picker, Presets } }
  ) => (
    <Row justify="space-between" wrap={false}>
      <Col span={12}>
        <Presets />
      </Col>
      <Divider type="vertical" style={{ height: "auto" }} />
      <Col flex="auto">
        <Picker />
      </Col>
    </Row>
  );

  return (
    <ColorPicker
      defaultValue={token.colorPrimary}
      styles={{ popupOverlayInner: { width: 480 } }}
      presets={presets}
      panelRender={customPanelRender}
      value={value}
      onChange={onChange}
    />
  );
};
