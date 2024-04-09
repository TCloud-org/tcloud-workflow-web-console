import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { Flex, Typography } from "antd";
import { useEffect, useRef, useState } from "react";
import { AppIconButton } from "../DataEntryComponents/AppIconButton";

export const AppSecretText = (props: {
  children?: string;
  minMaskedSize?: number;
}) => {
  const textRef = useRef<HTMLDivElement>(null);
  const maskRef = useRef<HTMLDivElement>(null);

  const { minMaskedSize = 12, children } = props;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const markedText = "•".repeat(
    Math.min(minMaskedSize, children?.length || minMaskedSize)
  );

  useEffect(() => {
    if (maskRef.current) {
      const height = maskRef.current.scrollHeight;
      maskRef.current.style.opacity = !isVisible ? "1" : "0";
      maskRef.current.style.height = !isVisible ? `${height}px` : "0";
    }
    if (textRef.current) {
      const height = textRef.current.scrollHeight;
      textRef.current.style.opacity = isVisible ? "1" : "0";
      textRef.current.style.height = isVisible ? `${height}px` : "0";
    }
  }, [maskRef, textRef, isVisible]);

  const handleVisibleClick = () => {
    setIsVisible((prev) => !prev);
  };

  return (
    <Flex justify="space-between" align="center">
      <Flex
        style={{
          flexDirection: "column",
          width: "80%",
        }}
      >
        <Typography.Text
          ref={textRef}
          style={{ transition: "0.2s", overflow: "hidden" }}
        >
          {children}
        </Typography.Text>
        <Typography.Text
          ref={maskRef}
          style={{ transition: "0.2s", overflow: "hidden" }}
        >
          {markedText}
        </Typography.Text>
      </Flex>
      <AppIconButton
        onClick={handleVisibleClick}
        type="text"
        tooltip={isVisible ? "Hide" : "Show"}
      >
        {isVisible ? <EyeInvisibleOutlined /> : <EyeOutlined />}
      </AppIconButton>
    </Flex>
  );
};
