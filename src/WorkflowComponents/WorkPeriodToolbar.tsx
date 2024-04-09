import { PeriodOptions } from "Config/MenuConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppLine } from "LayoutComponents/AppLine";
import { DatePicker, Flex, Radio } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const WorkPeriodToolbar = (props: {
  period?: string;
  setPeriod?: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const start = searchParams.get("start");
  const end = searchParams.get("end");

  const { period, setPeriod = () => {} } = props;

  const [dateRange, setDateRange] = useState<
    [start: Dayjs | undefined, end: Dayjs | undefined]
  >([undefined, undefined]);

  useEffect(() => {
    if (start && end) {
      setDateRange([dayjs(start), dayjs(end)]);
    } else {
      setPeriod("TODAY");
      setDateRange([undefined, undefined]);
    }
  }, [start, end, setPeriod]);

  const handleRangePickerChange = (
    _: any,
    dateString: [string, string] | string
  ) => {
    const params = new URLSearchParams(location.search);
    params.set("start", dateString[0]);
    params.set("end", dateString[1]);
    window.location.href = `${location.pathname}?${params}`;
  };

  return (
    <AppSurface>
      <Flex gap="16px" align="center">
        <Flex style={{ flex: 2 }}>
          <Radio.Group
            buttonStyle="solid"
            size="small"
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
            style={{ width: "100%" }}
          >
            <Flex wrap="wrap">
              {PeriodOptions?.map((option, i) => (
                <Radio.Button
                  key={i}
                  value={option.value}
                  style={{ flexGrow: 1 }}
                >
                  {option.label}
                </Radio.Button>
              ))}
            </Flex>
          </Radio.Group>
        </Flex>

        <Flex style={{ flex: 1 }} align="center">
          <AppLine />

          <div style={{ padding: "0 16px" }}>OR</div>

          <AppLine />
        </Flex>

        <Flex style={{ flex: 2 }}>
          <DatePicker.RangePicker
            size="small"
            value={dateRange}
            allowEmpty={[true, true]}
            onChange={handleRangePickerChange}
            style={{ width: "100%" }}
          />
        </Flex>
      </Flex>
    </AppSurface>
  );
};
