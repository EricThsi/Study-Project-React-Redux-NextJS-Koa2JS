const getRedisSessionId = (sid) => {
  return `sid:${sid}`;
};

class RedisSessionStore {
  constructor(client) {
    this.client = client;
  }

  //  get session from redis
  async get(sid) {
    console.log('get session', sid);
    const id = getRedisSessionId(sid);
    const data = await this.client.get(id);

    if (!data) {
      return null;
    }

    try {
      const result = JSON.parse(data);
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  // store session to redis
  async set(sid, sess, ttl) {
    console.log('set session', sid);
    const id = getRedisSessionId(sid);

    if (typeof ttl === 'number') {
      ttl = Math.ceil(ttl / 1000);
    }

    try {
      const sessStr = JSON.stringify(sess);

      if (ttl) {
        await this.client.setex(id, ttl, sessStr);
      } else {
        await this.client.set(id, sessStr);
      }
    } catch (err) {
      console.error(err);
    }
  }

  // destroy session
  async destroy(sid) {
    console.log('destroy session', sid);
    const id = getRedisSessionId(sid);
    await this.client.del(id);
  }
}

module.exports = RedisSessionStore;
