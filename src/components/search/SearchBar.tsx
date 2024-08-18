import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchRepositories } from '../../store/slice/repoSlice';
import { TextField, Button } from '@mui/material';
import styles from './Search.module.scss';

const SearchBar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const dispatch = useDispatch();

    const handleSearch = () => {
        if (searchTerm.trim() !== '') {
          dispatch(fetchRepositories({ searchTerm }));
        } else {
          alert('Введите поисковый запрос.');
        }
    };

    return (
        <div className={styles.search}>
        <TextField
            label="Поиск репозитория"
            variant="filled"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>
            Search
        </Button>
        </div>
    );
};

export default SearchBar;
