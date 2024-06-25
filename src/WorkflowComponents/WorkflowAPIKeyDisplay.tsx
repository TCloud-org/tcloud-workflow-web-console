import { AppSecretDescription } from "DataDisplayComponents/AppSecretDescription";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { Statistic } from "antd";
import { useSelector } from "react-redux";

export const WorkflowAPIKeyDisplay = () => {
  const authToken: string = useSelector((state: any) => state.auth.token);

  return (
    <Statistic
      title={<StatTitle>API Key</StatTitle>}
      valueStyle={{
        fontSize: "14px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      valueRender={() => (
        <div className="flex flex-col gap-4">
          <p>Use the API key below for your integration</p>
          <AppSecretDescription>{authToken}</AppSecretDescription>
        </div>
      )}
    />
  );
};
