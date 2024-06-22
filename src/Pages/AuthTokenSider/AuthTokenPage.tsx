import { Key, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AuthToken,
  AuthenticationTypes,
  AuthenticationTypesProps,
} from "../../Config/AuthConfig";
import { EditableColumn } from "../../Config/LayoutConfig";
import { AppSecretText } from "../../DataDisplayComponents/AppSecretText";
import { AppTable } from "../../DataDisplayComponents/AppTable";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppButton } from "../../DataEntryComponents/AppButton";
import { AppLink } from "../../DataEntryComponents/AppLink";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getTokens } from "../../Network/AuthFetch";

const columns: EditableColumn[] = [
  {
    title: "Token ID",
    dataIndex: "tokenId",
    render: (text: string) => (
      <AppLink href={`/authentication/${text}`}>{text}</AppLink>
    ),
    width: "15%",
  },
  {
    title: "Client",
    dataIndex: "clientId",
  },
  {
    title: "Name",
    dataIndex: "name",
    editable: true,
    width: "25%",
  },
  {
    title: "Type",
    dataIndex: "type",
    render: (text: string) =>
      AuthenticationTypes[text as keyof AuthenticationTypesProps].label,
  },
];

export const AuthTokenPage = () => {
  const clientId = useSelector((state: any) => state.client.clientId);
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Key[]>([]);
  const [tokenMap, setTokenMap] = useState<{ [key: string]: AuthToken[] }>({});

  const fetchTokens = useCallback(async () => {
    const res = await getTokens(clientId);
    const tokenMap = res.tokens.reduce(
      (acc: { [key: string]: AuthToken[] }, token: AuthToken) => {
        const type = token.type as keyof AuthenticationTypesProps;
        if (!acc[type]) {
          acc[type] = [];
        }
        acc[type].push(token);
        return acc;
      },
      {}
    );
    setTokenMap(tokenMap);
  }, [clientId]);

  useEffect(() => {
    fetchTokens();
  }, [fetchTokens]);

  const onAddToken = () => {
    navigate("/authentication/add");
  };

  const getColumns = (type: string): EditableColumn[] => {
    const inputs =
      AuthenticationTypes[type as keyof AuthenticationTypesProps].inputs || [];

    return [
      ...columns,
      ...inputs.map(
        (input) =>
          ({
            title: input.label,
            dataIndex: input.name,
            width: `${60 / (1 + inputs.length)}%`,
            render: (text: string) =>
              input.secret ? <AppSecretText>{text}</AppSecretText> : text,
          } as EditableColumn)
      ),
    ];
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppButton type="primary" onClick={onAddToken}>
            Add token
          </AppButton>
        }
      >
        Authentication Token
      </PageTitle>

      {Object.entries(tokenMap).map(([type, tokens], i) => (
        <AppTable
          key={i}
          rows={tokens}
          columns={getColumns(type)}
          selected={selected}
          setSelected={setSelected}
          rowId="tokenId"
          showTitle
        />
      ))}
    </AppSpace>
  );
};
