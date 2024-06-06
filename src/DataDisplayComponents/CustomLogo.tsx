export const CustomLogo = () => {
  return (
    <div className="custom-logo-frame">
      <div className="custom-logo-layer-1">
        <div className="custom-logo-layer-2_1" />
        <div className="custom-logo-layer-2_2">
          <div className="custom-logo-layer-3">
            <div className="custom-logo-layer-4">
              <img
                className="object-cover w-full h-full block object-center"
                style={{ imageRendering: "auto" }}
                decoding="async"
                alt="logo"
                src="https://tcw-images.s3.us-west-2.amazonaws.com/white-logo-plain.png"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
