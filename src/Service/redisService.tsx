import type {
    Post,
    RedditAPIClient,
    RedisClient,
    Scheduler,
    ZRangeOptions,
  } from '@devvit/public-api';
  import { Devvit } from '@devvit/public-api';
  
  export class redisService {
    readonly redis: RedisClient;
    readonly reddit?: RedditAPIClient;
    readonly scheduler?: Scheduler;
  
    constructor(context: { redis: RedisClient; reddit?: RedditAPIClient; scheduler?: Scheduler }) {
      this.redis = context.redis;
      this.reddit = context.reddit;
      this.scheduler = context.scheduler;
    }
  
    
  
    async saveChapter(chapter: any): Promise<void> {
        console.log("called save")
        const today = new Date().toISOString().split('T')[0];
 
        const response = await this.redis.hSet(
            'chapters',
            {
              today: chapter
            }
        )

        console.log(response) 
    }

    async getTodaysChapter() {
        const today = new Date().toISOString().split('T')[0];
        
        const response = await this.redis.hGet('chapters', today)
        return response;
    }
  
}