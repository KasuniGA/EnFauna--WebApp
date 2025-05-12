import React, { useEffect, useState } from "react";
import { useArticleStore } from "../store/article.js";

const EnFaunaApp = () => {
  const { fetchArticles, articles } = useArticleStore();
  const [selectedArticle, setSelectedArticle] = useState(null);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  // Group articles for the layout
  const featuredArticle = articles.length > 0 ? articles[0] : null;
  const popularArticles = articles.slice(1, 4);
  const latestArticles = articles.slice(4);

  // Handler for article clicks
  const handleArticleClick = (article) => {
    setSelectedArticle(article);
    window.scrollTo(0, 0);
  };

  // Close article view and return to main page
  const handleBackClick = () => {
    setSelectedArticle(null);
  };

  // Full article view component
  const ArticleView = ({ article }) => {
    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-300 via-green-200 to-teal-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-700 py-16 px-4 md:px-16">
        <button
          onClick={handleBackClick}
          className="mb-6 flex items-center px-4 py-2 bg-green-600 text-white font-medium rounded-lg shadow-md hover:bg-green-700 transition-all duration-200 dark:bg-green-500 dark:hover:bg-green-400"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 mr-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Articles
        </button>

        <div className="max-w-4xl mx-auto">
          <img
            src={article.image}
            alt={article.title}
            className="w-full h-96 object-cover rounded-lg shadow-md"
          />

          <div className="mt-6">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              {new Date(article.createdAt).toLocaleDateString()}
            </span>
            <h1 className="text-3xl font-bold my-2 text-gray-800 dark:text-white">
              {article.title}
            </h1>

            <div className="prose max-w-none mt-6 text-gray-700 dark:text-gray-300">
              <p>{article.description}</p>
              <div className="mt-4">
                {/* This would contain the full article content */}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // If an article is selected, show the full article view
  if (selectedArticle) {
    return <ArticleView article={selectedArticle} />;
  }

  // Main page view
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-800">
      {/* Hero Section */}
      <section className="relative">
        <div className="w-full h-screen overflow-hidden relative">
          <img
            src="https://images.pexels.com/photos/31952499/pexels-photo-31952499/free-photo-of-aerial-view-of-african-elephant-in-zambian-wetlands.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="Wildlife conservation"
            className="w-full h-full object-cover brightness-75"
          />
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Utilizing Technology to Support Wildlife Conservation
            </h1>
            <p className="text-xl text-white mb-6 max-w-2xl">
              Innovative approaches for biodiversity monitoring and protection
            </p>
            <div className="flex items-center bg-white/50 dark:bg-black/60 rounded-full p-1 w-full max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                className="flex-grow p-2 rounded-full focus:outline-none bg-white/60 dark:bg-black/30"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white p-2 rounded-full">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-8 px-4 md:px-16 bg-white dark:bg-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Popular Articles
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {featuredArticle && (
              <div
                className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800 cursor-pointer transition-transform hover:scale-[1.01]"
                onClick={() => handleArticleClick(featuredArticle)}
              >
                <img
                  src={featuredArticle.image}
                  alt={featuredArticle.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date(featuredArticle.createdAt).toLocaleDateString()}
                  </span>
                  <h3 className="text-xl font-bold my-2 text-gray-500 dark:text-gray-300">
                    {featuredArticle.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    {featuredArticle.description.length > 150
                      ? `${featuredArticle.description.substring(0, 150)}...`
                      : featuredArticle.description}
                  </p>
                  <div className="mt-4 flex justify-end">
                    <span className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 flex items-center">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-4">
            {popularArticles.map((article) => (
              <div
                key={article._id}
                className="flex gap-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800 cursor-pointer transition-transform hover:scale-[1.01]"
                onClick={() => handleArticleClick(article)}
              >
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-1">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    {new Date(article.createdAt).toLocaleDateString()}
                  </span>
                  <h3 className="font-bold text-gray-500 dark:text-gray-300">
                    {article.title}
                  </h3>
                  <div className="mt-2 flex justify-end">
                    <span className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm flex items-center">
                      Read more
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-8 px-4 md:px-16 bg-green-50 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
          Latest Articles
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {latestArticles.map((article) => (
            <div
              key={article._id}
              className="rounded-lg shadow-md overflow-hidden bg-white dark:bg-gray-700 cursor-pointer transition-transform hover:scale-[1.01]"
              onClick={() => handleArticleClick(article)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <span className="text-sm text-gray-500 dark:text-gray-300">
                  {new Date(article.createdAt).toLocaleDateString()}
                </span>
                <h3 className="text-lg font-bold my-2 text-black dark:text-white">
                  {article.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  {article.description.length > 100
                    ? `${article.description.substring(0, 100)}...`
                    : article.description}
                </p>
                <div className="mt-4 flex justify-end">
                  <span className="text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 text-sm flex items-center">
                    Read more
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-3 w-3 ml-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default EnFaunaApp;
