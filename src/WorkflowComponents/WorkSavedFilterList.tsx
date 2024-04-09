import { Clause } from "Config/FilterConfig";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppSurfaceTitle } from "DataDisplayComponents/AppSurfaceTitle";
import { AppSpace } from "LayoutComponents/AppSpace";
import { useSelector } from "react-redux";
import { WorkQueryCard } from "./WorkQueryCard";
import { Col, Flex } from "antd";
import { AppRow } from "LayoutComponents/AppRow";

export const WorkSavedFilterList = () => {
  const { saved }: { saved: Clause[][] } = useSelector(
    (state: any) => state.workFilter
  );

  if (saved.length === 0) return null;

  return (
    <AppSurface>
      <AppSpace>
        <AppSurfaceTitle>Saved Queries</AppSurfaceTitle>
        <Flex style={{ maxHeight: "300px", overflow: "auto" }}>
          <AppRow gutter={[8, 8]} style={{ width: "100%" }}>
            {saved.map((clauses, i) => (
              <Col key={i} span={8}>
                <WorkQueryCard clauses={clauses} index={i} />
              </Col>
            ))}
          </AppRow>
        </Flex>
      </AppSpace>
    </AppSurface>
  );
};
