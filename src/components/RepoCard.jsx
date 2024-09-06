

function RepoCard({ repo }) {
  return (
    <div className="bg-primary rounded-xl p-4 shadow-md">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-semibold">{repo.name}</h3>
        <span className="bg-accent px-2 py-1 rounded-full text-xs">
          {repo.visibility}
        </span>
      </div>
      <p className="text-sm mb-2">{repo.description || 'No description provided.'}</p>
      <div className="flex justify-between items-center text-sm">
        <span>{repo.language}</span>
        <a href={repo.html_url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
          View on GitHub
        </a>
      </div>
    </div>
  );
}

export default RepoCard;