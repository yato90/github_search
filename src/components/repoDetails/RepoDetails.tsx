// src/components/RepoDetails.tsx
import React from 'react';
import { Chip, Container, Typography } from '@mui/material';
import { RepoDetailsProps } from '../../types/type.ts';
import styles from './RepoDetails.module.scss';

const RepoDetails: React.FC<RepoDetailsProps> = ({ repo }) => {
  if (!repo) {
    return (
      <div className={styles.repo_null}>
        <Container>
          <Typography variant="h6">Выберите репозиторий</Typography>
        </Container>
      </div>
    );
  }
  return (
    <div className={styles.repo_container}>
      <Container>
      <Typography variant="h3">{repo.name}</Typography>
      <div className={styles.repo_info}>
        <Chip label={repo.primaryLanguage?.name} color="primary"></Chip>
        <div>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 17.77L18.18 21.5L16.54 14.47L22 9.74L14.81 9.13L12 2.5L9.19 9.13L2 9.74L7.46 14.47L5.82 21.5L12 17.77Z" fill="#FFB400" />
          </svg>
          {repo.stargazerCount}
        </div>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
        {repo.languages.nodes.map((language, index) => (
          <Chip key={index} label={language.name} />
        ))}
      </div>
      <Typography variant="body2">License: {repo.licenseInfo?.name || 'None'}</Typography>
    </Container>
    </div>
  );
};

export default RepoDetails;
