import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppSurfaceTitle } from "DataDisplayComponents/AppSurfaceTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { Col, Flex } from "antd";
import { FilterQuery } from "features/filter/workFilterSlice";
import { useSelector } from "react-redux";
import { WorkQueryCard } from "./WorkQueryCard";

export const WorkSavedFilterList = () => {
  const { saved, active }: { saved: FilterQuery[]; active: string } =
    useSelector((state: any) => state.workFilter);

  if (saved.length === 0) return null;

  const comparator = (a: FilterQuery, b: FilterQuery) => {
    if (a.key === active) {
      return -1;
    }
    if (b.key === active) {
      return 1;
    }
    return 0;
  };

  return (
    <AppSurface>
      <AppSpace>
        <AppSurfaceTitle>Saved Queries</AppSurfaceTitle>
        <Flex style={{ maxHeight: "300px", overflow: "auto" }}>
          <AppRow gutter={[8, 8]} style={{ width: "100%" }}>
            {[...saved].sort(comparator).map((query, i) => (
              <Col key={i} span={8}>
                <WorkQueryCard query={query} />
              </Col>
            ))}
          </AppRow>
        </Flex>
      </AppSpace>
    </AppSurface>
  );
};
