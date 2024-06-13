import {FC} from "react";
import {loadStripe} from "@stripe/stripe-js";
import {Elements} from "@stripe/react-stripe-js";

import {Account} from "./Account"
import {Settings} from "./Settings"
import {stripeConfig} from "@/app.config.tsx";

export const Company: FC = () => {
  const stripePromise = loadStripe(stripeConfig.stripe)

  return (
    <div>
      <h1>Company</h1>
      <Elements stripe={stripePromise}>
        <Account />
        <Settings />
      </Elements>
    </div>
  );
}

export {
  Account as CompanyAccount,
  Settings as CompanySettings
}
