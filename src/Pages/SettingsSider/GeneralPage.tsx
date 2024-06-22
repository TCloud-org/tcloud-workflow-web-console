import { AppSwitch } from "DataEntryComponents/AppSwitch";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { useDispatch, useSelector } from "react-redux";
import { setIsDarkMode, setIsDevMode } from "features/settings/generalSlice";

export const GeneralPage = () => {
  const { isDevMode, isDarkMode } = useSelector((state: any) => state.general);
  const dispatch = useDispatch();

  const handleDevModeSwitch = (checked: boolean) => {
    dispatch(setIsDevMode(checked));
  };

  return (
    <AppSpace>
      <PageTitle>General</PageTitle>

      <div className="flex items-center justify-between">
        <p>Dark mode</p>

        <AppSwitch
          value={isDarkMode}
          onChange={(checked) => dispatch(setIsDarkMode(checked))}
        />
      </div>

      <div className="flex items-center justify-between">
        <p>Development mode</p>

        <AppSwitch value={isDevMode} onChange={handleDevModeSwitch} />
      </div>
    </AppSpace>
  );
};
