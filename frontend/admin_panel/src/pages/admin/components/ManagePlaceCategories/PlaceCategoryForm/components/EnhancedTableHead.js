import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

const rows = [
  { id: 'allowMessages', numeric: false, disablePadding: false, label: 'Allow Messages?' },
  { id: 'shouldAddPairedUsers', numeric: false, disablePadding: false, label: 'Add paired users contacts?' },
  { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
  { id: 'businessCategories', numeric: false, disablePadding: false, label: 'BusinessCategories' },
  { id: 'layoutItems', numeric: false, disablePadding: false, label: 'LayoutItems' },
];

export const EnhancedTableHead = () => (
  <TableHead>
    <TableRow>
      <TableCell padding="checkbox">
        Is Multisync?
        </TableCell>
      {rows.map(
        row => (
          <TableCell
            key={row.id}
            align={row.numeric ? 'right' : 'left'}
            padding={row.disablePadding ? 'none' : 'default'}
          >
            {row.label}
          </TableCell>
        ),
        this,
      )}
    </TableRow>
  </TableHead>
);

EnhancedTableHead.propTypes = {
  rowCount: PropTypes.number.isRequired,
};
