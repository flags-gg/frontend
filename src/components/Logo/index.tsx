import {Link} from "react-router-dom";
import {FC} from "react";

const Logo: FC = () => {
  return (
      <Link to={"/"} style={{textDecoration: 'none'}}>
        <img src={"/images/logo.svg"} alt={"flags.gg"} style={{width: 100}}/>
      </Link>
  )
}

export default Logo;
