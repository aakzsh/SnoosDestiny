import type {
    Post,
    RedditAPIClient,
    RedisClient,
    Scheduler,
    ZRangeOptions,
  } from '@devvit/public-api';
  
  export class redisService {
    readonly redis: RedisClient;
    readonly reddit?: RedditAPIClient;
    readonly scheduler?: Scheduler;
  
    constructor(context: { redis: RedisClient; reddit?: RedditAPIClient; scheduler?: Scheduler }) {
      this.redis = context.redis;
      this.reddit = context.reddit;
      this.scheduler = context.scheduler;
    }
  
    async saveChapter(chapter: any, username: string): Promise<void> {
        console.log("called save")
        const today = new Date().toISOString().split('T')[0];
        // const today ="2024-12-11"
        chapter["username"] = username
        let stringChapter = JSON.stringify(chapter);
        const response2 = await this.redis.hSet('chapters', {[today] : stringChapter});
    }

    async getTodaysChapter() {
        const today = new Date().toISOString().split('T')[0];
        // const today ="2024-12-11"
        // console.log(today);
        let response = await this.redis.hGet('chapters', today);
        if (response)
        {
            response = JSON.parse(response)
        }
        else
        {
            return null; 
        }
        return response;
    }

    async getAllChapters() {
        // await this.redis.hDel('chapters', ["2024-12-16"])
        const response = await this.redis.hGetAll('chapters');
        return response;
    }

    async saveOrUpdateScore(username: string): Promise<void> {
        const currentScore = await this.redis.hGet("scores", username);
        if (currentScore) {
          const score = parseInt(currentScore) + 1;
          await this.redis.hSet("scores", {[username]: score.toString()});
        } else {
          await this.redis.hSet("scores", { [username]: "1" });
        }
      }

      async getAllScores(): Promise<{ [key: string]: string }> {
        return await this.redis.hGetAll("scores");
      }
  
}