import * as React from 'react';
import { css } from 'styled-jsx/css';
import dayjs from 'dayjs';

type DatetimeProps = {
  label: string;
  date: string;
};

const styles = css`
  .date {
    font-size: 0.75rem;
    font-family: serif;
    color: #666666;
  }
  .date-label {
    margin-right: 0.5rem;
  }
`;

export function Datetime(props: DatetimeProps) {
  return (
    <>
      <style jsx>{styles}</style>
      <div className="date">
        <span className="date-label">{props.label}</span>
        <time dateTime={props.date}>{dayjs(props.date).format('YYYY年MM月DD日')}</time>
      </div>
    </>
  );
}
