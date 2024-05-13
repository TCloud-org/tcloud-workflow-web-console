import { EditOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  AuthToken,
  AuthenticationTypes,
  AuthenticationTypesProps,
} from "../../Config/AuthConfig";
import { Span } from "../../Config/DataDisplayInterface";
import { AppDescriptionBorderedBox } from "../../DataDisplayComponents/AppDescriptionBorderedBox";
import { AppDescriptions } from "../../DataDisplayComponents/AppDescriptions";
import { AppSecretDescription } from "../../DataDisplayComponents/AppSecretDescription";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppIconButton } from "../../DataEntryComponents/AppIconButton";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { getTokenById } from "../../Network/AuthFetch";
import { AppTag } from "../../DataDisplayComponents/AppTag";
import { AppSurface } from "DataDisplayComponents/AppSurface";

const columns = [
  {
    label: "Token ID",
    value: "tokenId",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Client",
    value: "clientId",
  },
  {
    label: "Service",
    value: "service",
  },
  {
    label: "Type",
    value: "type",
    render: (text: string) => (
      <AppSpace direction="horizontal" size="small">
        <Typography.Text>
          {AuthenticationTypes[text as keyof AuthenticationTypesProps]?.label}
        </Typography.Text>
        {AuthenticationTypes[text as keyof AuthenticationTypesProps]?.tag && (
          <AppTag
            {...AuthenticationTypes[text as keyof AuthenticationTypesProps].tag}
          />
        )}
      </AppSpace>
    ),
  },
];

export const ViewTokenPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { tokenId } = useParams();

  const [token, setToken] = useState<AuthToken>();

  const fetchToken = useCallback(async () => {
    if (tokenId) {
      const res = await getTokenById(tokenId);
      setToken(res.token);
    }
  }, [tokenId]);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  const handleEdit = () => {
    navigate(`${location.pathname}/edit`, {
      state: {
        token,
      },
    });
  };

  return (
    <AppSpace>
      <PageTitle
        endDecorator={
          <AppIconButton onClick={handleEdit} type="primary">
            <EditOutlined />
          </AppIconButton>
        }
      >{`Token #${tokenId}`}</PageTitle>

      <AppSurface type="form">
        <AppDescriptions
          layout="vertical"
          items={[
            ...columns.map((column) => ({
              label: column?.label,
              children: (
                <AppDescriptionBorderedBox>
                  {(() => {
                    const text =
                      token?.[column.value as keyof AuthToken]?.toString() ||
                      "";
                    if (column.render) {
                      return column.render(text);
                    }
                    return (
                      <Typography.Text>
                        {token?.[column.value as keyof AuthToken]}
                      </Typography.Text>
                    );
                  })()}
                </AppDescriptionBorderedBox>
              ),
              span: Span[1],
            })),

            ...((token &&
              AuthenticationTypes[
                token.type as keyof AuthenticationTypesProps
              ].inputs.map((input, i) => ({
                label: input?.label,
                children: (
                  <AppDescriptionBorderedBox
                    bordered={
                      i !==
                      AuthenticationTypes[
                        token.type as keyof AuthenticationTypesProps
                      ].inputs.length -
                        1
                    }
                  >
                    {input.secret ? (
                      <AppSecretDescription>
                        {token[input.name as keyof AuthToken]?.toString() || ""}
                      </AppSecretDescription>
                    ) : (
                      <Typography.Text>
                        {token[input.name as keyof AuthToken]}
                      </Typography.Text>
                    )}
                  </AppDescriptionBorderedBox>
                ),
                span: Span[1],
              }))) ||
              []),
          ]}
          labelStyle={{
            fontWeight: 600,
          }}
          contentStyle={{}}
        />
      </AppSurface>
    </AppSpace>
  );
};
