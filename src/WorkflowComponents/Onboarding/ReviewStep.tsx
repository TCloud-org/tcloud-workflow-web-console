import { Span, StepContentProps } from "../../Config/DataDisplayInterface";
import {
  RetryPolicyOptions,
  RetryPolicyOptionsProps,
} from "../../Config/RetryConfig";
import { AppDescriptions } from "../../DataDisplayComponents/AppDescriptions";
import { AppStepContentBox } from "../../DataDisplayComponents/AppStepContentBox";
import { CodeDisplay } from "../../DataDisplayComponents/CodeDisplay";
import { TableTitle } from "../../DataDisplayComponents/TableTitle";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppDivider } from "../../LayoutComponents/AppDivider";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { formatCamelCaseKey } from "../../Utils/ObjectUtils";

export const ReviewStep = (props: StepContentProps) => {
  const { formData, setCurrent } = props;

  const renderValue = (v: any) => {
    if (typeof v === "string") {
      return v as string;
    }
    return JSON.stringify(v, null, 2);
  };
  return (
    <AppStepContentBox title="Review">
      <AppSpace>
        {Object.entries(formData).map(([step, data], i) => (
          <AppSpace key={i}>
            <div>
              <TableTitle
                endDecorator={
                  <AppButton onClick={() => setCurrent(i)} type="link">
                    Edit
                  </AppButton>
                }
              >
                {step}
              </TableTitle>
              <AppDivider />
            </div>
            <AppDescriptions
              layout="vertical"
              items={Object.entries(data).map(([k, v]) => ({
                key: k,
                label: formatCamelCaseKey(k),
                children:
                  k === "xmlContent" ? (
                    <CodeDisplay
                      code={v as string}
                      language="xml"
                      hovered
                      showLineNumbers
                      bordered
                      copyToClipboard
                      backgroundColor="white"
                    />
                  ) : k === "policyType" ? (
                    RetryPolicyOptions[
                      v as string as keyof RetryPolicyOptionsProps
                    ].label
                  ) : (
                    renderValue(v)
                  ),
                span: Span[1],
              }))}
            />
          </AppSpace>
        ))}
      </AppSpace>
    </AppStepContentBox>
  );
};
