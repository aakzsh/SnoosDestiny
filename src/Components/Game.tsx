import { Devvit, useInterval, useState } from "@devvit/public-api";

const Game = (props: any) => {

    const [question, setQuestion] = useState("Snoo found an old diary in the library of the mysterious stories sub-forum. On its pages, it read: ‘Gold and silver do not affect me, but I am valuable to those who seek answers. I am everywhere, but I am often invisible.' Snoo frowned, mulling over the words as the sound of commentary echoed through the room.’")
    const [hintText, setHintText] = useState("")
    const [hint1Rev, setHint1Rev] = useState(false);
    const [hint2Rev, setHint2Rev] = useState(false);
    // console.log(props.question)
    
    const [elapsedTime, setElapsedTime] = useState(0)

    const tick = () => setElapsedTime(prev => prev + 1)

    useInterval(tick, 1000).start()

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
            onPress={() => props.changeScreen('home')}
          ></icon>
          <spacer size="medium"></spacer>
          <text size="large" color="#E3E1DE" weight="bold">
            Chapter 1: {props.question.question}
          </text>
        </hstack>
        <hstack width="100%" padding="medium" alignment="center middle">
          <zstack width="60%" height="100%" padding="medium" cornerRadius="small" backgroundColor="#DCDCDC">
            <text wrap={true} color="#262322" style="body" size="small">{props.question.story}</text>
          </zstack>
          <spacer size="medium"></spacer>
          <vstack width="40%">
            <text size="xxlarge" weight="bold" alignment="center middle">TIME ELAPSED: {elapsedTime}s</text>
            <spacer size="medium"></spacer>
            <button size="large" appearance="success" onPress={props.submitAnswer}>
                ANSWER
            </button>
            <spacer size="medium"></spacer>
            <hstack alignment="center middle">
                <button size="small" disabled={hint1Rev} onPress={()=>{
                    setHintText(`Hint 1: ${props.question.hints[0]}`)
                    setHint1Rev(true)
                }} appearance="bordered">Hint 1</button>
                <spacer size="small"></spacer>
                <button size="small" disabled={hint2Rev} onPress={()=>{
                    setHintText(`Hint 1: ${props.question.hints[1]}`)
                    setHint2Rev(true)
                }} appearance="bordered">Hint 2</button>
            </hstack>
            <spacer size="medium"></spacer>
            <text alignment="center middle">{hintText}</text>
          </vstack>
        </hstack>
      </vstack>
    </zstack>
  );
};

export default Game;
