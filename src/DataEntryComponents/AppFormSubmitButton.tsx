import { ButtonProps, Form, FormInstance } from "antd";
import React from "react";
import { AppButton } from "./AppButton";

interface AppFormSubmitButtonProps extends ButtonProps {
  formInstance: FormInstance<any>;
}

export const AppFormSubmitButton = (props: AppFormSubmitButtonProps) => {
  const { formInstance, children } = props;
  const [submittable, setSubmittable] = React.useState<boolean>(false);

  const values = Form.useWatch([], formInstance);

  React.useEffect(() => {
    formInstance
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [formInstance, values]);

  return (
    <AppButton
      type="primary"
      htmlType="submit"
      disabled={!submittable}
      {...props}
    >
      {children}
    </AppButton>
  );
};
