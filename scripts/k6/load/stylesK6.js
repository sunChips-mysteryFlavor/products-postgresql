import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '1m', target: 60 }, // simulate ramp-up of traffic from 1 to 60 users over 5 minutes.
    { duration: '2m', target: 60 }, // stay at 60 users for 10 minutes
    { duration: '0.7m', target: 100 }, // ramp-up to 100 users over 3 minutes (peak hour starts)
    { duration: '0.5m', target: 100 }, // stay at 100 users for short amount of time (peak hour)
    { duration: '0.7m', target: 60 }, // ramp-down to 60 users over 3 minutes (peak hour ends)
    { duration: '3m', target: 60 }, // continue at 60 for additional 10 minutes
    { duration: '1m', target: 0 }, // ramp-down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(99)<1500'], // 99% of requests must complete below 1.5s
  },
};

const BASE_URL = 'http://localhost:3000';

export default () => {
  const authHeaders = {
    headers: {
      authorization: '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',
    },
  };

  http.get(`${BASE_URL}/products/2/styles`, authHeaders).json();

  sleep(1);
};
