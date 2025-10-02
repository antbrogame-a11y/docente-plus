const fs = require('fs');
const path = require('path');

const LIMITS = {
  perDay: 150,
  perMinute: 10,
};
const USAGE_FILE = path.resolve(__dirname, 'deepseek_usage.json');
const BACKUP_FILE = path.resolve(__dirname, 'deepseek_usage.backup.json');

class RateLimiter {
  constructor() {
    this.usage = { requests: [] };
    this._loadUsage();
  }

  _loadUsage() {
    try {
      if (fs.existsSync(USAGE_FILE)) {
        this.usage = JSON.parse(fs.readFileSync(USAGE_FILE, 'utf8'));
      }
    } catch (err) {
      if (fs.existsSync(BACKUP_FILE)) {
        this.usage = JSON.parse(fs.readFileSync(BACKUP_FILE, 'utf8'));
      }
    }
  }

  _saveUsage() {
    fs.writeFileSync(USAGE_FILE, JSON.stringify(this.usage, null, 2));
    fs.copyFileSync(USAGE_FILE, BACKUP_FILE);
  }

  _now() { return Date.now(); }

  _prune() {
    const now = this._now();
    this.usage.requests = this.usage.requests.filter(ts => now - ts < 24 * 60 * 60 * 1000);
  }

  can_make_request() {
    this._prune();
    const now = this._now();
    const lastMinute = now - 60 * 1000;
    const lastDay = now - 24 * 60 * 60 * 1000;
    const minuteCount = this.usage.requests.filter(ts => ts > lastMinute).length;
    const dayCount = this.usage.requests.filter(ts => ts > lastDay).length;
    return minuteCount < LIMITS.perMinute && dayCount < LIMITS.perDay;
  }

  record_request() {
    this.usage.requests.push(this._now());
    this._saveUsage();
  }

  get_usage_stats() {
    this._prune();
    const now = this._now();
    const lastMinute = now - 60 * 1000;
    const lastDay = now - 24 * 60 * 60 * 1000;
    return {
      minute: this.usage.requests.filter(ts => ts > lastMinute).length,
      day: this.usage.requests.filter(ts => ts > lastDay).length,
      total: this.usage.requests.length,
      limitDay: LIMITS.perDay,
      limitMinute: LIMITS.perMinute,
    };
  }
}

function logRequest(stats) {
  console.log(
    `[DeepSeek API] Request: minute=${stats.minute}/${stats.limitMinute}, day=${stats.day}/${stats.limitDay}, total=${stats.total}`
  );
}

function rateLimitedApiCall(fn) {
  const limiter = new RateLimiter();
  return async function (...args) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      if (!limiter.can_make_request()) {
        logRequest(limiter.get_usage_stats());
        throw new Error('Rate limit exceeded. Retry later.');
      }
      try {
        limiter.record_request();
        logRequest(limiter.get_usage_stats());
        return await fn(...args);
      } catch (err) {
        if (attempt === 3) throw err;
        await new Promise(res => setTimeout(res, 2000));
      }
    }
  };
}

module.exports = {
  RateLimiter,
  rateLimitedApiCall,
};
