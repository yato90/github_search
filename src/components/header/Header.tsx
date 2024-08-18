import React from 'react';
import { AppBar, Toolbar } from '@mui/material';
import SearchBar from '../search/SearchBar.tsx';
import styles from './Header.module.scss';

const Header: React.FC = () => {
  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <SearchBar />
      </Toolbar>
    </AppBar>
  );
};

export default Header;
