import * as React from 'react';
import Pagination from '@mui/material/Pagination';

export default function BasicPagination(props) {
  const { ukupanBrojStranica, postaviStranicu } = props;

  const handlePageChange = (event, value) => {
    postaviStranicu(value);
  };

  return <Pagination count={ukupanBrojStranica} onChange={handlePageChange} />;
}
