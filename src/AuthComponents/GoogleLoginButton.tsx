import Icon from "@ant-design/icons/lib/components/Icon";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { AppButton } from "DataEntryComponents/AppButton";
import { GoogleSvg } from "SvgIcons/GoogleSvg";
import { ButtonProps } from "antd";

export const GoogleLoginButton = (
  props: ButtonProps & {
    onSignInSuccess?: (
      tokenResponse: Omit<
        TokenResponse,
        "error" | "error_description" | "error_uri"
      >
    ) => void;
    onSignInError?: () => void;
  }
) => {
  const login = useGoogleLogin({
    onSuccess: props.onSignInSuccess,
    onError: props.onSignInError,
  });

  return (
    <AppButton
      icon={<Icon component={GoogleSvg} />}
      {...props}
      onClick={() => login()}
    >
      Sign in with Google
    </AppButton>
  );
};
