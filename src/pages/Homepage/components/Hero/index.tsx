import {FC} from "react";
import {alpha, Box, Container} from "@mui/material";

const Hero: FC = () => {
  return (
    <Box id={"hero"} sx={{
      width: '100%',
      backgroundImage: `linear-gradient(#282A36, ${alpha('#44475A', 0.0)})`,
      backgroundSize: '100% 20%',
      backgroundRepeat: 'no-repeat',
    }}>
        <Container
          maxWidth={false}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            pt: { xs: 14, sm: 20 },
            pb: { xs: 8, sm: 12 },
        }}>
        </Container>
    </Box>
  )
}

export default Hero
