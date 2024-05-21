import { Span } from "Config/DataDisplayInterface";
import { AppEmpty } from "DataDisplayComponents/AppEmpty";
import { AppSurface } from "DataDisplayComponents/AppSurface";
import { AppSurfaceTitle } from "DataDisplayComponents/AppSurfaceTitle";
import { AppRow } from "LayoutComponents/AppRow";
import { Col, Flex } from "antd";
import { FilterQuery } from "features/filter/workFilterSlice";
import { useSelector } from "react-redux";
import { WorkQueryCard } from "./WorkQueryCard";

export const WorkSavedFilterList = () => {
  const { saved, active }: { saved: FilterQuery[]; active: string } =
    useSelector((state: any) => state.workFilter);

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
    <AppSurface type="form" className="h-full w-full">
      <Flex vertical gap={16}>
        <AppSurfaceTitle>Saved Queries</AppSurfaceTitle>
        <Flex
          style={{ overflow: "auto" }}
          className="max-h-72 py-4 flex flex-col"
        >
          <AppRow gutter={[8, 8]} style={{ width: "100%" }}>
            {[...saved].sort(comparator).map((query, i) => (
              <Col key={i} {...Span[1]}>
                <WorkQueryCard query={query} />
              </Col>
            ))}
            {saved.length === 0 && (
              <Col {...Span[1]}>
                <AppEmpty />
              </Col>
            )}
          </AppRow>
        </Flex>
      </Flex>
    </AppSurface>
  );
};
