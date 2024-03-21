import {Box, List, ListItem, ListItemText, Toolbar} from "@mui/material";
import {FC} from "react";
import {Link} from "react-router-dom";


const Sidebar: FC = () => {
  return (
    <Box
      sx={{
        width: 240,
        flexShrink: 0,
        bgcolor: 'background.paper',
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {['Dashboard', 'Customers', 'Reports'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemText primary={text} />
            </ListItem>
          ))}
          <ListItem>
            <Link to={'/account'}>Account</Link>
          </ListItem>
        </List>
      </Box>
    </Box>
  )
}

export default Sidebar;
