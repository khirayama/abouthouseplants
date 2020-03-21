import * as fs from 'fs';
import * as path from 'path';

import { config } from '../config';

export function generateRobotsTxt(): string {
  return `User-Agent:*
Disallow:
Sitemap:${config.host}/sitemap.xml`;
}

export function saveRobotsTxt(RobotsTxt: string) {
  fs.writeFileSync(path.join(process.cwd(), 'public', 'robots.txt'), RobotsTxt);
}
