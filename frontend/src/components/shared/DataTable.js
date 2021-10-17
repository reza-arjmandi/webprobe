import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import Title from '../shared/Title';
import MediaControls from './MediaControls';

export default function DataTable(props) {
  const {
    title,
    table_head,
    table_rows,
    media_dispatch,
    media_states
  } = props;

  return (
    <Paper sx={{ p: 2 }} >
      <Title>{title}</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            {table_head.map((label) => {
              return (<TableCell>{label}</TableCell>)
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {table_rows.map((row) => {
            return (
              <TableRow>
                {
                  row.map((value) => {
                    return (
                      <TableCell align="center">{value}</TableCell>
                    )
                  })
                }
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
      <MediaControls
        {...media_dispatch}
        {...media_states}
      />
    </Paper>
  );
}
