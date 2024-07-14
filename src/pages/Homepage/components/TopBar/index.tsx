import {FC} from "react";
import {
  AppBar,
  Box,
  Button,
  Container,
  MenuItem,
  Toolbar,
  Typography,
  Drawer, Divider
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {useFlags} from "@flags-gg/react-library";
import {useNavigate} from "react-router-dom";

import Logo from "@C/Logo";

interface MenuLinks {
  name: string;
  id: string;
}
const links: MenuLinks[] = [
  {
    name: 'Features',
    id: 'features'
  },
  {
    name: 'Pricing',
    id: 'pricing'
  },
  {
    name: 'FAQ',
    id: 'faq'
  }
]


const TopBar: FC = () => {
  const {is} = useFlags()
  const navigate = useNavigate()

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    const offset = 128
    if (element) {
      const targetScroll = element.offsetTop - offset
      element.scrollIntoView({behavior: 'smooth'})
      window.scrollTo({top: targetScroll, behavior: 'smooth'})
    }
  }

  return (
    <Container maxWidth={false}>
      <AppBar position={"fixed"} sx={{
        boxShadow: 0,
        bgcolor: 'none',
        backgroundImage: 'none',
        mt: 2,
      }}>
        <Container maxWidth={false}>
          <Toolbar variant={"regular"} sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            bgcolor: 'rgba(98, 114, 164, 0.4)',
            flexShrink: 0,
            borderColor: 'rgba(189, 147, 249, 0.4)',
            borderStyle: 'solid',
            borderWidth: '0.15rem',
            borderRadius: '20px',
          }}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              flexGrow: 1
            }}>
              <Logo />
              <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                {is("hero").enabled() && (
                  <MenuItem onMouseDown={() => scrollToSection("hero")} sx={{
                    py: '0.6rem',
                    px: '1.2rem'
                  }}>
                    <Typography variant={"body2"} color={"text.primary"}>Hero</Typography>
                  </MenuItem>
                )}
                {is("showFeatures").enabled() && (
                  <MenuItem onMouseDown={() => scrollToSection("features")} sx={{
                    py: '0.6rem',
                    px: '1.2rem'
                  }}>
                    <Typography variant={"body2"} color={"text.primary"}>Features</Typography>
                  </MenuItem>
                )}
                {is("pricing").enabled() && (
                  <MenuItem onMouseDown={() => scrollToSection("pricing")} sx={{
                    py: '0.6rem',
                    px: '1.2rem'
                  }}>
                    <Typography variant={"body2"} color={"text.primary"}>Pricing</Typography>
                  </MenuItem>
                )}
                {is("faq").enabled() && (
                  <MenuItem onMouseDown={() => scrollToSection("faq")} sx={{
                    py: '0.6rem',
                    px: '1.2rem'
                  }}>
                    <Typography variant={"body2"} color={"text.primary"}>FAQ</Typography>
                  </MenuItem>
                )}
              </Box>
            </Box>
            <Box sx={{
              display: {
                xs: 'none',
                md: 'flex'
              },
              gap: 0.5,
              alignItems: 'center'}}>
              <Button color={"primary"} variant={"contained"} sx={{ml: 2}} onMouseDown={() => navigate("https://dashboard.flags.gg")}>
                Sign In
              </Button>
            </Box>
            <Box sx={{
              display: {sm: '', md: 'none'},
              gap: 0.5,
              alignItems: 'center',
            }}>
              <Button variant={"text"} color={"primary"} sx={{
                minWidth: '30px',
                p: '4px'
              }}>
                <MenuIcon />
              </Button>
              <Drawer anchor={"right"}>
                <Box sx={{
                  minWidth: '60dvw',
                  p: 2,
                  backgroundColor: 'background.paper',
                  flexGrow: 1,
                }}>
                  {links.map(({id, name}, index) => (
                    <MenuItem key={index} onMouseDown={() => scrollToSection(id)}>
                      <Typography variant={"body2"} color={"text.primary"}>
                        {name}
                      </Typography>
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem>
                    <Button color={"primary"} variant={"contained"} onMouseDown={() => navigate("https://dashboard.flags.gg")}>
                      Sign In
                    </Button>
                  </MenuItem>
                </Box>
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Container>
  )
}

export default TopBar
