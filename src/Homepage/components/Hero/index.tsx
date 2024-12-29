import {FC} from "react";
import {alpha, Box, Container} from "@mui/material";
import {useFlags} from "@flags-gg/react-library";

const Hero: FC = () => {
  const {is} = useFlags();
  if (!is("hero").enabled()) {
    return null;
  }

  return (
    <Box id={"what-is-flags-gg"} sx={{
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
          Flags.gg is a multi-project, multi-agent, multi-environment feature flag platform.<br />

          <h3>Ship with Confidence</h3>
          <p>Deploy features across multiple projects and environments with precise control. Turn features on or off instantly, ensuring your releases are always under control.</p>

          <h3>Scale Without Complexity</h3>
          <p>Built for teams managing multiple projects and agent systems. Create, test, and deploy features with granular control over who sees what and when.</p>

          <p>Simply wrap your code with a Flags.gg control block and gain instant power to toggle features across any environment or user group. With our multi-project support, you can manage features across your entire application ecosystem without redeploying.</p>
      </Container>
    </Box>
  )
}

export default Hero
