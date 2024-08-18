import React, { useState } from 'react';
import Header from './components/header/Header';
import RepoTable from './components/repoTable/RepoTable';
import RepoDetails from './components/repoDetails/RepoDetails';

const App: React.FC = () => {
  const [selectedRepo, setSelectedRepo] = useState<any>(null);

  return (
    <div>
      <Header />
      <main>
        <RepoTable onSelectRepo={setSelectedRepo} />
        <RepoDetails repo={selectedRepo } />
      </main>
    </div>
  );
};

export default App;
