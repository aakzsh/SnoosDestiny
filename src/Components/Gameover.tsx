import { Context, Devvit } from "@devvit/public-api";

const GameOver = (props: any, context: Context) => {
  const playerScore = 10; // Example score
//   let com = new Comment();
//   async function onGuessHandler(guess: string, createComment: boolean): Promise<void> {
//     if (!props.postData || !props.username) {
//       guess,
//       createComment,
//     });
//   }



// const firstSolveComment = Devvit.addSchedulerJob({
//   name: 'SOLVER_COMMENT',
//   onRun: async (
//     event: {
//       data: {
//         postId: string;
//         username: string;
//       };
//     },
//     context
//   ) => {
//     if (event.data) {
//       try {
//         await context.reddit.submitComment({
//           id: event.data.postId,
//           text: `u/${event.data.username} is the first to solve this drawing!`,
//         });
//       } catch (error) {
//         console.error('Failed to submit comment:', error);
//       }
//     }
//   },
// });


  return (
    <zstack width="100%" height="100%" backgroundColor="#262322">
      <vstack width="100%" height="100%">
        <hstack padding="medium">
          <icon
            name="back"
            color="#E3E1DE"
            size="medium"
            onPress={props.navigateback}
          ></icon>
          <spacer size="medium"></spacer>
          <text size="large" color="#E3E1DE" weight="bold">
            Quest Complete
          </text>
        </hstack>
        <hstack alignment="center middle" width="100%">
          <vstack>
            <text
              color="#FF8232"
              weight="bold"
              alignment="middle center"
              width="100%"
            >
              Nice Game!
            </text>
          </vstack>
        </hstack>
        <hstack width="100%" alignment="center middle">
          <vstack>
            <spacer size="medium"></spacer>
            <text size="medium" color="#E3E1DE">
                Thanks for playing, come again tomorrow!
              </text>

            <spacer size="medium"></spacer>
            <button onPress={
                // ()=>console.log("hehe")
                async ()=>{
                await props.submitComment();
            }
            
            
            }>Create Comment</button>
            <spacer size="medium"></spacer>
            <button onPress={props.navigateHome} appearance="success">
            Go to Home
            </button>
            <spacer size="large"></spacer>
          </vstack>
        </hstack>
      </vstack>
    </zstack>
  );
};

export default GameOver;
