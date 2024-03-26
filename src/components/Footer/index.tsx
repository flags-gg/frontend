import {Box, Container, IconButton, Link, Stack, Typography} from "@mui/material";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import {FC} from "react";

import {BuildDetails} from "@/app.config";
import Logo from "@C/Logo";

function Copyright() {
  return (
    <Typography variant={"body2"} color={"text.secondary"} mt={1}>
      {'Copyright © '}
      <Link href={"https://chewedfeed.com"}>ChewedFeed</Link>
      &nbsp;{new Date().getFullYear()}
    </Typography>
  )
}

const Footer: FC = () => {
  return (
    <Container sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: {
        xs: 4,
        sm: 8
      },
      py: {
        xs: 8,
        sm: 10
      },
      textAlign: {
        sm: 'center',
        md: 'left'
      }
    }}>
      <Box sx={{
        display: 'flex',
        flexDirection: {
          xs: 'column',
          sm: 'row'
        },
        width: '100%',
        justifyContent: 'space-between',
      }}>
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          minWidth: {
            xs: '100%',
            sm: '60%'
          },
        }}>
          <Box sx={{
            width: {
              xs: '100%',
              sm: '60%'
            }
          }}>
            <Box sx={{ml: '-15px'}}>
              <Logo />
            </Box>
          </Box>
        </Box>
        <Box sx={{
          display: {
            xs: 'none',
            sm: 'flex'
          },
          flexDirection: 'column',
          gap: 1,
        }}>
          <Typography variant={"h6"}>Company</Typography>
          <Link href={"https://chewedfeed.com/privacy.html"}>Privacy Policy</Link>
          <Link href={"https://chewedfeed.com/cookie.html"}>Cookie Policy</Link>
        </Box>
      </Box>
      <Box sx={{
        display: 'flex',
        justifyContent: 'space-between',
        pt: {
          xs: 4,
          sm: 8
        },
        width: '100%',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}>
        <div>
          <Copyright />
          <Typography variant={"caption"}>
            Hash: {BuildDetails.Hash}
            <br />
            Tag: {BuildDetails.Tag}
          </Typography>
        </div>
        <Stack direction={"row"} spacing={1} justifyContent={"left"} useFlexGap sx={{
        color: 'text.secondary',
        }}>
          <IconButton color={"inherit"} href={"https://www.linkedin.com/company/chewedfeed"} sx={{
            selfAlign: 'center',
          }}>
            <LinkedInIcon />
          </IconButton>
        </Stack>
      </Box>
    </Container>
  )
}

export default Footer
