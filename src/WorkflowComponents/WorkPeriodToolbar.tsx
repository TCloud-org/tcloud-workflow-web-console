import { PeriodOptions } from "Config/MenuConfig";
import { DatePicker, Flex, Select, theme } from "antd";
import dayjs from "dayjs";
import { setDateRange, setPeriod } from "features/settings/dashboardSlice";
import { useDispatch, useSelector } from "react-redux";

export const WorkPeriodToolbar = () => {
  const period = useSelector((state: any) => state.dashboard.period);
  const dateRange = useSelector((state: any) =>
    (state.dashboard.dateRange || [undefined, undefined])
      .filter((iso: any) => iso)
      .map((iso: string) => dayjs(iso))
  );
  const dispatch = useDispatch();

  const { token } = theme.useToken();

  const handleRangePickerChange = (
    _: any,
    dateString: [string, string] | string
  ) => {
    if (!dateString || !dateString[0] || !dateString[1]) {
      dispatch(setDateRange([undefined, undefined]));
    } else {
      dispatch(setDateRange([dayjs(dateString[0]), dayjs(dateString[1])]));
    }
  };

  const handlePeriodChange = (value: string) => {
    dispatch(setPeriod(value));
  };

  return (
    <Flex gap="16px" align="center">
      <Flex style={{ flex: 2 }}>
        <DatePicker.RangePicker
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
          }}
        />
        <Select
          options={PeriodOptions}
          onChange={handlePeriodChange}
          value={period}
          placeholder="Period"
          dropdownStyle={{ width: "auto" }}
          style={{
            borderTopRightRadius: token.borderRadius,
            borderBottomRightRadius: token.borderRadius,
            border: `1px solid ${token.colorBorder}`,
          }}
          variant="borderless"
        />
      </Flex>
    </Flex>
  );
};
