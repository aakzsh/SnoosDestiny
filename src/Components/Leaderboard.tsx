import { useAsync, Devvit } from "@devvit/public-api";
import { redisService } from "../Service/redisService.js";

const Leaderboard = (props: any, context: any) => {
  const { data: leaderboardData, loading, error } = useAsync(async () => {
    const service = new redisService(context);

    // Fetch all scores from Redis
    const scores = await service.getAllScores();
    if (!scores) return [];

    // Transform Redis object to an array and sort by scores in descending order
    const sortedScores = Object.entries(scores)
      .map(([username, score]) => ({ username, correctAnswers: parseInt(score) }))
      .sort((a, b) => b.correctAnswers - a.correctAnswers);

    // Return the top 3 scores
    return sortedScores.slice(0, 3);
  });

  const rankComponents = (
    username: string,
    correctAnswers: number,
    index: number
  ) => {
    return (
      <vstack>
        <spacer size="small"></spacer>
        <hstack
          padding="small"
          backgroundColor="#464646"
          cornerRadius="small"
          width="100%"
          height="40px"
          alignment="center middle"
        >
          <spacer size="small"></spacer>
          <hstack width="30%">
            <text size="medium">{index}</text>
            <spacer size="small"></spacer>
            <zstack cornerRadius="full" alignment="center middle">
              <image
                url="reddit-bg.png"
                resizeMode="cover"
                imageHeight="24px"
                imageWidth="24px"
                width="24px"
                height="24px"
              />
            </zstack>
            <spacer size="small"></spacer>
            <text size="medium" alignment="center middle">
              {username}
            </text>
          </hstack>
          <spacer size="large"></spacer>
          <hstack width="50%">
            <vstack alignment="center middle">
              <text size="large" color="green" weight="bold">
                {correctAnswers}
              </text>
              <text size="xsmall">Correct Answers</text>
            </vstack>
          </hstack>
          <spacer size="large"></spacer>
          <hstack width="10%">
            <icon name="share-android"></icon>
          </hstack>
          <spacer size="small"></spacer>
        </hstack>
        <spacer size="small"></spacer>
      </vstack>
    );
  };

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
            Leaderboard
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
              Are you at the top?
            </text>
            <text
              color="#FF823280"
              size="small"
              weight="regular"
              alignment="middle center"
              width="100%"
            >
              Your Rank: -- | Your Correct Answers: --
            </text>
          </vstack>
        </hstack>
        <vstack width="100%" height="100%" padding="medium">
          {loading ? (
            <text color="#FF8232">Loading leaderboard...</text>
          ) : error ? (
            <text color="#FF3232">Error loading leaderboard.</text>
          ) : leaderboardData ? (leaderboardData.length > 0  ? (
            leaderboardData?.map((user, index) =>
              rankComponents(user.username, user.correctAnswers, index + 1)
            )
          ) : (
            <text color="#E3E1DE">No scores available yet!</text>
          )) : <text color="#FF3232">No scores available yet!</text>}
        </vstack>
      </vstack>
    </zstack>
  );
};

export default Leaderboard;
