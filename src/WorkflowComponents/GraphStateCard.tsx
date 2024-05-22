import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  AddRounded,
  DeleteRounded,
  DragIndicatorRounded,
} from "@mui/icons-material";
import { createOneSpan } from "Config/DataDisplayInterface";
import { TagVariantMapping } from "DataDisplayComponents/AppTag";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Input, Tag, Tooltip, Typography, theme } from "antd";
import { CSSProperties, useEffect } from "react";
import { GraphState } from "./GraphBuilder";

export const GraphStateCard = (props: {
  state: GraphState;
  onDelete?: (id: string) => void;
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const { state, onDelete = () => {} } = props;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: state.id,
    data: {
      type: "State",
      state,
      transition: {
        duration: 500,
        easing: "cubic-bezier(0.25, 1, 0.5, 1)",
      },
    },
  });

  const style: CSSProperties = {
    transition,
    transform: CSS.Transform.toString(transform),
    boxShadow: token.boxShadow,
  };

  const isFixedState = state.name === "Start" || state.name === "End";
  const isEndState = state.name === "End";

  useEffect(() => {
    form.setFieldsValue(state);
  }, [form, state]);

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
      bg-white
      opacity-40
      border-2 border-[#4312e5]
      w-[350px]
      h-[300px]
      rounded-lg
      flex
      flex-col
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      id={state.id}
      style={style}
      className="w-[350px] h-[300px] bg-white rounded-md flex flex-col"
    >
      <div
        className="
      bg-white
      text-md
      h-[60px] cursor-default
      rounded-md
      rounded-b-none
      p-3
      font-bold
      flex
      items-center
      justify-between border-b border-solid
      "
        style={{ borderBottomColor: token.colorBorder }}
      >
        <Flex flex={1}>
          <div
            style={{ cursor: "move" }}
            className="p-1 rounded-lg"
            {...attributes}
            {...listeners}
          >
            <DragIndicatorRounded />
          </div>
        </Flex>
        <Flex flex={2} justify="center">
          <Typography.Text>{state.name}</Typography.Text>
        </Flex>
        <Flex flex={1} justify="end">
          {state.removable ? (
            <div
              onClick={() => onDelete(state.id)}
              style={{ cursor: "pointer", transition: "all 0.3s" }}
              className="hover:bg-slate-400/10 p-1 rounded-lg"
            >
              <DeleteRounded />
            </div>
          ) : (
            <div />
          )}
        </Flex>
      </div>

      <Flex className="p-4 h-full">
        <Flex vertical gap={8} className="w-full justify-between flex flex-col">
          <AppForm
            form={form}
            labelCol={createOneSpan(6)}
            wrapperCol={createOneSpan(18)}
            layout="horizontal"
          >
            <Form.Item label="Name" name="name" className="mb-2 lg:mb-4">
              <Input disabled={isFixedState} />
            </Form.Item>

            {!isFixedState && (
              <>
                <Form.Item
                  label="Service"
                  name="service"
                  className="mb-2 lg:mb-4"
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Operation"
                  name="operation"
                  className="mb-2 lg:mb-4"
                >
                  <Input />
                </Form.Item>
              </>
            )}

            {!isEndState && (
              <Form.Item label="Next" name="result" className="mb-2 lg:mb-4">
                <Flex
                  align="center"
                  style={{ transition: "all 0.3s" }}
                  className="hover:bg-slate-400/10 rounded-md cursor-pointer px-2"
                  gap={8}
                >
                  <AddRounded style={{ fontSize: "inherit" }} />
                  <Typography.Text>Set up next state</Typography.Text>
                </Flex>
              </Form.Item>
            )}
          </AppForm>

          {(state.results || []).length > 0 && (
            <Flex vertical gap={8}>
              <Flex wrap="wrap" gap={16}>
                {(state.results || []).map((result, i) => (
                  <Tooltip title={result.name} key={i}>
                    <Tag
                      style={{ margin: 0 }}
                      id={`${state.id}-${result.type}-${result.name}`}
                      color={
                        TagVariantMapping[
                          result.type as keyof typeof TagVariantMapping
                        ].color
                      }
                    >
                      {result.type}
                    </Tag>
                  </Tooltip>
                ))}
              </Flex>
            </Flex>
          )}
        </Flex>
      </Flex>
    </div>
  );
};
