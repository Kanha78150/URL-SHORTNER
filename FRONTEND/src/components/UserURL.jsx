import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserUrlsAPI } from "../api/user.api";
import { Link } from "@tanstack/react-router";

const UserURL = () => {
  const [copiedId, setCopiedId] = useState(null);

  const {
    data: urls,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userUrls"],
    queryFn: getUserUrlsAPI,
    refetchInterval: 30000,
    staleTime: 0,
  });

  const handleCopy = (url, id) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="text-red-600 mb-4">Failed to fetch URLs</div>
        <button
          onClick={() => refetch()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!urls.urls || urls.urls.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">No URLs created yet</div>
        <p className="text-sm text-gray-400">
          Start by creating your first short URL!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My URLs</h2>
        <span className="text-sm text-gray-500">{urls.length} URLs</span>
      </div>

      <div className="space-y-3">
        {urls.urls.reverse().map((url) => (
          <div
            key={url._id}
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="space-y-3">
              {/* Original URL */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Original URL
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <p
                    className="text-sm text-gray-800 truncate flex-1"
                    title={url.originalUrl}
                  >
                    {url.originalUrl}
                  </p>
                  <button
                    onClick={() =>
                      handleCopy(url.originalUrl, `orig-${url._id}`)
                    }
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Copy original URL"
                  >
                    {copiedId === `orig-${url._id}` ? (
                      <svg
                        className="w-4 h-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        ></path>
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Short URL */}
              <div>
                <label className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                  Short URL
                </label>
                <div className="flex items-center space-x-2 mt-1">
                  <Link
                    to={`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/${url.shortUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm flex-1 truncate"
                  >
                    {`${import.meta.env.VITE_API_URL || "http://localhost:5000"}/${url.shortUrl}`}
                  </Link>
                  <button
                    onClick={() =>
                      handleCopy(
                        `${import.meta.env.VITE_API_URL || "http://localhost:5000"}/${url.shortUrl}`,
                        `short-${url._id}`
                      )
                    }
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded transition-colors"
                  >
                    {copiedId === `short-${url._id}` ? "Copied!" : "Copy"}
                  </button>
                </div>
              </div>

              {/* Stats */}
              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                    {url.clicks} clicks
                  </span>
                  <span className="flex items-center">
                    <svg
                      className="w-4 h-4 mr-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      ></path>
                    </svg>
                    {formatDate(url.createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserURL;
