import { Devvit } from "@devvit/public-api";

const Home = () => {
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
        <text size="xxlarge" weight="bold" color="#262322">
          {"Snoo's Destiny"}
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
          <button textColor="#FFF6EC" appearance="success" size="medium">
            Play Now
          </button>
        </vstack>
      </vstack>
      {/* <hstack
        alignment="bottom center"
        height="100%"
        width="100%"
        padding="medium"
      >
        <button
          textColor="#FFF6EC"
          appearance="success"
          size="small"
          onPress={() => {}}
        >
          Home
        </button>
        <spacer size="medium" />
        <button textColor="#FFF6EC" appearance="media" size="small">
          Chapters
        </button>
        <spacer size="medium" />
        <button textColor="#FFF6EC" appearance="media" size="small">
          Leaderboard
        </button>
      </hstack> */}
    </zstack>
  );
};

export default Home;
