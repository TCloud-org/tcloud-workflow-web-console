import { ArrowRightOutlined } from "@ant-design/icons";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Input, Typography } from "antd";
import DottedMap from "dotted-map";

const map = new DottedMap({ height: 150, grid: "vertical" });

map.addPin({
  lat: 47.610378,
  lng: -122.200676,
  data: "Point 1",
});

const points = map.getPoints();
const pins = points.filter((point) => point.data);

const svgOptions = {
  backgroundColor: "#FFFFFF",
  color: "#000000",
  radius: 0.35,
};

// const svgMap = map.getSVG({
//   ...svgOptions,
//   shape: "circle",
// });

const size = {
  x: 100,
  y: 100,
};

const offset = {
  x: 25,
  y: 2,
};

export const ContactPage = () => {
  const pin = pins[0];
  const viewBox = `${pin.x - size.x / 2 + offset.x} ${
    pin.y - size.y / 2 + offset.y
  } ${size.x} ${size.y}`;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Flex
        align="center"
        justify="center"
        style={{ height: "100%", flex: 1 }}
        gap={32}
      >
        <div style={{ flex: 1 }}>
          <svg
            viewBox={viewBox}
            style={{ background: svgOptions.backgroundColor }}
          >
            {points.map((point, i) => (
              <circle
                key={i}
                cx={point.x}
                cy={point.y}
                r={svgOptions.radius}
                fill={svgOptions.color}
                style={{ opacity: pin.data === point.data ? 1 : 0.25 }}
              />
            ))}
          </svg>
        </div>
        <Flex vertical style={{ flex: 1, width: "100%" }} gap={16}>
          <Typography.Title level={3}>Contact us</Typography.Title>
          <AppForm layout="vertical" style={{ width: "100%" }}>
            <Flex align="center" gap={16}>
              <Form.Item
                style={{ flex: 1 }}
                label="First name"
                name="firstName"
              >
                <Input />
              </Form.Item>
              <Form.Item style={{ flex: 1 }} label="Last name" name="lastName">
                <Input />
              </Form.Item>
            </Flex>
            <Form.Item label="Email address" name="email">
              <Input />
            </Form.Item>
            <Form.Item label="Message" name="message">
              <Input.TextArea autoSize={{ minRows: 5, maxRows: 10 }} />
            </Form.Item>

            <Flex>
              <Form.Item style={{ flex: 1 }}>
                <AppButton
                  type="primary"
                  style={{ width: "100%" }}
                  icon={<ArrowRightOutlined />}
                >
                  Submit
                </AppButton>
              </Form.Item>
            </Flex>
          </AppForm>
        </Flex>
      </Flex>
    </div>
  );
};
