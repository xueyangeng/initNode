import Redis from 'ioredis';
import { config } from '../config';

export const keyGen = (namespace: string, key: string) => `${namespace}|${key}`;

export const redis = new Redis(config.redisOpt);
