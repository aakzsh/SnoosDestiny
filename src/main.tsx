import { Devvit, useState, useAsync, Context, getSubredditLeaderboard, getSubredditInfoByName, getSubredditInfoById } from "@devvit/public-api";
import Home from "./Components/Home.js";
import Leaderboard from "./Components/Leaderboard.js";
import Rules from "./Components/Rules.js";
import Chapters from "./Components/Chapters.js";

Devvit.configure({ http: true, realtime: true, redditAPI: true });
Devvit.addCustomPostType({
  name: "Say Hello",
  render: () => {
    const [screen, setScreen] = useState("home");
    const [leaderboard, setLeaderboard] = useState("null")

    const renderContent = () => {
      switch (screen) {
        case "home":
          return <Home />;
        case "leaderboard":
          return <Leaderboard navigateback={navigateback}/>
        case "rules":
            return <Rules navigateback={navigateback}/>
        case "chapters":
            return <Chapters navigateback={navigateback}/>
        default:
          return <text>hello</text>;
      }
    };

    const changeScreen = (screenToChange: string) => {
      setScreen(screenToChange);
    }

    const navigateback = () => {
      setScreen("home");
    }
    
    const getLeaderBoard = async () =>{
      console.log("register")
      const leaderboard = await getSubredditInfoById("t5_2qh1o", {})
      setLeaderboard(leaderboard.toString())
      console.log(leaderboard)
  }
    return (
      <zstack height="100%" width="100%">
        {renderContent()}
        <hstack
        alignment="bottom center"
        height="100%"
        width="100%"
        padding="small"
      >
        <button
          textColor="#FFF6EC"
          appearance={screen=="home"?"success":"media"}
          size="small"
          onPress={() => {changeScreen("home")}}
        >
          Home
        </button>
        <spacer size="small" />
        <button textColor="#FFF6EC" appearance={screen=="chapters"?"success":"media"} size="small" onPress={() => {changeScreen("chapters")
        }}>
          Chapters
        </button>
        <spacer size="small" />
        <button textColor="#FFF6EC" appearance={screen=="leaderboard"?"success":"media"} size="small" onPress={() => {changeScreen("leaderboard")}}>
          Leaderboard
        </button>
        <spacer size="small" />
        <button textColor="#FFF6EC" appearance={screen=="rules"?"success":"media"} size="small" onPress={() => {changeScreen("rules")
        }}>
          How to play?
        </button>
      </hstack>
      </zstack>
      
    )
    
    // screen == "home" ? (
    //   <Home />
    // ) : screen == "leaderboard" ? (
    //   <Leaderboard />
    // ) : (
    //   <text>none</text>
    // );
  },
});

export default Devvit;
