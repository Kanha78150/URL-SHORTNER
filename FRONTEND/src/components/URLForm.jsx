import { useState } from "react";
import { createShortURL } from "../api/shortUrl.api";
import { useSelector } from "react-redux";
import { queryClient } from "../main";

const URLForm = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [customSlug, setCustomSlug] = useState("");
  const { isAuthenticated } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLoading) return; // Prevent double submission
    setShortUrl("");
    setIsLoading(true);
    setError("");
    try {
      const shortURL = await createShortURL(url, customSlug);
      setShortUrl(shortURL);
      queryClient.invalidateQueries({
        queryKey: ["userUrls"],
      });
    } catch (error) {
      setIsLoading(false);
      setError(error || "Something went wrong. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  const handelButtonClick = (e) => {
    e.preventDefault();
    if (url && !isLoading) {
      handleSubmit(e);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(shortUrl);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  const handleReset = () => {
    setUrl("");
    setShortUrl("");
    setCopied(false);
    setError("");
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="url"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Enter your URL
        </label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://example.com/very-long-url"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}
      {isAuthenticated && (
        <div>
          <label
            htmlFor="slug"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Custom URL (Optional)
          </label>
          <input
            type="text"
            id="customSlug"
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            placeholder="Enter custom slug"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          />
        </div>
      )}

      <button
        type="submit"
        onClick={handelButtonClick}
        disabled={isLoading || !url}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Shortening...
          </>
        ) : (
          "Shortly"
        )}
      </button>
      {shortUrl && (
        <div className="space-y-4 pt-4 border-t border-gray-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Your Shortly URL
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={shortUrl}
                readOnly
                className="flex-1 px-4 py-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-800 focus:outline-none"
              />
              <button
                onClick={handleCopy}
                className="px-4 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200 flex items-center"
              >
                {copied ? (
                  <>
                    <svg
                      className="w-5 h-5 mr-1"
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
                    Copied!
                  </>
                ) : (
                  <>
                    <svg
                      className="w-5 h-5 mr-1"
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
                    Copy
                  </>
                )}
              </button>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            Shortly Another URL
          </button>
        </div>
      )}
    </form>
  );
};
export default URLForm;
