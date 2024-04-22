import Icon from "@ant-design/icons/lib/components/Icon";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { AppButton } from "DataEntryComponents/AppButton";
import { GoogleSvg } from "SvgIcons/GoogleSvg";
import { ButtonProps } from "antd";
import { Dispatch, SetStateAction } from "react";

export const GoogleLoginButton = (
  props: ButtonProps & {
    onSignInSuccess?: (
      tokenResponse: Omit<
        TokenResponse,
        "error" | "error_description" | "error_uri"
      >
    ) => void;
    onSignInError?: () => void;
    initializeLoading?: Dispatch<SetStateAction<boolean>>;
  }
) => {
  const { initializeLoading = () => {} } = props;
  const login = useGoogleLogin({
    onSuccess: props.onSignInSuccess,
    onError: props.onSignInError,
  });

  return (
    <AppButton
      icon={<Icon component={GoogleSvg} />}
      {...props}
      onClick={() => {
        initializeLoading(true);
        login();
      }}
    >
      Sign in with Google
    </AppButton>
  );
};
