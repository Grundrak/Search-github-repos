import  { useState } from 'react';
import RepoList from './RepoList';
import StatsSection from './StatsSection';
import BackToTopButton from './BackToTopButton';

function MainContent({ userData, reposData, loading, error }) {
  const [showStats, setShowStats] = useState(false);

  return (
    <div className="relative">
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {!loading && !error && (
        <>
          {showStats ? (
            <StatsSection userData={userData} reposData={reposData} />
          ) : (
            <RepoList reposData={reposData} />
          )}
        </>
      )}
      <div className="fixed bottom-5 right-5 flex gap-2">
        <BackToTopButton />
        <button
          onClick={() => setShowStats(!showStats)}
          className="bg-primary text-black px-4 py-2 rounded-full hover:bg-accent transition-colors"
        >
          {showStats ? 'Show Repos' : 'Profile Insights'}
        </button>
      </div>
    </div>
  );
}

export default MainContent;