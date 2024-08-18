import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { fetchRepositories } from '../../store/slice/repoSlice';
import { RootState } from '../../store/store';
import styles from './RepoTable.module.scss'

const RepoTable: React.FC<{ onSelectRepo: (repo: any) => void }> = ({ onSelectRepo }) => {
  const { repositories, loading, error, pageInfo, searchTerm, cursorHistory, initialCursor } = useSelector((state: RootState) => state.repos);
  const dispatch = useDispatch();

  const handleNextPage = () => {
    if (pageInfo.hasNextPage) {
      dispatch(fetchRepositories({ searchTerm, after: pageInfo.endCursor }));
    }
  };
  const handlePreviousPage = () => {
    if (cursorHistory.length > 1) {
      const prevCursor = cursorHistory[cursorHistory.length - 2];
      if (pageInfo.hasPreviousPage && prevCursor) {
        dispatch(fetchRepositories({ searchTerm, before: prevCursor }));
      }
    }else if (initialCursor) {
      if (pageInfo.hasPreviousPage) {
        dispatch(fetchRepositories({ searchTerm, before: initialCursor }));
      }
    }
  };

  if (loading) return (
    <div className={styles.table_procces}>
      <div className={styles.table_procces_loading}>
        <h3>Загрузка...</h3>
      </div>
    </div>
  );
  if (error) return (
    <div className={styles.table_procces}>
      <div>Error: {error}</div>
    </div>
  );

  return (
    <div className={styles.table_search}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Название</TableCell>
            <TableCell>Язык</TableCell>
            <TableCell>Число форков</TableCell>
            <TableCell>Звезды</TableCell>
            <TableCell>Обновления</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {repositories.map((repo, index) => (
            <TableRow key={index} onClick={() => onSelectRepo(repo)}>
              <TableCell>{repo.name}</TableCell>
              <TableCell>{repo.primaryLanguage?.name}</TableCell>
              <TableCell>{repo.forkCount}</TableCell>
              <TableCell>{repo.stargazerCount}</TableCell>
              <TableCell>{new Date(repo.updatedAt).toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={styles.pagination_controls}>
        <Button 
            onClick={handlePreviousPage} 
            disabled={!pageInfo.hasPreviousPage || loading}
        >
          Назад
        </Button>
        <Button 
          onClick={handleNextPage} 
          disabled={!pageInfo.hasNextPage || loading}
        >
          Далее
        </Button>
      </div>
    </div>
  );
};

export default RepoTable;
