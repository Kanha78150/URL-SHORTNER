import URLForm from "../components/URLForm";
import UserURL from "../components/UserURL";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Shortly</h1>
          <p className="text-gray-600">
            Transform long URLs into short, shareable links
          </p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6">
          <URLForm />
          <UserURL />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
