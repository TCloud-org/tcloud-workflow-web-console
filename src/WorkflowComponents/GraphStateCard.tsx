import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  ArrowRightAlt,
  DeleteRounded,
  DragIndicatorRounded,
} from "@mui/icons-material";
import { createOneSpan } from "Config/DataDisplayInterface";
import { AppTag, TagVariantMapping } from "DataDisplayComponents/AppTag";
import { AppForm } from "DataEntryComponents/AppForm";
import {
  Flex,
  Form,
  Input,
  InputNumber,
  Select,
  Tooltip,
  Typography,
  theme,
} from "antd";
import {
  CSSProperties,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
} from "react";
import { GraphState, GraphStateType } from "./GraphBuilder";
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
  const branches = useMemo(
    () => (state.branches || []).filter((branch) => branch),
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
        className="bg-neutral-11 opacity-40 w-[350px] h-[350px] rounded-2xl flex flex-col"
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
      className="w-[350px] h-[350px] flex flex-col relative glass-card !p-0"
    >
      <div
        className="
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
          <Typography.Text className="text-center">
            {state.name}
          </Typography.Text>
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
            <Form.Item label="Type" name="type" className="mb-2 lg:mb-4">
              <Select
                disabled={isFixedState}
                options={[
                  { label: "State", value: "STATE" },
                  { label: "Wait", value: "WAIT" },
                ]}
              />
            </Form.Item>

            <Form.Item label="Name" name="name" className="mb-2 lg:mb-4">
              <Input disabled={isFixedState} />
            </Form.Item>

            {!isFixedState && state.type !== GraphStateType.WAIT && (
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

            {state.type === GraphStateType.WAIT && (
              <Form.Item
                label="Period"
                name="period"
                className="mb-2 lg:mb-4"
                tooltip={
                  <span>
                    The wait state will be released after the assigned period.
                    If no period is provided, the wait state will remain pending
                    until it is manually notified via the{" "}
                    <a
                      href="https://www.documentation.thecloudworlds.com/step-workflow/api-reference/api#notifyworkflow"
                      target="_blank"
                      rel="noreferrer"
                    >
                      NotifyWorkflow
                    </a>{" "}
                    API.
                  </span>
                }
              >
                <InputNumber
                  placeholder="Period in seconds"
                  className="w-full"
                />
              </Form.Item>
            )}

            {state.name !== "End" && (
              <Form.Item label="Next" name="branches" className="mb-2 lg:mb-4">
                <SetupNextState modifyOnly={state.name === "Start"} />
              </Form.Item>
            )}
          </AppForm>

          {branches.length > 0 && (
            <Flex
              vertical
              gap={8}
              align="flex-end"
              className="absolute -left-[64px] bottom-4"
            >
              {branches.map((branch, i) => (
                <Tooltip
                  title={
                    <Typography.Text style={{ color: token.colorWhite }}>
                      {branch.name}{" "}
                      <ArrowRightAlt style={{ color: token.colorWhite }} />{" "}
                      {branch.target}
                    </Typography.Text>
                  }
                  key={i}
                >
                  <AppTag
                    style={{ margin: 0 }}
                    id={`${state.id}-${branch.type}-${branch.name}`}
                    color={
                      TagVariantMapping[
                        branch.type as keyof typeof TagVariantMapping
                      ]?.color || "default"
                    }
                  >
                    {branch.type}
                  </AppTag>
                </Tooltip>
              ))}
            </Flex>
          )}
        </Flex>
      </Flex>
    </div>
  );
};
