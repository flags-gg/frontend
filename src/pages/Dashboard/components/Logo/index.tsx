import {ButtonBase} from "@mui/material";
import {Link} from "react-router-dom";

const Logo = () => {
  return (
    <ButtonBase disableRipple component={Link} to={"/"}>
      <img src={"/images/logo.svg"} alt="Logo" />
    </ButtonBase>
  )
}

export default Logo;
