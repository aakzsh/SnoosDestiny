import { Devvit, useState, useAsync, Context, getSubredditLeaderboard, getSubredditInfoByName, getSubredditInfoById, useForm } from "@devvit/public-api";
import Home from "./Components/Home.js";
import Leaderboard from "./Components/Leaderboard.js";
import Rules from "./Components/Rules.js";
import Chapters from "./Components/Chapters.js";
import Game from "./Components/Game.js";
import generateStory from "./Service/apiService.js";
import { redisService } from "./Service/redisService.js";
import GameOver from "./Components/Gameover.js";

Devvit.configure({ http: true, realtime: true, redditAPI: true, redis: true });

Devvit.addCustomPostType({
  name: "Say Hello",
  render: (context) => {
    const service = new redisService(context);

    const [screen, setScreen] = useState("home");
    const [leaderboard, setLeaderboard] = useState("null");
    const [chapterNumber, setChapterNumber] = useState(1);
    const [todaysQuestion, setTodaysQuestion] = useState({ answer: "" });
    const [timetaken, setTimetaken] = useState("")

    // Use `useAsync` to fetch and set chapter number
    const { loading: loadingChapter, error: errorChapter } = useAsync(async () => {
      const todaysChapter = await service.getAllChapters();
      if (todaysChapter && Object.keys(todaysChapter).length > 0) {
        setChapterNumber(Object.keys(todaysChapter).length + 100);
      } else {
        setChapterNumber(1);
      }
      return ""
    });

    // Fetch or generate today's question
    const setQuestion = async (username: string, suggestion: string) => {
      const todaysChapter = await service.getTodaysChapter();
      let chapter;
      if (todaysChapter) {
        chapter = todaysChapter;
        console.log("Chapter present");
      } else {
        chapter = await generateStory(suggestion);
        console.log("Chapter not present, new generated");
        await service.saveChapter(chapter, username);
      }
      setTodaysQuestion(chapter);
    };

    const changeScreen = (screenToChange: string) => {
      setScreen(screenToChange);
    };

    const navigateBack = () => {
      setScreen("home");
    };

    const getLeaderBoard = async () => {
      console.log("Register");
      const leaderboard = await getSubredditInfoById("t5_2qh1o", {});
      setLeaderboard(leaderboard.toString());
      console.log(leaderboard);
    };

    const myForm = useForm(
      {
        fields: [
          {
            type: "string",
            name: "name",
            label: "Type Here",
          },
        ],
      },
      (values) => {
        // onSubmit handler
        console.log(values.name);
        if (values.name?.toLowerCase() !== todaysQuestion.answer.toLowerCase() && values.name?.toLowerCase() !== "redditors") {
          context.ui.showToast("Wrong answer! Please try again");
        } else {
          // success logic here
          context.ui.showToast("Correct answer!!!");
          changeScreen("gameover")
        }
      }
    );


  const createComment = async (suggestion: string) =>{
      console.log("clicked")
                  
      const postId = context.postId;
      const user = await context.reddit.getCurrentUser();
      console.log("oui ", postId)
     const res = await context.reddit.submitComment({
      id: postId as unknown as string,
      text: `u/${user?.username} took ${timetaken}s to answer the quest correctly. Their suggestion for next story: ${suggestion}`,
    });
    console.log("res is ", res)
  }

    const commentForm = useForm(
      {
        fields: [
          {
            type: "string",
            name: "name",
            label: "Type your suggestion for next story quest",
          },
        ],
      },
     async (values) => {
        await createComment(values.name as unknown as string)
        setScreen("home")
      }
    );

    const submitAnswer = () => {
      context.ui.showForm(myForm);
    };

    const submitComment = () => {
      context.ui.showForm(commentForm);
    };

    const renderContent = () => {
      switch (screen) {
        case "home":
          return <Home changeScreen={changeScreen} setQuestion={setQuestion} chapterNumber={chapterNumber} />;
        case "leaderboard":
          return <Leaderboard navigateback={navigateBack} />;
        case "rules":
          return <Rules navigateback={navigateBack} />;
        case "chapters":
          return <Chapters navigateback={navigateBack} />;
        case "gameover":
          return <GameOver navigateHome={navigateBack} timetaken={timetaken} submitComment={submitComment}/>;
        case "game":
          return (
            <Game
              navigateback={navigateBack}
              changeScreen={changeScreen}
              question={todaysQuestion}
              submitAnswer={submitAnswer}
              setTimetaken={setTimetaken}
            />
          );
        default:
          return <text>hello</text>;
      }
    };

    return (
      <zstack height="100%" width="100%">
        {loadingChapter ? (
          <text size="medium" alignment="center middle">
            {"Loading chapters..."}
          </text>
        ) : errorChapter ? (
          <text size="medium" alignment="center middle" color="red">
            {"Error loading chapters."}
          </text>
        ) : (
          <>
            {renderContent()}
            <hstack alignment="bottom center" height="100%" width="100%" padding="small">
              <button
                textColor="#FFF6EC"
                appearance={screen == "home" ? "success" : "media"}
                size="small"
                onPress={() => {
                  changeScreen("home");
                }}
              >
                Home
              </button>
              <spacer size="small" />
              <button
                textColor="#FFF6EC"
                appearance={screen == "chapters" ? "success" : "media"}
                size="small"
                onPress={() => {
                  changeScreen("chapters");
                }}
              >
                Chapters
              </button>
              <spacer size="small" />
              <button
                textColor="#FFF6EC"
                appearance={screen == "leaderboard" ? "success" : "media"}
                size="small"
                onPress={() => {
                  changeScreen("leaderboard");
                }}
              >
                Leaderboard
              </button>
              <spacer size="small" />
              <button
                textColor="#FFF6EC"
                appearance={screen == "rules" ? "success" : "media"}
                size="small"
                onPress={() => {
                  changeScreen("rules");
                }}
              >
                How to play?
              </button>
            </hstack>
          </>
        )}
      </zstack>
    );
  },
});

export default Devvit;
