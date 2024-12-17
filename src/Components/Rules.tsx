import { Devvit, useInterval, useState } from "@devvit/public-api";

const Rules = (props: any) => {


  return (
    <zstack width="100%" height="100%" backgroundColor="#262322">
    <image
        url="game-bg.png"
        resizeMode="cover"
        imageHeight="256px"
        imageWidth="256px"
        width="100%"
        height="100%"
      />
      <vstack width="100%" height="100%">
        <hstack padding="medium">
          <icon
            name="back"
            color="#E3E1DE"
            size="medium"
            onPress={() => props.navigateBack('home')}
          ></icon>
          <spacer size="medium"></spacer>
          <vstack>
          <text size="large" color="#E3E1DE" weight="bold">
            Rules
          </text>
          </vstack>
        </hstack>
        <text
              color="#FF8232"
              weight="bold"
              alignment="middle center"
              width="100%"
            >
              How to play Snoo's Destiny?
            </text>
        <hstack width="100%" padding="medium" alignment="center middle">
          <zstack width="95%" height="100%" padding="medium" cornerRadius="small">
            <text wrap={true} color="white" style="body" size="small">Playing SnoosDestiny is pretty straightforward and so much fun! All you need to do is arrive everyday, read the quest and try to debunk it. You get infinite tries to answer correctly, but the time keeps on moving. When you answer correctly, you receive the points for the day. You can also ask our app to comment about your daily achievement. You can give suggestions for the storyline for next day. The best suggestion is taken everyday and a story is based out of it!</text>
          </zstack>
          <spacer size="medium"></spacer>
        </hstack>
      </vstack>
    </zstack>
  );
};

export default Rules;