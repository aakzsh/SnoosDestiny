import { Devvit, useAsync } from "@devvit/public-api";
import type { Context } from '@devvit/public-api';
import { redisService } from "../Service/redisService.js";

const Chapters = (props: any, context: Context) => {
  const service = new redisService(context);

  // Get today's date
  const today = new Date().toISOString().split('T')[0];

  // Use `useAsync` to fetch chapters and handle state updates
  const { data, loading, error } = useAsync(async () => {
    const emptyChapter = { hints: [], question: "", story: "" };

    try {
      const response = await service.getAllChapters();
      console.log(response)
      const chapterKeys = Object.keys(response).sort((a, b) => new Date(b).getTime() - new Date(a).getTime());
      const todayIndex = chapterKeys.indexOf(today);

      // Determine default chapter
      const currentIndex = todayIndex !== -1 ? todayIndex : 0;
      const currentChapterKey = chapterKeys[currentIndex];
      const currentChapter = currentChapterKey ? JSON.parse(response[currentChapterKey]) : emptyChapter;

      return {
        chapters: response,
        chapterKeys,
        currentIndex,
        currentChapterKey,
        currentChapter
      };
    } catch (err) {
      console.error("Error loading chapters", err);
      return {
        chapters: {},
        chapterKeys: [],
        currentIndex: 0,
        currentChapterKey: "",
        currentChapter: emptyChapter
      };
    }
  });

  if (loading) {
    return (
      <text size="medium" alignment="center middle">
        {"Loading chapters..."}
      </text>
    );
  }

  if (error) {
    return (
      <text size="medium" alignment="center middle" color="red">
        {"Error loading chapters."}
      </text>
    );
  }

  if (!data) {
    return (
      <text size="medium" alignment="center middle">
        {"No chapters available."}
      </text>
    );
  }

  const { chapters, chapterKeys, currentIndex, currentChapterKey, currentChapter } = data;

  // Handlers for navigation
  const showPrevious = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      const newChapterKey = chapterKeys[newIndex];
      const newChapter = JSON.parse(chapters[newChapterKey]);
      data.currentIndex = newIndex;
      data.currentChapterKey = newChapterKey;
      data.currentChapter = newChapter;
    }
  };

  const showNext = () => {
    if (currentIndex < chapterKeys.length - 1) {
      const newIndex = currentIndex + 1;
      const newChapterKey = chapterKeys[newIndex];
      const newChapter = JSON.parse(chapters[newChapterKey]);
      data.currentIndex = newIndex;
      data.currentChapterKey = newChapterKey;
      data.currentChapter = newChapter;
    }
  };

  return (
    <zstack width="100%" height="100%">
      <vstack padding="small">
        <text size="xxlarge" weight="bold" color="white">
          {"Chapters"}
        </text>

        {currentChapter ? (
          <vstack width="100%" height="100%" padding="medium">
            <text size="large" weight="bold" alignment="center middle">
              {`Date: ${currentChapterKey}`}
            </text>
            <text size="medium" alignment="center middle">
              {currentChapter.story}
            </text>

            <text size="medium" weight="bold" color="white">
              {"Question: "}{currentChapter.question}
            </text>
            <text size="small" color="gray">
              {"Hints: "}{currentChapter.hints.join(", ")}
            </text>

            <hstack padding="medium">
              <button
                onPress={showPrevious}
                disabled={currentIndex === 0}
              >
                Previous
              </button>
              <button
                onPress={showNext}
                disabled={currentIndex === chapterKeys.length - 1}
              >
                Next
              </button>
            </hstack>
          </vstack>
        ) : (
          <text size="medium" alignment="center middle">
            {"No chapters available."}
          </text>
        )}
      </vstack>
    </zstack>
  );
};

export default Chapters;
