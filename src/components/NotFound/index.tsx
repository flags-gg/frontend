import {FC, useEffect} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import {ArrowLeft} from "@mui/icons-material";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "react-oidc-context";

const NotFound: FC = () => {
  const auth = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/")
    }
  }, [auth, navigate])

  return (
    <Box
      component={"main"}
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        minWidth: '98vw',
      }}>
      <Stack
        spacing={3}
        sx={{
          alignItems: 'center',
          maxWidth: 'md',
        }}>
        <Box>
          <Box
            component={"img"}
            alt={"404"}
            src={"/images/error-404.png"}
            sx={{
              display: 'inline-block',
              height: 'auto',
              maxWidth: '100%',
              width: '400px'
            }} />
        </Box>
        <Typography variant={"h3"} sx={{ textAlign: 'center' }}>
          404: The page your not looking for isn't here
        </Typography>
        <Typography color={"text.secondary"} variant={"body1"} sx={{ textAlign: 'center' }}>
          You either tried some shady route or you came here by mistake. Whichever it is, try using the navigation
        </Typography>
        <Button
          component={Link}
          to={"/"}
          startIcon={<ArrowLeft />}>
          Go back home
        </Button>
      </Stack>
    </Box>
  )
}

export default NotFound;
