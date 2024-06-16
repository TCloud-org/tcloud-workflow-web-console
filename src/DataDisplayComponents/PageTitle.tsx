import { ReloadOutlined } from "@ant-design/icons";
import { Span } from "Config/DataDisplayInterface";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Typography } from "antd";
import { CSSProperties, ReactNode, useState } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { TitleProps } from "antd/es/typography/Title";
import { LinkRounded } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

export const scrollToId = (id: string | undefined) => {
  if (id) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export const scrollToHash = () => {
  const hash = window.location.hash.slice(1);
  if (hash) {
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }
};

export const PageTitle = (props: {
  children?: ReactNode;
  endDecorator?: ReactNode;
  startDecorator?: ReactNode;
  className?: string;
  onReload?: () => void;
  level?: TitleProps["level"];
  textStyle?: CSSProperties;
  style?: CSSProperties;
  id?: string;
}) => {
  const navigate = useNavigate();

  const { id } = props;

  const [isHovered, setIsHovered] = useState<boolean>(false);

  return (
    <AppRow
      gutter={[16, 16]}
      style={{ padding: "8px 0", ...props.style }}
      className={props.className}
      id={id}
    >
      <Col
        {...Span[2]}
        className="flex items-center gap-2 justify-center lg:justify-start"
      >
        <Typography.Title
          level={props.level || 4}
          style={{ margin: 0, ...props.textStyle }}
          className={`${id ? "cursor-pointer" : ""}`}
          onMouseEnter={() => {
            if (id) setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (id) setIsHovered(false);
          }}
          onClick={() => {
            if (id) navigate(`#${id}`);
          }}
        >
          {props.children}
        </Typography.Title>

        <LinkRounded
          style={{
            opacity: isHovered ? 1 : 0,
            width: !isHovered ? 0 : undefined,
            transition: "all 0.3s ease-in-out",
          }}
        />

        {props.startDecorator}
      </Col>
      <Col {...Span[2]} className="flex justify-center lg:justify-end">
        <AppSpace direction="horizontal" align="center">
          {props.endDecorator}
          {props.onReload && (
            <AppIconButton
              type="primary"
              onClick={props.onReload}
              tooltip="Reload"
            >
              <ReloadOutlined />
            </AppIconButton>
          )}
        </AppSpace>
      </Col>
    </AppRow>
  );
};
