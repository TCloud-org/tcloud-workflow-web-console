import { FormInstance } from "antd";
import { AppButton } from "../DataEntryComponents/AppButton";
import { AppSpace } from "../LayoutComponents/AppSpace";
import { AppFormSubmitButton } from "../DataEntryComponents/AppFormSubmitButton";

export const AppStepFooter = (props: {
  current?: number;
  totalSteps?: number;
  next?: () => void;
  skip?: () => void;
  prev?: () => void;
  done?: () => void;
  required?: boolean;
  form: FormInstance<any>;
}) => {
  const {
    current = 0,
    totalSteps = 1,
    next,
    prev,
    done,
    form,
    required,
    skip,
  } = props;

  return (
    <AppSpace direction="horizontal">
      {current < totalSteps - 1 && (
        <AppFormSubmitButton formInstance={form} onClick={next}>
          Next
        </AppFormSubmitButton>
      )}
      {current === totalSteps - 1 && (
        <AppFormSubmitButton formInstance={form} onClick={done}>
          Submit
        </AppFormSubmitButton>
      )}
      {current < totalSteps - 1 && !required && (
        <AppButton onClick={skip}>Skip</AppButton>
      )}
      {current > 0 && <AppButton onClick={prev}>Previous</AppButton>}
    </AppSpace>
  );
};
