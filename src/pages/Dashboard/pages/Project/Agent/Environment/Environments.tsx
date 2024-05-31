import {FC} from "react";

interface EnvironmentProps {
  envLimit: number;
}

export const Environments: FC<EnvironmentProps> = ({
  envLimit = 0
}) => {
  return (
    <div>
      <h1>Environments</h1>
    </div>
  );
}
