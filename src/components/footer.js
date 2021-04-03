import React from 'react';
import { Box, Anchor, Footer, Text } from 'grommet';
import { Github } from 'grommet-icons';



const FooterUI = (props) => {

    return(
        <Footer 
            background="white" 
            pad="small"
            align="start"
            justify="between"
            border={{
                "color": "light-2",
                "size": "small",
                "side": "top"
              }}
            animation={{type:"slideUp", delay:0, size:"large", duration:500}}
            >
            <Text size="small">© 2021 Instabuy LK</Text>
            <Text size="small" weight="bold">Admin Console</Text>
            
        </Footer>
    )

}

export default FooterUI;