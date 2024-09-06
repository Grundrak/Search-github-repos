import { useState, useEffect } from 'react';
import { fetchUserData, fetchUserRepos } from '../utils/api';

function useGitHubData(username) {
  const [userData, setUserData] = useState(null);
  const [reposData, setReposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const user = await fetchUserData(username);
        const repos = await fetchUserRepos(username);
        setUserData(user);
        setReposData(repos);
      } catch (err) {
        console.error('Error fetching GitHub data:', err);
        setError(err);
        // Reset data on error
        setUserData(null);
        setReposData([]);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchData();
    }
  }, [username]);

  return { userData, reposData, loading, error };
}

export default useGitHubData;