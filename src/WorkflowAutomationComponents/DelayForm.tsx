import { AutomationContentProps, DelayOptions } from "Config/AutomationConfig";
import { AppForm } from "DataEntryComponents/AppForm";
import { Form, Select } from "antd";
import { useEffect, useState } from "react";

export const DelayForm = (props: AutomationContentProps) => {
  const { collect, id, data } = props;
  const [form] = Form.useForm();
  const [extraForms, setExtraForms] = useState<any[]>([]);

  useEffect(() => {
    if (data?.[id]?.delay) {
      if (data[id].delay.delay === "custom") {
        setExtraForms(
          DelayOptions.find((item) => item.value === data[id].delay.delay)
            ?.inputs
        );
      }
      form.setFieldsValue(data[id].delay);
    } else {
      form.setFieldValue("delay", "none");
      collect({
        ...data,
        [id]: {
          delay: form.getFieldsValue(),
        },
      });
    }
  }, [form, id, data, collect]);

  const handleValuesChange = (changes: any, values: any) => {
    if (changes.delay && changes.delay === "custom") {
      setExtraForms(
        DelayOptions.find((item) => item.value === changes.delay)?.inputs
      );
    } else {
      if (values.delay !== "custom") {
        setExtraForms([]);
      }
    }
    form.setFieldsValue(values);
    collect({
      ...data,
      [id]: {
        delay: values,
      },
    });
  };

  return (
    <AppForm form={form} layout="vertical" onValuesChange={handleValuesChange}>
      <Form.Item name="delay" label="Delay">
        <Select options={DelayOptions} />
      </Form.Item>
      {extraForms.map((input, i) => (
        <Form.Item label={input.label} name={["custom", input.value]} key={i}>
          {input.render()}
        </Form.Item>
      ))}
    </AppForm>
  );
};
