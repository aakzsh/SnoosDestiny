import { Devvit, useState, useAsync, Context, getSubredditLeaderboard, getSubredditInfoByName, getSubredditInfoById, useForm } from "@devvit/public-api";
import Home from "./Components/Home.js";
import Leaderboard from "./Components/Leaderboard.js";
import Rules from "./Components/Rules.js";
import Chapters from "./Components/Chapters.js";
import Game from "./Components/Game.js";
import generateStory from "./Service/apiService.js";
import {redisService} from "./Service/redisService.js";

Devvit.configure({ http: true, realtime: true, redditAPI: true, redis: true });


Devvit.addCustomPostType({
  name: "Say Hello",
  render: (context) => {

    const service = new redisService(context);

    const myForm = useForm(
      {
        fields: [
          {
            type: 'string',
            name: 'name',
            label: 'Type Here',
          },
        ],
      },
      (values) => {
        // onSubmit handler
        console.log(values.name)
        if(values.name!==todaysQuestion.answer){
          context.ui.showToast("Wrong answer! Please try again")
        }
        else{
          // success logic here 
          context.ui.showToast("Correct answer!!!")
        }
        
        // setName(values.name);
      }
    );

    const submitAnswer = () =>{
      context.ui.showForm(myForm);
    } 

    const [screen, setScreen] = useState("home");
    const [leaderboard, setLeaderboard] = useState("null")

    const renderContent = () => {
      switch (screen) {
        case "home":
          return <Home  changeScreen={changeScreen} setQuestion={setQuestion}/>;
        case "leaderboard":
          return <Leaderboard navigateback={navigateback}/>
        case "rules":
            return <Rules navigateback={navigateback}/>
        case "chapters":
            return <Chapters navigateback={navigateback}/>
        case "game":
              return <Game navigateback={navigateback}  changeScreen={changeScreen} question={todaysQuestion} submitAnswer={submitAnswer}/>
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

  const [todaysQuestion, setTodaysQuestion] = useState({"answer": ""})
  const setQuestion = async () =>{
    // check if story present for today
    const todaysChapter = await service.getTodaysChapter();
    let chapter;
    if (todaysChapter)
    {
      chapter = todaysChapter;
      console.log("chapter present")
    }
    else
    {
      chapter = await generateStory();
      console.log("chapter not present, new generated")

      service.saveChapter(chapter)
    }
    setTodaysQuestion(chapter)
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
