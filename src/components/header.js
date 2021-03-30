import React from 'react'
import { Box, Button } from 'grommet';

// CSS Import
import './header.css'

import logo from './instabuylogo.png';

const Header = (props) => {
    return(
        <Box
            tag= 'header'
            direction= 'row'
            align= 'center'
            justify= 'between'
            background= 'white'
            pad= {{ left: 'medium', right: 'small', vertical: 'small' }}
            elevation= 'xsmall'
            style= {{ zIndex: '1' }}
            {...props}
        >
            <div style={{ display: 'flex' }}>
                <img src={logo} className="app-logo" alt="logo" />
                <p style={{fontSize: "18px"}}><span className="app-title">InstaDelivery</span> Admin Console</p>
            </div>
            <Button primary hoverIndicator='accent-1' focusIndicator={false} label="logout" className="button-style"/>
        </Box>
    )
}

export default Header;