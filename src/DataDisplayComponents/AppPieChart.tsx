import { useEffect, useState } from "react";
import { Pie, PieChart, Sector } from "recharts";

export interface ChartProps {
  name?: string;
  value?: number;
  fill?: string;
}

const renderActiveShape = (props: any) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
    percent,
    value,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? "start" : "end";

  return (
    <g>
      <text
        x={cx}
        y={cy}
        dy={8}
        textAnchor="middle"
        fill={fill}
        fontWeight={600}
      >
        {`${payload.name}`}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
        stroke={fill}
        fill="none"
      />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        textAnchor={textAnchor}
        fill="#333"
      >{`${value}`}</text>
      <text
        x={ex + (cos >= 0 ? 1 : -1) * 12}
        y={ey}
        dy={18}
        textAnchor={textAnchor}
        fill="#999"
      >
        {`(${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

export const AppPieChart = (props: {
  data?: ChartProps[];
  width?: number;
  height?: number;
}) => {
  const { data = [], width = 500, height = 300 } = props;

  const [activeIndex, setActiveIndex] = useState<number>(0);

  useEffect(() => {
    setActiveIndex(
      data.findIndex((item: ChartProps) => (item.value || 0) > 0) || 0
    );
  }, [data]);

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <PieChart width={width} height={height}>
      <Pie
        activeIndex={activeIndex}
        activeShape={(shapeProps: any) =>
          renderActiveShape({
            ...shapeProps,
            ...(data?.[activeIndex] && {
              fill: data[activeIndex].fill || "#8884d8",
            }),
          })
        }
        data={data}
        cx="50%"
        cy="50%"
        innerRadius={70}
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        onMouseEnter={onPieEnter}
      />
    </PieChart>
  );
};
