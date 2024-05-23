import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DeleteRounded, DragIndicatorRounded } from "@mui/icons-material";
import { createOneSpan } from "Config/DataDisplayInterface";
import { TagVariantMapping } from "DataDisplayComponents/AppTag";
import { AppForm } from "DataEntryComponents/AppForm";
import { Flex, Form, Input, Tag, Tooltip, Typography, theme } from "antd";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { GraphState } from "./GraphBuilder";
import { SetupNextState } from "./SetupNextState";

export const GraphStateCard = (props: {
  index?: number;
  state: GraphState;
  onDelete?: (id: string) => void;
  onUpdate?: Dispatch<SetStateAction<GraphState[]>>;
}) => {
  const { token } = theme.useToken();
  const [form] = Form.useForm();

  const { state, onDelete = () => {}, onUpdate = () => {}, index = -1 } = props;

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
  const results = useMemo(
    () => (state.results || []).filter((result) => result),
    [state]
  );

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
      h-[350px]
      rounded-lg
      flex
      flex-col
      "
      ></div>
    );
  }

  const handleValuesChange = (_: any, values: any) => {
    onUpdate((states) => {
      const newStates = [...states];
      if (index >= 0) {
        newStates[index] = {
          ...newStates[index],
          ...values,
        };
      }
      return newStates;
    });
    form.setFieldsValue(values);
  };

  return (
    <div
      ref={setNodeRef}
      id={state.id}
      style={style}
      className="w-[350px] h-[350px] bg-white rounded-md flex flex-col relative"
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
            onValuesChange={handleValuesChange}
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

            {state.name !== "End" && (
              <Form.Item label="Next" name="results" className="mb-2 lg:mb-4">
                <SetupNextState modifyOnly={state.name === "Start"} />
              </Form.Item>
            )}
          </AppForm>

          {results.length > 0 && (
            <Flex
              vertical
              gap={8}
              align="flex-end"
              className="absolute -left-12 bottom-4"
            >
              {results.map((result, i) => (
                <Tooltip title={result.name} key={i}>
                  <Tag
                    style={{ margin: 0 }}
                    id={`${state.id}-${result.type}-${result.name}`}
                    color={
                      TagVariantMapping[
                        result.type as keyof typeof TagVariantMapping
                      ]?.color || "default"
                    }
                  >
                    {result.type}
                  </Tag>
                </Tooltip>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </div>
  );
};
