
import moment from 'moment';

function Sidebar({ userData, className }) {
  if (!userData) return null;

  const duration = moment().diff(moment(userData.created_at), 'years');

  return (
    <aside className={`${className} p-4 bg-primary md:rounded-r-3xl`}>
      <div className="flex flex-col items-center">
        <img src={userData.avatar_url} alt="Avatar" className="w-32 h-32 rounded-full" />
        <h1 className="mt-4 text-xl font-bold">{userData.name}</h1>
        <h3 className="text-gray-600">@{userData.login}</h3>
        <div className="mt-8 text-center">
          <p>Followers: {userData.followers}</p>
          <p>Following: {userData.following}</p>
          <p>Public Repos: {userData.public_repos}</p>
        </div>
        <div className="mt-4 flex space-x-4">
          {userData.twitter_username && (
            <a href={`https://twitter.com/${userData.twitter_username}`} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
          )}
          {userData.blog && (
            <a href={userData.blog} target="_blank" rel="noopener noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
              </svg>
            </a>
          )}
        </div>
        <div className="mt-8 bg-accent rounded-full px-4 py-2 text-sm">
          Member since: {duration} years
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;