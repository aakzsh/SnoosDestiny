import { Devvit } from "@devvit/public-api";

const Leaderboard = (props: any) => {
  const rank = [
    { username: "u/gamer1", correctAnswers: "6" },
    { username: "u/gamer1", correctAnswers: "6" },
    { username: "u/gamer1", correctAnswers: "6" },
    { username: "u/gamer1", correctAnswers: "6" },
    { username: "u/gamer1", correctAnswers: "6" },
  ];

  const rankComponents = (username: string, correctAnswers: string) => {
    return (
      <hstack grow padding="small" backgroundColor="#464646" cornerRadius="small">
        <spacer size="small"></spacer>
        <image
          url="reddit-bg.png"
          resizeMode="cover"
          imageHeight="256px"
          imageWidth="256px"
          width="100px"
          height="100px"
        />
        <spacer size="small"></spacer>
        <text size="medium">{username}</text>
        <spacer size="large"></spacer>
        <vstack>
            <text>{correctAnswers}</text>
            <text>Correct Answers</text>
        </vstack>
        <spacer size="large"></spacer>
        <icon name="share-ios"></icon>
        <spacer size="small"></spacer>
      </hstack>
    );
  };
  return (
    <zstack width="100%" height="100%" backgroundColor="#262322">
      <vstack>
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
          <text
            color="#FF8232"
            weight="bold"
            alignment="middle center"
            width="100%"
          >
            Are you at the top?
          </text>
        </hstack>
        {
            rankComponents("hehe", "5")
        }
      </vstack>
    </zstack>
  );
};

export default Leaderboard;
