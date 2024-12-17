import { Context, useState, useAsync } from "@devvit/public-api";
import { redisService } from "../Service/redisService.js";
import { Devvit } from "@devvit/public-api";


const Home = (props: any, context: Context) => {
  const [chapterNumber, setChapterNumber] = useState<number | null>(null);

  // Use `useAsync` to fetch chapter data and update state
  const { loading: loadingChapter, error: errorChapter } = useAsync(async () => {
    const service = new redisService(context); // Initialize the redis service with context

    // Fetch all chapters from the service
    const todaysChapter = await service.getAllChapters();

    // Update the chapter number based on the result
    if (todaysChapter && Object.keys(todaysChapter).length > 0) {
      setChapterNumber(Object.keys(todaysChapter).length + 1);
    } else {
      setChapterNumber(1); // Default value if no chapters exist
    }
    return ""
  });

  function getLuckyComment(comments: any[]) {
    // Step 1: Get the current date and the date for yesterday
    const currentDate = new Date();
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(currentDate.getDate() - 0); // Set the date to yesterday
  
    // Console log the current and yesterday dates
    console.log("Current Date: ", currentDate);
    console.log("Yesterday's Date: ", yesterdayDate);
  
    // Step 2: Filter the comments that were posted exactly yesterday
    const commentsFromYesterday = comments.filter((comment: { createdAt: string | number | Date; }) => {
      // Convert the createdAt field to a Date object and compare it to yesterday's date
      const createdAt = new Date(comment.createdAt);
      const isFromYesterday = createdAt.toDateString() === yesterdayDate.toDateString();
      // Console log each comment's createdAt and if it matches yesterday
      console.log(`Comment Created At: ${createdAt.toDateString()}, Matches Yesterday: ${isFromYesterday}`);
      return isFromYesterday;
    });
  
    // Console log the filtered comments
    console.log("Comments from Yesterday: ", commentsFromYesterday);
  
    // Step 3: If there are comments from yesterday, select one randomly
    if (commentsFromYesterday.length > 0) {
      const luckyComment = commentsFromYesterday[Math.floor(Math.random() * commentsFromYesterday.length)];
  
      // Console log the lucky comment
      console.log("Lucky Comment Selected: ", luckyComment);
  
      // Step 4: Extract the username and the part after the first full stop in the comment body
      const username = luckyComment.authorName;
      const body = luckyComment.body;
      const firstFullStopIndex = body.indexOf('.');
      const commentAfterFirstStop = firstFullStopIndex !== -1 ? body.slice(firstFullStopIndex + 1).trim() : body;
  
      // Console log username, body, and the part after the first full stop
      console.log("Username: ", body.split(" ")[0]);
      console.log("Comment Body: ", body);
      console.log("Part After First Full Stop: ", body.split("story: ")[1]);
  
      // Step 5: Return the result as a map
      return {
        username: body.split(" ")[0],
        commentAfterFirstStop: body.split("story: ")[1]
      };
    } else {
      // Console log if no comments from yesterday were found
      console.log("No comments from yesterday.");
      return null;
    }
  }


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
        {/* Display loading or chapter number */}
        <text size="xxlarge" weight="bold" color="#262322">
          {loadingChapter
            ? "Loading..."
            : errorChapter
            ? "Error loading chapters"
            : `Snoo's Destiny: Chapter ${(d => d + (["th", "st", "nd", "rd"][(d % 100 - 20) % 10] || ["th", "st", "nd", "rd"][d % 100] || "th"))(new Date().getDate())} ${new Date().toLocaleString('default', { month: 'short' })}, ${new Date().getFullYear()}`}
        </text>
      </vstack>
      <vstack
        alignment="middle end"
        height="100%"
        width="100%"
        padding="medium"
      >
        <vstack
          alignment="center middle"
          padding="small"
          backgroundColor="#F6F6F680"
          cornerRadius="small"
        >
          <text color="#262322" size="medium" weight="bold">
            Welcome to Snoo's Destiny!
          </text>
          <text color="#262322" size="medium" weight="bold">
            Every day, a new riddle.
          </text>
          <text color="#262322" size="medium" weight="bold">
            Are you ready to solve it and earn
          </text>
          <text color="#262322" size="medium" weight="bold">
            points on the leaderboard?
          </text>
        </vstack>
        <vstack padding="small">
          <button
            textColor="#FFF6EC"
            appearance="success"
            size="medium"
            onPress={async () => {
              const comments = await context.reddit.getComments({
                postId: context.postId as unknown as string,
                limit: 10,
                pageSize: 10
              }).all();
              // console.log("comments: ", comments[0].createdAt)
              const c = await getLuckyComment(comments);
              console.log(c?.username, c?.commentAfterFirstStop)

              await props.setQuestion(c?.username, c?.commentAfterFirstStop); // Fetch today's question
             
              
              props.changeScreen("game"); // Navigate to the game screen
            }}
          >
            Play Now
          </button>
        </vstack>
      </vstack>
    </zstack>
  );
};

export default Home;