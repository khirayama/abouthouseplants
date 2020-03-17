import * as React from 'react';
import css from 'styled-jsx/css';

const tableStyles = css`
  .remark-table {
    width: 100%;
    border-collapse: collapse;
    margin: 16px 0 36px;
  }
`;

type RemarkTableProps = {
  children: React.ReactNode;
};

export function RemarkTable(props: RemarkTableProps) {
  return (
    <>
      <style jsx>{tableStyles}</style>
      <table className="remark-table">{props.children}</table>
    </>
  );
}

const tableHeadStyles = css`
  .remark-table-head {
  }
`;

type RemarkTableHeadProps = {
  children: React.ReactNode;
};

export function RemarkTableHead(props: RemarkTableHeadProps) {
  return (
    <>
      <style jsx>{tableHeadStyles}</style>
      <thead className="remark-table-head">{props.children}</thead>
    </>
  );
}

const tableBodyStyles = css`
  .remark-table-body {
  }
`;

type RemarkTableBodyProps = {
  children: React.ReactNode;
};

export function RemarkTableBody(props: RemarkTableBodyProps) {
  return (
    <>
      <style jsx>{tableBodyStyles}</style>
      <tbody className="remark-table-body">{props.children}</tbody>
    </>
  );
}

const tableRowStyles = css`
  .remark-table-row {
  }
`;

type RemarkTableRowProps = {
  children: React.ReactNode;
};

export function RemarkTableRow(props: RemarkTableRowProps) {
  return (
    <>
      <style jsx>{tableRowStyles}</style>
      <tr className="remark-table-row">{props.children}</tr>
    </>
  );
}

const tableDataStyles = css`
  .remark-table-data {
    border: solid 1px #666666;
    padding: 4px 8px;
  }
`;

type RemarkTableDataProps = {
  children: React.ReactNode;
};

export function RemarkTableData(props: RemarkTableDataProps) {
  return (
    <>
      <style jsx>{tableDataStyles}</style>
      <td className="remark-table-data">{props.children}</td>
    </>
  );
}

const tableHeaderStyles = css`
  .remark-table-header {
    border: solid 1px #666666;
    border-bottom: double 3px #666666;
    padding: 4px 8px;
  }
`;

type RemarkTableHeaderProps = {
  children: React.ReactNode;
};

export function RemarkTableHeader(props: RemarkTableHeaderProps) {
  return (
    <>
      <style jsx>{tableHeaderStyles}</style>
      <th className="remark-table-header">{props.children}</th>
    </>
  );
}
