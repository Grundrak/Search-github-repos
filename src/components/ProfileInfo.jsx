
function ProfileInfo({ userData }) {
  return (
    <div className="bg-primary rounded-xl p-6">
      <div className="flex items-center space-x-6 mb-4">
        <img src={userData.avatar_url} alt="Avatar" className="w-24 h-24 rounded-full" />
        <div>
          <h2 className="text-2xl font-bold">{userData.name}</h2>
          <p className="text-gray-600">@{userData.login}</p>
        </div>
      </div>
      <p className="mb-2">{userData.bio}</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div>
          <p><strong>Location:</strong> {userData.location || 'Not specified'}</p>
          <p><strong>Company:</strong> {userData.company || 'Not specified'}</p>
          <p><strong>Public Repos:</strong> {userData.public_repos}</p>
        </div>
        <div>
          <p><strong>Followers:</strong> {userData.followers}</p>
          <p><strong>Following:</strong> {userData.following}</p>
          <p><strong>Created:</strong> {new Date(userData.created_at).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileInfo;