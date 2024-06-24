import { Col, DescriptionsProps, Row } from "antd";

export const AppInfo = (props: DescriptionsProps) => {
  const { items = [], title } = props;

  return (
    <div className={`flex flex-col gap-4 ${props.className}`}>
      {title && <p className="text-base font-bold">{title}</p>}

      <Row gutter={[32, 32]}>
        {items.map((item, i) => (
          <Col className="flex flex-col" key={i} {...(item.span as any)}>
            <div className="flex flex-col gap-1 h-full">
              <div className="font-semibold uppercase">{item.label}</div>

              <div className="flex">{item.children}</div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};
