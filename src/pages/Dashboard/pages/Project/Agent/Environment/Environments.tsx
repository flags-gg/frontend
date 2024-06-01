import {FC} from "react";

interface EnvironmentProps {
  envLimit?: number;
}

export const Environments: FC<EnvironmentProps> = ({
  envLimit = 0
}) => {
  console.log("Environments", envLimit);

  return (
    <div>
      <h1>Environments</h1>
    </div>
  );
}
