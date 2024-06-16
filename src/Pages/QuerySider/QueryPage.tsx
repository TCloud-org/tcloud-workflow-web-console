import { Span } from "Config/DataDisplayInterface";
import { Clause } from "Config/FilterConfig";
import { EditableColumn } from "Config/LayoutConfig";
import { WorkColumns } from "Config/TableColumnConfig";
import { WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT } from "Config/WOSEndpointConfig";
import { Work, Workflow } from "Config/WorkflowConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { PremiumMask } from "DataEntryComponents/PremiumMask";
import { AppRow } from "LayoutComponents/AppRow";
import { AppSpace } from "LayoutComponents/AppSpace";
import { queryWorks } from "Network/WorkFetch";
import { transformClausesDate } from "Utils/ObjectUtils";
import { WorkFilterBuilder } from "WorkflowComponents/WorkFilterBuilder";
import { WorkFilterDisplay } from "WorkflowComponents/WorkFilterDisplay";
import { WorkSavedFilterList } from "WorkflowComponents/WorkSavedFilterList";
import { Col, Select } from "antd";
import axios from "axios";
import { FilterQuery } from "features/filter/workFilterSlice";
import { setQueryWorkflowId } from "features/settings/stepWorkflowSlice";
import { Key, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const QueryPage = () => {
  const dispatch = useDispatch();

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);
  const queryWorkflowId = useSelector(
    (state: any) => state.stepWorkflow.queryWorkflowId
  );

  const { saved, active }: { saved: FilterQuery[]; active?: string } =
    useSelector((state: any) => state.workFilter);

  const [clauses, setClauses] = useState<Clause[]>([]);
  const [works, setWorks] = useState<Work[]>([]);
  const [columns, setColumns] = useState<EditableColumn[]>(WorkColumns);
  const [loading, setLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<Key[]>([]);
  const [isRestrictedAccess, setIsRestrictedAccess] = useState<boolean>(false);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);

  const fetchWorkflows = useCallback(async () => {
    if (clientId && authToken) {
      const res = await axios
        .get(
          `${WOS_GET_WORKFLOWS_BY_CLIENT_ID_ENDPOINT}?clientId=${clientId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        )
        .then((res) => res.data.workflows || [])
        .catch((err) => {
          console.error(err);
          return [];
        });

      setWorkflows(res);
    }
  }, [clientId, authToken]);

  const fetchQueriedWorks = useCallback(async () => {
    if (!queryWorkflowId || !clientId) {
      return;
    }
    setLoading(true);

    const res = await queryWorks(clientId, queryWorkflowId, clauses, authToken);
    if (res.response && res.response.status === 403) {
      setIsRestrictedAccess(true);
    } else {
      setWorks(res?.works || []);
      setColumns((prev: EditableColumn[]) =>
        prev.map((col) => {
          if (col.dataIndex !== "source") {
            return col;
          }
          return {
            ...col,
            customFilters: Object.keys(
              (res?.works || []).reduce(
                (res: { [key: string]: string }, work: any) => {
                  res[work.source] = work.source;
                  return res;
                },
                {}
              )
            ).map((state) => ({
              text: state,
              value: state,
            })),
          } as EditableColumn;
        })
      );
    }

    setLoading(false);
  }, [clientId, queryWorkflowId, clauses, authToken]);

  useEffect(() => {
    fetchWorkflows();
  }, [fetchWorkflows]);

  useEffect(() => {
    fetchQueriedWorks();
  }, [fetchQueriedWorks]);

  useEffect(() => {
    const query = saved.find((item) => item.key === active);
    if (query) {
      const transformedClauses = transformClausesDate(query.clauses || []);
      setClauses(transformedClauses);
    }
  }, [active, saved]);

  return (
    <AppSpace className="p-4">
      <PageTitle
        endDecorator={
          <Select
            options={workflows.map((workflow) => ({
              label: workflow.workflowName,
              value: workflow.workflowId,
            }))}
            value={queryWorkflowId}
            onChange={(value: string) => dispatch(setQueryWorkflowId(value))}
            dropdownStyle={{ width: "auto" }}
            placeholder="Select a workflow"
          />
        }
      >
        Query
      </PageTitle>

      <AppRow gutter={[16, 16]} style={{ position: "relative" }}>
        <Col {...Span[2]} className="flex flex-col">
          <WorkSavedFilterList />
        </Col>

        <Col {...Span[2]} className="flex flex-col">
          <WorkFilterDisplay data={clauses} setClauses={setClauses} />
        </Col>

        <Col {...Span[1]}>
          <WorkFilterBuilder
            clauses={clauses}
            data={works}
            setClauses={setClauses}
          />
        </Col>

        <Col {...Span[1]}>
          <AppTable
            loading={loading}
            heading="Workflows"
            onReload={fetchQueriedWorks}
            rows={works}
            columns={columns}
            selected={selected}
            setSelected={setSelected}
            rowId="workId"
            showFilter
            showDownload
            exludedColumnsFromExport={{ metadata: true }}
          />
        </Col>

        {isRestrictedAccess && <PremiumMask />}
      </AppRow>
    </AppSpace>
  );
};
