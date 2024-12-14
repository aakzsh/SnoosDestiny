// declare var process : {
//     env: {
//         GEMINI_API_KEY: string
//     }
//   }

const generateStory = async () => {
    const apiKey = "API_KEY"
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="+apiKey,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: 'Create a very short simple and predictable random story under 60 words about a character Snoo and relate with life like a riddle. At the end of the story, add a small question that readers need to guess, the answer would be a single word. Provide the correct answer and include two helpful hints. Format the response as JSON:\n{\n  "question": "The question?",\n "story": "a background story",\n  "answer": "The correct answer",\n  "hints": ["Hint 1", "Hint 2"]\n}',
              },
            ],
          },
        ],
      }),
    }
  );

  let parsedStory;

  // Try parsing the response, fallback to a hardcoded example in case of errors
  try {

    // comment the below line in live release, uncomment to avoid unnecessary API HITS
    throw new Error('Forced error for testing');
    const responseData = await response.json();

    // Extract the text containing the JSON story from the response
    const rawText = responseData.candidates[0].content.parts[0].text;

    // Parse the raw text which contains a JSON string
    console.log("raw: ", rawText)
    parsedStory = JSON.parse(rawText.replace(/```json|```/g, "")); // Remove code block markers
    return parsedStory;
  } catch (error) {
    console.error(
      "Failed to parse API response, falling back to hardcoded example:",
      error
    );

    // Hardcoded fallback story
    parsedStory = {
      question: "What guided Snoo on his journey?",
      story:
        "Snoo, a fluffy, purple creature with antennae that twitched with cosmic energy, wandered the Whispering Woods. Each leaf whispered a riddle, each shadow held a clue, but Snoo followed not the rustling leaves nor the dancing shadows. He journeyed toward the shimmering, ever-shifting aurora borealis that painted the night sky in hues unknown to mortal eyes. It called to him, a silent song only his antennae could decipher, leading him to the Crystal Cave where the ancient Star-Shaper slept. Snoo's journey was not guided by logic, nor by sight, but by a force far older than the woods themselves.",
      answer: "Intuition",
      hints: ["It's an inner feeling.", "It's not a map, or a signpost."],
    };
    return parsedStory;
  }
};

export default generateStory;
