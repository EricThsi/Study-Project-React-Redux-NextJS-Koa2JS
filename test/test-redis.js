const Redis = require('ioredis');

const redis = new Redis();

(async () => {
  const keys = await redis.keys('*');
  console.log(keys);
})();
