import { Devvit, useState, useAsync, Context } from "@devvit/public-api";
import Home from "./Components/Home.js";
import Leaderboard from "./Components/Leaderboard.js";

Devvit.configure({ http: true, realtime: true });
Devvit.addCustomPostType({
  name: "Say Hello",
  render: () => {
    const [screen, setScreen] = useState("home");

    const renderContent = () => {
      switch (screen) {
        case "home":
          return <Home />;
        case "leaderboard":
          return <Leaderboard navigateback={navigateback}/>
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
    
    return (
      <zstack height="100%" width="100%">
        {renderContent()}
        <hstack
        alignment="bottom center"
        height="100%"
        width="100%"
        padding="medium"
      >
        <button
          textColor="#FFF6EC"
          appearance={screen=="home"?"success":"media"}
          size="small"
          onPress={() => {changeScreen("home")}}
        >
          Home
        </button>
        <spacer size="medium" />
        <button textColor="#FFF6EC" appearance={screen=="chapters"?"success":"media"} size="small" onPress={() => {changeScreen("chapters")}}>
          Chapters
        </button>
        <spacer size="medium" />
        <button textColor="#FFF6EC" appearance={screen=="leaderboard"?"success":"media"} size="small" onPress={() => {changeScreen("leaderboard")}}>
          Leaderboard
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
