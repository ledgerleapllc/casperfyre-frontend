import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Table, useTable } from 'shared/components/partials/Table';
import { formatDate } from 'shared/core/utils';
import { getWallets } from 'stores/api/admin/actions';
import styles from './style.module.scss';

const WalletsHistoryTable = React.forwardRef(({ externalParams }, ref) => {
  const { data, register, hasMore, appendData, setHasMore, setPage, setParams, page, params, resetData } = useTable();

  const dispatch = useDispatch();

  useEffect(() => {
    if (externalParams) {
      resetData();
      setParams({ ...params, ...externalParams }, (s) => {
        fetchWalletsHistory(s, 1);
      });
    }
  }, [externalParams]);

  const handleSort = async (key, direction) => {
    setParams(
      {
        ...params,
        sort_key: key,
        sort_direction: direction,
      },
      (s) => {
        resetData();
        fetchWalletsHistory(s, 1);
      }
    );
  };

  const fetchWalletsHistory = (paramsValue = params, pageValue = page) => {
    dispatch(
      getWallets({ ...paramsValue, page: pageValue }, (res) => {
        setHasMore(res.hasMore);
        appendData(res.items || []);
        setPage((prev) => +prev + 1);
      })
    );
  };

  return (
    <Table
      {...register}
      styles={styles}
      onLoadMore={fetchWalletsHistory}
      hasMore={hasMore}
      dataLength={data.length}
      onSort={handleSort}
    >
      <Table.Header>
        <Table.HeaderCell>Status</Table.HeaderCell>
        <Table.HeaderCell>Created Date</Table.HeaderCell>
        <Table.HeaderCell>Inactive Date</Table.HeaderCell>
        <Table.HeaderCell>Deposit Address</Table.HeaderCell>
        <Table.HeaderCell>Balance</Table.HeaderCell>
      </Table.Header>
      <Table.Body className='table-body-card'>
        {data.map((data, idx) => (
          <Table.BodyRow key={idx} className='py-4'>
            <Table.BodyCell className={classNames(!data.active && 'text-primary')}>
              {data.active ? 'Active' : 'Old'}
            </Table.BodyCell>
            <Table.BodyCell>{formatDate(data.created_at)}</Table.BodyCell>
            <Table.BodyCell>{formatDate(data.inactive_at)}</Table.BodyCell>
            <Table.BodyCell>{data.address}</Table.BodyCell>
            <Table.BodyCell>{data.balance}</Table.BodyCell>
          </Table.BodyRow>
        ))}
      </Table.Body>
    </Table>
  );
});

export default WalletsHistoryTable;