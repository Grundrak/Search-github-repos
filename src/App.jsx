import  { useState, useCallback } from 'react';
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import SearchBar from "./components/SearchBar";
import useGitHubData from "./hooks/useGitHubData";

function App() {
  const [username, setUsername] = useState("Grundrak");
  const { userData, reposData, loading, error } = useGitHubData(username);

  const handleSetUsername = useCallback((newUsername) => {
    setUsername(newUsername || "Grundrak");
  }, []);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-secondary">
      <Sidebar userData={userData} className="w-full md:w-1/4 lg:w-1/5" />
      <main className="flex-1 p-4 md:p-8 overflow-auto">
        <h1 className="text-3xl font-bold mb-4 text-center">GitHub Insights</h1>
        <SearchBar
          setUsername={handleSetUsername}
          className="mb-8 max-w-2xl mx-auto"
        />{" "}
        <MainContent
          userData={userData}
          reposData={reposData}
          loading={loading}
          error={error}
        />
      </main>
    </div>
  );
}

export default App;
