import {FC} from "react";

import {Account} from "./Account"
import {Settings} from "./Settings"

export const Company: FC = () => {
  return (
    <div>
      <h1>Company</h1>
    </div>
  );
}

export {
  Account as CompanyAccount,
  Settings as CompanySettings
}
