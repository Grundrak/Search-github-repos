
import ProfileInfo from './ProfileInfo';
import LanguageChart from './LanguageChart';
import RadarChart from './RadarChart';

function StatsSection({ userData, reposData }) {
  const languageCounts = reposData.reduce((acc, repo) => {
    if (repo.language) {
      acc[repo.language] = (acc[repo.language] || 0) + 1;
    }
    return acc;
  }, {});

  const totalRepos = reposData.length;
  const totalStars = reposData.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = reposData.reduce((sum, repo) => sum + repo.forks_count, 0);
  
  const mostPopularRepo = reposData.reduce((popular, repo) => 
    repo.stargazers_count > (popular?.stargazers_count || 0) ? repo : popular
  , null);

  const languagePercentages = Object.entries(languageCounts).map(([lang, count]) => ({
    language: lang,
    count: count,
    percentage: ((count / totalRepos) * 100).toFixed(2)
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      <ProfileInfo userData={userData} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-primary rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Repository Statistics</h3>
          <div className="space-y-2">
            <p className="text-3xl font-bold">{userData.public_repos}</p>
            <p className="text-sm text-gray-600">Public Repositories</p>
            <div className="flex justify-between mt-4">
              <div>
                <p className="text-xl font-semibold">{totalStars}</p>
                <p className="text-sm text-gray-600">Total Stars</p>
              </div>
              <div>
                <p className="text-xl font-semibold">{totalForks}</p>
                <p className="text-sm text-gray-600">Total Forks</p>
              </div>
            </div>
            {mostPopularRepo && (
              <div className="mt-4">
                <p className="text-sm font-semibold">Most Popular Repository:</p>
                <a 
                  href={mostPopularRepo.html_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {mostPopularRepo.name}
                </a>
                <p className="text-sm text-gray-600">
                  {mostPopularRepo.stargazers_count} stars
                </p>
              </div>
            )}
          </div>
        </div>
        <div className="bg-primary rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Language Distribution</h3>
          <div className="h-64">
            <LanguageChart languageCounts={languageCounts} />
          </div>
        </div>
        <div className="bg-primary rounded-xl p-6 shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Language Usage</h3>
          <div className="h-64">
            <RadarChart languageCounts={languageCounts} />
          </div>
        </div>
        <div className="bg-primary rounded-xl p-6 shadow-lg overflow-auto max-h-96">
          <h3 className="text-xl font-semibold mb-4">Detailed Language Breakdown</h3>
          <ul>
            {languagePercentages.map(({ language, count, percentage }) => (
              <li key={language} className="mb-2">
                <span className="font-semibold">{language}:</span> {count} repos ({percentage}%)
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;