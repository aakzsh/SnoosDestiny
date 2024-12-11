import { Devvit, useState, useAsync } from "@devvit/public-api";
import axios from "axios";

Devvit.configure({http: true})
Devvit.addCustomPostType({
  name: "Say Hello",
  render: () => {
    const [counter, setCounter] = useState(0);
    const [response, setResponse] = useState("hello");


    // const height = height
    return (
      <zstack width="100%" height="100%">
        <image
          url="reddit-bg.png"
          resizeMode="cover"
          imageHeight="256px"
          imageWidth="256px"
          width="100%"
          height="100%"
        />
        <vstack padding="small">
            <text size="xxlarge" weight="bold" color="#262322">
              {"Snoo's Destiny"}
            </text>
          </vstack>
          <vstack alignment="middle end" height="100%" width="100%" padding="medium">
            <button textColor="#FFF6EC" appearance="success" size="small">Play Now</button>
            <spacer size="medium" />
            <button textColor="#FFF6EC" appearance="media" size="small">How to play</button>
            <spacer size="medium" />
            <button textColor="#FFF6EC" appearance="media" size="small">Settings</button>
          </vstack>
          <hstack alignment="bottom center" height="100%" width="100%" padding="medium">
            <button textColor="#FFF6EC" appearance="media" size="small" onPress={()=>setCounter(counter+1)}>Start</button>
            <spacer size="medium" />
            <button textColor="#FFF6EC" appearance="media" size="small">Chapters</button>
            <spacer size="medium" />
            <button textColor="#FFF6EC" appearance="media" size="small">Progress</button>
          </hstack>
          <text>{counter}</text>
        {/* <vstack width="100%" height="100%"> */}
          
        
          
          
        {/* </vstack> */}
      </zstack>
      // <vstack>
      //   <vstack>
      //   <image
      //       // width={"100%"}
      //       imageHeight={500}
      //       imageWidth={122 + counter - 7}
      //       resizeMode='fill'
      //       url='reddit-bg.png'
      //     />
      //   </vstack>
      //   <vstack alignment='center middle' height='100%' gap='large'>
      //     <text size='xxlarge' weight='bold'>
      //       Hello! 👋
      //     </text>
      //     <button
      //       appearance='primary'
      //       onPress={() => setCounter(counter => counter + 1)}
      //     >
      //       Click me!
      //     </button>
      //     {counter ? (
      //       <text>{`You clicked ${counter} time(s)!`}</text>
      //     ) : (
      //       <text>&nbsp;</text>
      //     )}
      //   </vstack>
      // </vstack>
    );
  },
});

export default Devvit;
