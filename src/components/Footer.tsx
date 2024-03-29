import * as React from 'react';
import { css } from 'styled-jsx/css';

import { config } from '../config';
import { Link } from '../components/Link';
import { data as sitemapData } from '../pages/sitemap';

const styles = css`
  .footer {
    padding: 28px;
    text-align: center;
    color: #666;
  }
  .copyright {
    font-size: 0.75rem;
  }
  .link-list {
    font-size: 0.75rem;
  }
  .link-list-item {
    display: inline-block;
  }
`;

export function Footer() {
  return (
    <>
      <style jsx>{styles}</style>
      <footer className="footer">
        <ul className="link-list">
          <li className="link-list-item">
            <Link to="/sitemap">{sitemapData.title}</Link>
          </li>
        </ul>
        <small className="copyright">&copy; 2020 {config.name} All rights reserved.</small>
      </footer>
    </>
  );
}
