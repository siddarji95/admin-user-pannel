import React from "react";
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

function CustomList(props) {
    const { links } = props;
    console.log(links)
    return (
      <List>
        {links.map((link, index) => (
          <ListItem button key={index} component={Link} to={link.path}
          >
            <ListItemIcon>
              {link.icon}
            </ListItemIcon>
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
      </List>
    );
}

export default CustomList;
