import { Form } from "antd";
import { EditableContext } from "./AppEditableCell";

interface AppEditableRowProps {
  index: number;
}

export const AppEditableRow: React.FC<AppEditableRowProps> = ({
  index,
  ...props
}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};
