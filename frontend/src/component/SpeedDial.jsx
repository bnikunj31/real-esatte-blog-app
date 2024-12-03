import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

import CallIcon from '@mui/icons-material/Call';

const StyledSpeedDial = styled(SpeedDial)(({ theme }) => ({
  position: 'fixed',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
}));


const actions = [
  { 
    icon: <WhatsAppIcon  style={{color:"green"}}/>, 
    name: 'WhatsApp', 
    onClick: () => {
      const phoneNumber = '7015433569'; 
      const message = 'Hello, I would like to inquire about...'; 
      window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, '_blank');
    },
  },
  
  
  { 
    icon: <CallIcon style={{color:"blue"}} />, 
    name: 'Call Us',  
    onClick: () => {
      const phoneNumber = '7015433569'; 
      window.location.href = `tel:${phoneNumber}`;  
    },
    },
    { 
        icon: <EmailIcon style={{color:"red"}}/>, 
        name: 'Email', 
        onClick: () => {
          const email = 'propertymission81@gmail.com'; 
          const subject = 'Inquiry from Customer'; 
          const body = 'Hello, I would like to discuss...'; 
          window.open(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
        },
      },
];

export default function PlaygroundSpeedDial() {
  return (
    <Box >
      <StyledSpeedDial
        ariaLabel="SpeedDial with WhatsApp, Email, Contact, and Call functionalities"
        icon={<SpeedDialIcon />}
        direction="up"
      >
        {actions.map((action) => (
          <SpeedDialAction 
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            onClick={action.onClick} 
          />
        ))}
      </StyledSpeedDial>
    </Box>
  );
}
