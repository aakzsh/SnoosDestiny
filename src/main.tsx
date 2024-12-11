import { Devvit, useState } from '@devvit/public-api';

Devvit.configure({
  http: true,
});

Devvit.addSettings([
  {
    name: 'open-ai-api-key',
    label: 'Open AI API key',
    type: 'string',
    isSecret: true,
    scope: 'app',
  },
]);

async function fetchResponse(context: Devvit.Context): Promise<string> {
  try {
    // const apiKey = "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"

    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1', {
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${apiKey}`,
      },
      method: 'GET',
    });

    const json = await res.json();

    return json?.title?.length > 0 ? json?.title : 'No response';
  } catch (e: any) {
    console.log('Fetch error ', e);
    return e.toString();
  }
}

Devvit.addCustomPostType({
  name: 'Devvit - Ask GPT',
  render: (context) => {
    const [answer, setAnswer] = useState<string>('');

    async function onPress() {
      const response = await fetchResponse(context);
      setAnswer(response || 'No Response');
    }

    return (
      <blocks height="tall">
        <vstack alignment="center middle" height="100%" gap="large">
          <button appearance="primary" onPress={onPress}>
            {'Ask GPT'}
          </button>
          <text wrap>{answer}</text>
        </vstack>
      </blocks>
    );
  },
});

export default Devvit;