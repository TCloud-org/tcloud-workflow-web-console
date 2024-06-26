import { EditableColumn } from "Config/LayoutConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { AppLink } from "DataEntryComponents/AppLink";
import { AppSpace } from "LayoutComponents/AppSpace";
import { EventWorkflowJob, queryJobsByWorkflowId } from "Network/JobFetch";
import { formatDate } from "Utils/DateUtils";
import { formatTitleCase } from "Utils/ObjectUtils";
import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const columns: EditableColumn[] = [
  {
    title: "Job Id",
    dataIndex: "jobId",
    render: (text: string) => (
      <AppLink href={`${window.location.pathname}/job?id=${text}`}>
        {text}
      </AppLink>
    ),
  },
  {
    title: "client",
    dataIndex: "clientId",
  },
  {
    title: "workflow id",
    dataIndex: "workflowId",
  },
  {
    title: "Status",
    dataIndex: "status",
    render: (text: string) => formatTitleCase(text),
  },
  {
    title: "Scheduled",
    dataIndex: "scheduledAt",
    render: (text: string) => formatDate(text),
  },
  {
    title: "Executed",
    dataIndex: "executedAt",
    render: (text: string) => formatDate(text),
  },
];

export const EmailNotificationJobList = () => {
  const { id } = useParams();

  const authToken = useSelector((state: any) => state.auth.token);
  const clientId = useSelector((state: any) => state.client.clientId);

  const [jobs, setJobs] = useState<EventWorkflowJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchJobs = useCallback(async () => {
    if (id && clientId) {
      setLoading(true);
      const res = await queryJobsByWorkflowId(id, clientId, authToken);
      setJobs(res.jobs);
      setLoading(false);
    }
  }, [id, clientId, authToken]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const jobComparator = (a: EventWorkflowJob, b: EventWorkflowJob) => {
    const dateA = new Date(a.scheduledAt);
    const dateB = new Date(b.scheduledAt);

    return dateB.getTime() - dateA.getTime();
  };

  return (
    <AppSpace loading={loading}>
      <AppTable
        heading="Jobs"
        rowId="jobId"
        rows={jobs.sort(jobComparator)}
        columns={columns}
      />
    </AppSpace>
  );
};
