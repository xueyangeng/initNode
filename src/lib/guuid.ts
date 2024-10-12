import FlakeId from 'flake-idgen';
import { getLogger } from '../extend/ctx.logger';

const flakeNode = new FlakeId({
  epoch: 1300000000000,
  id: Math.floor(Math.random() * (1024 + 1)),
});

const logger = getLogger('Guuid');

export default function guuid() {
  const value = BigInt(`0x${flakeNode.next().toString('hex')}`).toString(10);
  logger.info('GET', value);
  return value;
}
