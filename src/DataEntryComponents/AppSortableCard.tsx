import { DoubleLeftOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { UniqueIdentifier } from "@dnd-kit/core";
import { defaultAnimateLayoutChanges, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { AutomationStep, borderColor } from "Config/AutomationConfig";
import { Card, Drawer, Flex, Input, Typography } from "antd";
import {
  CSSProperties,
  ChangeEvent,
  Dispatch,
  PointerEvent,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { InputRef } from "./AppEditableCell";
import { AppIconButton } from "./AppIconButton";

export const pointerHoldingDurationThreshold = 200;

export const animateLayoutChanges = (args: any) => {
  const { isSorting, wasSorting, wasDragging } = args;

  if (isSorting || wasSorting || wasDragging) {
    return defaultAnimateLayoutChanges(args);
  }

  return true;
};

export const AppSortableCard = (props: {
  id: UniqueIdentifier;
  children?: ReactNode;
  content?: ReactNode;
  label?: string;
  setStep?: Dispatch<SetStateAction<AutomationStep>>;
}) => {
  const { setStep = () => {} } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: props.id,
      animateLayoutChanges,
    });
  const style: CSSProperties = {
    transition,
    transform: CSS.Translate.toString(transform),
    width: 400,
    cursor: "pointer",
    zIndex: 1,
    position: "relative",
  };
  const borderStyle: CSSProperties = {
    borderColor: borderColor,
  };
  const inputRef = useRef<InputRef>(null);

  const [pointerTime, setPointerTime] = useState<Date>(new Date());
  const [open, setOpen] = useState(false);
  const [titleEditing, setTitleEditing] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(props.label || "");
  const [drawerExpanded, setDrawerExpanded] = useState<boolean>(true);

  useEffect(() => {
    setTitle(props.label || "");
  }, [props.label]);

  useEffect(() => {
    if (titleEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [titleEditing]);

  const onClose = () => {
    setOpen(false);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    setPointerTime(new Date());
    if (listeners) {
      listeners.onPointerDown(event);
    }
  };

  const handlePointerUp = (_: PointerEvent<HTMLDivElement>) => {
    const pointerHoldingDuration = new Date().getTime() - pointerTime.getTime();
    if (pointerHoldingDuration <= pointerHoldingDurationThreshold) {
      setOpen(true);
    }
  };

  const handleDrawerTitleClick = () => {
    setTitleEditing(true);
  };

  const handleTitleEditEnter = () => {
    setTitleEditing((prev) => !prev);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    setStep((prev) => ({ ...prev, label: e.target.value }));
  };

  const renderDrawerTitle = () => {
    return (
      <Flex align="center" gap="16px">
        <AppIconButton
          type="text"
          onClick={() => setDrawerExpanded((prev) => !prev)}
        >
          {drawerExpanded ? <DoubleRightOutlined /> : <DoubleLeftOutlined />}
        </AppIconButton>
        {titleEditing ? (
          <Input
            value={title}
            onChange={handleTitleChange}
            ref={inputRef}
            onPressEnter={handleTitleEditEnter}
            onBlur={handleTitleEditEnter}
            style={{
              margin: 0,
              padding: "4px 11px",
              fontSize: "14px",
              fontWeight: "normal",
              width: "100%",
            }}
          />
        ) : (
          <Typography.Title
            level={5}
            style={{ margin: 0, width: "100%" }}
            className="editable"
            onClick={handleDrawerTitleClick}
          >
            {title}
          </Typography.Title>
        )}
      </Flex>
    );
  };

  return (
    <>
      <Card
        ref={setNodeRef}
        bordered={false}
        style={{ ...style, ...(open && borderStyle) }}
        {...listeners}
        {...attributes}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="glass-card"
      >
        {props.children}
      </Card>

      <Drawer
        title={renderDrawerTitle()}
        placement="right"
        onClose={onClose}
        width={drawerExpanded ? "90vw" : "50vw"}
        open={open}
        style={{ transition: "0.2s" }}
      >
        {props.content}
      </Drawer>
    </>
  );
};
