import { AppSwitch } from "DataEntryComponents/AppSwitch";
import { PageTitle } from "../../DataDisplayComponents/PageTitle";
import { AppSpace } from "../../LayoutComponents/AppSpace";
import { useDispatch, useSelector } from "react-redux";
import { setIsDevMode } from "features/settings/generalSlice";

export const GeneralPage = () => {
  const { isDevMode } = useSelector((state: any) => state.general);
  const dispatch = useDispatch();

  const handleDevModeSwitch = (checked: boolean) => {
    dispatch(setIsDevMode(checked));
  };

  return (
    <AppSpace>
      <PageTitle>General</PageTitle>
      <AppSwitch value={isDevMode} onChange={handleDevModeSwitch}>
        Dev Mode
      </AppSwitch>
    </AppSpace>
  );
};
