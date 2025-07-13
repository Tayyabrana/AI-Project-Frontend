import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const PaginationComponent = ({ currentPage, totalItems, itemsPerPage, onPageChange }) => {
    const pageCount = Math.ceil(totalItems / itemsPerPage);

    const handleChange = (event, value) => {
        onPageChange(value);
    };

    return (
        <Stack spacing={2} alignItems="center" className='my-6' sx={{ marginTop: 3 }}>
            <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChange}
                variant="outlined"
                shape="rounded"
            />
        </Stack>
    );
};

export default PaginationComponent;
