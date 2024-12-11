import { Devvit, useState, useAsync, Context } from "@devvit/public-api";


Devvit.configure({http: true, realtime: true})
Devvit.addCustomPostType({
  name: "Say Hello",
  render: () => {
    const [counter, setCounter] = useState(0);
    const [response, setResponse] = useState("hello");
    const [answer, setAnswer] = useState("default")

    async function fetchResponse(): Promise<string> {
  try {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos/', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'GET'
    });

    const json = await res.json();
console.log(json)
    return json?.title?.length > 0 ? json?.title: 'No response';
  } catch (e: any) {
    console.log('Fetch error ', e);
    return e.toString();
  }
}

    
 async function onPressY() {
   // print()
  console.log("called")
      const response = await fetchResponse();
   
  console.log(response)
      setAnswer(response || 'No Response');
}


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
          <vstack alignment="middle end" height="100%" width="100%" padding="medium" >
            <vstack alignment="center middle" padding="small" backgroundColor="#F6F6F680" cornerRadius="small" >
              <text color="#262322" size="medium">Welcome to Snoo’s Destiny!</text>
              <text color="#262322" size="medium">Every day, a new riddle.</text>
              <text color="#262322" size="medium">Are you ready to solve it and earn</text>
              <text color="#262322" size="medium">points on the leaderboard?</text>
            </vstack>
            <vstack padding="small">
            <button textColor="#FFF6EC" appearance="success" size="medium">Play Now</button>
            </vstack>
          </vstack>
          <hstack alignment="bottom center" height="100%" width="100%" padding="medium">
            <button textColor="#FFF6EC" appearance="success" size="small" onPress={()=>onPressY()}>Home</button>
            <spacer size="medium" />
            <button textColor="#FFF6EC" appearance="media" size="small">Chapters</button>
            <spacer size="medium" />
            <button textColor="#FFF6EC" appearance="media" size="small">Leaderboard</button>
          </hstack>
          <text>{answer}</text>
        {/* <vstack width="100%" height="100%"> */}
          
        
          
          
        {/* </vstack> */}
      </zstack>
      
    );
  },
});

export default Devvit;
