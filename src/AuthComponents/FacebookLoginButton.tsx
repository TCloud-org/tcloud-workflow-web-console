import FacebookLogin from "@greatsumini/react-facebook-login";

export const FacebookLoginButton = () => {
  return (
    <FacebookLogin
      appId={process.env.REACT_APP_FACEBOOK_LOGIN_APP_ID as string}
      onSuccess={(response) => {
        console.log("Login Success!", response);
      }}
      onFail={(error) => {
        console.log("Login Failed!", error);
      }}
      onProfileSuccess={(response) => {
        console.log("Get Profile Success!", response);
      }}
      style={{
        backgroundColor: "#4267b2",
        color: "#fff",
        fontSize: "16px",
        border: "none",
        borderRadius: "4px",
      }}
    />
  );
};
