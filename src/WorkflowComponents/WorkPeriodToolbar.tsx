import { PeriodOptions } from "Config/MenuConfig";
import { DatePicker, Flex, Select, theme } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const WorkPeriodToolbar = (props: {
  period?: string;
  setPeriod?: Dispatch<SetStateAction<string | undefined>>;
}) => {
  const { token } = theme.useToken();
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
    <Flex gap="16px" align="center">
      <Flex style={{ flex: 2 }}>
        <DatePicker.RangePicker
          size="small"
          value={dateRange}
          allowEmpty={[true, true]}
          onChange={handleRangePickerChange}
          variant="borderless"
          style={{
            width: "100%",
            borderTopRightRadius: 0,
            borderBottomRightRadius: 0,
            borderTop: `1px solid ${token.colorBorder}`,
            borderLeft: `1px solid ${token.colorBorder}`,
            borderBottom: `1px solid ${token.colorBorder}`,
            backgroundColor: token.colorWhite,
          }}
        />
        <Select
          options={PeriodOptions}
          onChange={setPeriod}
          value={period}
          placeholder="Period"
          dropdownStyle={{ width: "auto" }}
          style={{
            borderTopRightRadius: token.borderRadius,
            borderBottomRightRadius: token.borderRadius,
            border: `1px solid ${token.colorBorder}`,
            backgroundColor: token.colorWhite,
          }}
          variant="borderless"
        />
      </Flex>
    </Flex>
  );
};
