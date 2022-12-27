import React, { useEffect, useState } from "react";
import Tooltip  from "react-bootstrap/Tooltip";
import HelpIcon from '@mui/icons-material/HelpOutline';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';

export default function HelpToolTip(props) {
    let desc = props.description;

  return (
    <span style={{ whiteSpace: 'pre-line' }}>
        {desc.length > 0 && (
            <OverlayTrigger 
            overlay={<Tooltip title="Help">
                        {props.description}
                    </Tooltip>}
            placement="right"
            >
            <HelpIcon style={{ marginLeft: 5, maxHeight: 20}}></HelpIcon>
            </OverlayTrigger>
        )}
    </span>

  );
}

HelpToolTip.defaultProps = {
    description: ""
}