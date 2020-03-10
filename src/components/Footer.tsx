import * as React from 'react';
import css from 'styled-jsx/css';

import { config } from '../config';

const styles = css`
  .footer {
    padding: 28px;
    text-align: center;
  }
  .copyright {
    font-size: 0.75rem;
  }
`;

export function Footer() {
  return (
    <>
      <style jsx>{styles}</style>
      <footer className="footer">
        <small className="copyright">&copy; 2020 {config.name} All rights reserved.</small>
      </footer>
    </>
  );
}
