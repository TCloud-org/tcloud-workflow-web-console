export const decodeWorkId = (workId: string | undefined) => {
  if (!workId) {
    return {};
  }
  const body = workId.split("::")[1];
  const parts = body.split("/");
  const common = parts[0].split(":");
  const clientId = common[0];
  const workflowName = common[1];
  return {
    clientId: clientId,
    workflowName: workflowName,
    workflowId: `workflow::${clientId}/${workflowName}`,
  };
};

export const decodeBucketId = (bucketId: string | undefined) => {
  if (!bucketId) {
    return {};
  }

  const body = bucketId.split("::")[1];
  const parts = body.split("/");
  const common = parts[0].split(":");
  const clientId = common[0];
  const workflowName = common[1];
  return {
    clientId: clientId,
    workflowName: workflowName,
    workflowId: `workflow::${clientId}/${workflowName}`,
  };
};
