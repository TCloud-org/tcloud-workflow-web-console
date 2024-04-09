import { Input, InputProps, SelectProps, TagProps } from "antd";
import { TextAreaProps } from "antd/es/input";
import { ReactNode } from "react";

export interface InputConfig {
  name: string;
  label: string;
  element: React.ComponentType<any>;
  props?: InputProps | SelectProps | TextAreaProps;
  required?: boolean;
  secret?: boolean;
}

export interface AuthenticationType {
  label: string | ReactNode;
  type: string;
  inputs: InputConfig[];
  disabled?: boolean;
  tag?: TagProps;
}

export interface AuthenticationTypesProps {
  NO_AUTH: AuthenticationType;
  BASIC_AUTH: AuthenticationType;
  BEARER_TOKEN: AuthenticationType;
}

export const AuthenticationTypes: AuthenticationTypesProps = {
  NO_AUTH: {
    label: "No Auth",
    type: "NO_AUTH",
    tag: {
      color: "error",
      children: "Not recommended",
    },
    inputs: [],
  },
  BASIC_AUTH: {
    label: "Basic Auth",
    type: "BASIC_AUTH",
    disabled: true,
    tag: {
      color: "default",
      children: "Temporarily disabled",
    },
    inputs: [
      {
        name: "username",
        label: "Username",
        element: Input,
        required: true,
        props: {
          placeholder: "Enter a username",
        },
      },
      {
        name: "password",
        label: "Password",
        required: true,
        secret: true,
        element: Input.Password,
        props: {
          placeholder: "Enter a password",
        },
      },
    ],
  },
  BEARER_TOKEN: {
    label: "Bearer Token",
    type: "BEARER_TOKEN",
    tag: {
      color: "success",
      children: "Recommended",
    },
    inputs: [
      {
        name: "token",
        label: "Token",
        element: Input.TextArea,
        required: true,
        secret: true,
        props: {
          rows: 5,
          placeholder: "Paste the token here",
        },
      },
    ],
  },
};

export interface AuthToken {
  tokenId: number;
  name: string;
  type: string;
  service?: string;
  clientId?: string;
  username?: string;
  password?: string;
  token?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GetTokensByClientIdResponse {
  tokens: AuthToken[];
}

export interface GetTokenByIdResponse {
  token: AuthToken;
}
