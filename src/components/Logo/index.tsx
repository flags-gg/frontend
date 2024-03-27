import {Link} from "react-router-dom";
import {FC} from "react";

interface LogoProps {
  size?: number
}
const Logo: FC<LogoProps> = ({size}) => {
  let dimension = size || 80

  return (
      <Link to={"/"} style={{textDecoration: 'none'}}>
        <img src={"/images/logo.svg"} alt={"flags.gg"} style={{
          width: dimension,
          height: dimension
        }}/>
      </Link>
  )
}

export default Logo;
