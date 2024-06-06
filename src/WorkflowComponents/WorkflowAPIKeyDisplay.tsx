import { AppCard } from "DataDisplayComponents/AppCard";
import { AppSecretDescription } from "DataDisplayComponents/AppSecretDescription";
import { StatTitle } from "DataDisplayComponents/StatTitle";
import { Statistic } from "antd";
import { useSelector } from "react-redux";

export const WorkflowAPIKeyDisplay = () => {
  const authToken: string = useSelector((state: any) => state.auth.token);

  return (
    <AppCard>
      <Statistic
        title={<StatTitle>API Key</StatTitle>}
        valueStyle={{
          paddingTop: "8px",
        }}
        valueRender={() => (
          <div>
            <AppSecretDescription>{authToken}</AppSecretDescription>
          </div>
        )}
      />
    </AppCard>
  );
};
