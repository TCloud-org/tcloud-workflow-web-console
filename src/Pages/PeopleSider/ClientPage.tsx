import { EditableColumn } from "Config/LayoutConfig";
import { Client } from "Config/SCSConfig";
import { AppTable } from "DataDisplayComponents/AppTable";
import { PageTitle } from "DataDisplayComponents/PageTitle";
import { AppButton } from "DataEntryComponents/AppButton";
import { AppSpace } from "LayoutComponents/AppSpace";
import { getClients } from "Network/SecurityFetch";
import { formatDate } from "Utils/DateUtils";
import { Account } from "features/auth/authSlice";
import { updateClients } from "features/workflow/clientSlice";
import { Key, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const columns: EditableColumn[] = [
  {
    title: "Client ID",
    dataIndex: "clientId",
  },
  {
    title: "Internal ID",
    dataIndex: "internalId",
    hidden: true,
  },
  {
    title: "Owner/Contributor",
    dataIndex: "email",
  },
  {
    title: "Created",
    dataIndex: "createdAt",
    render: (text: string) => formatDate(text),
  },
  {
    title: "Updated",
    dataIndex: "updatedAt",
    render: (text: string) => formatDate(text),
    hidden: true,
  },
];

export const ClientPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const account: Account = useSelector((state: any) => state.auth.account);
  const clients: Client[] =
    useSelector((state: any) => state.client.clients) || [];

  const [selected, setSelected] = useState<Key[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchClients = useCallback(async () => {
    setLoading(true);

    const res = await getClients(account.email);
    dispatch(updateClients(res.clients));

    setLoading(false);
  }, [account, dispatch]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleAddClient = () => {
    navigate(`${location.pathname}/add`);
  };

  const clientComparator = (a: Client, b: Client) => {
    const aDate = new Date(a.createdAt);
    const bDate = new Date(b.createdAt);
    return bDate.getTime() - aDate.getTime();
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppButton onClick={handleAddClient}>Add a client</AppButton>
        }
      >
        Client
      </PageTitle>

      <AppTable
        loading={loading}
        rowId="clientId"
        columns={columns}
        rows={[...clients].sort(clientComparator)}
        selected={selected}
        setSelected={setSelected}
        heading="Clients"
        onReload={fetchClients}
      />
    </AppSpace>
  );
};
