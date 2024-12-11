import { Devvit } from "@devvit/public-api";

const Leaderboard = (props: any) => {
  const rank = [
    { username: "u/gamer1", correctAnswers: "6" },
    { username: "u/gamer1", correctAnswers: "6" },
    { username: "u/gamer1", correctAnswers: "6" },
  ];

  const rankComponents = (
    username: string,
    correctAnswers: string,
    index: string
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
            <text size="large" color="green" weight="bold">{correctAnswers}</text>
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
           Your Rank: 45 | Your Correct Answers: 10
          </text>
          </vstack>
        </hstack>
        <vstack width="100%" height="100%" padding="medium">
          {rank.map(function (user, index) {
            return rankComponents(
              user.username,
              user.correctAnswers,
              (index + 1).toString()
            );
          })}
        </vstack>
      </vstack>
    </zstack>
  );
};

export default Leaderboard;
