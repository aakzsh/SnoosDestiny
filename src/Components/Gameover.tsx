import { Context, Devvit, useAsync } from "@devvit/public-api";
import { redisService } from "../Service/redisService.js";

const GameOver = (props: any, context: Context) => {
  const playerScore = 10; // Example score for other UI purposes
  const service = new redisService(context);
  
  // Use useAsync to handle saving/incrementing the score
  const { loading: savingScore, error: saveError } = useAsync(async () => {
    const user = await context.reddit.getCurrentUser()
    if (user)
    {
      service.saveOrUpdateScore(user?.username)
    }  
    return ""
});

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

            {/* Display score saving state */}
            {savingScore ? (
              <text color="#FF8232">Saving your score...</text>
            ) : saveError ? (
              <text color="#FF3232">Error saving score. Try again later.</text>
            ) : (
              <text color="#32FF32">Score saved successfully!</text>
            )}

            <spacer size="medium"></spacer>
            <button
              onPress={async () => {
                await props.submitComment();
              }}
            >
              Create Comment
            </button>
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
