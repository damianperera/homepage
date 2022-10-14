import * as React from "react";
import { Twitter, Error } from "@mui/icons-material";
import { Item } from "../common";
import { Box, Stack, CircularProgress } from "@mui/material";
import { TwitterTimelineEmbed } from "react-twitter-embed";

function TwitterList() {
    const twitterListId = "1579994115697041409";
  
    const [twitterListLoading, setTwitterListLoading] = React.useState(true);
    const [twitterListLoadingFailed, setTwitterListLoadingFailed] = React.useState(false);
  
    const handleOnTwitterListLoadComplete = (e) => {
      if (e === undefined) {
        setTwitterListLoadingFailed(true);
      }
      setTwitterListLoading(false);
    }
    
    return (
      <Item>
        <Stack direction="row" alignItems="center" justifyContent="center" gap={1}>
          <Twitter /><h3>Development & Tech Tweets</h3>
        </Stack>
        <Box sx={{ height: 650, width: "100%" }}>
          { twitterListLoading 
              && <CircularProgress sx={{ marginTop: "30%" }} />
          }
          { twitterListLoadingFailed 
              && 
                <Stack direction="row" alignItems="center" justifyContent="center" gap={1} sx={{ paddingTop: "30%" }}>
                  <Error /> Something went wrong, are you logged into Twitter?
                </Stack>
          }
          <TwitterTimelineEmbed 
            sourceType="list" 
            id={twitterListId}
            theme="dark"
            autoHeight
            noHeader
            noFooter
            noBorders
            tweetLimit={20}
            onLoad={handleOnTwitterListLoadComplete}
          />
        </Box>
      </Item>
    );
}

export default TwitterList;