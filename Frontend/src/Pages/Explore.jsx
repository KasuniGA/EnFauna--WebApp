  import React from "react";

  const EnFaunaApp = () => {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-800 text-gray-800">
        {/* Hero Section */}
        <section className="relative">
          <div className="w-full h-screen overflow-hidden relative">
            <img
              src="https://scontent.fcmb2-2.fna.fbcdn.net/v/t1.6435-9/119841671_834612427344118_4357316636587668208_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeFZgUUosaaJGQNOX1nqm2Lc16eTracZjBTXp5OtpxmMFNAuuutYNG2v2KYHfiqUMlPj_d7ju75szpefXRSu4dE_&_nc_ohc=_OYGQQyA6N8Q7kNvgGJhJLZ&_nc_oc=AdhHOW1xVHVk4_VwLw-ResEQLs5wrsjdmmfBDJspkszU5al4TOMbJOhu5sJOqlAuJEM&_nc_zt=23&_nc_ht=scontent.fcmb2-2.fna&_nc_gid=ATYFV2cEkO_pJUsaoS50U7v&oh=00_AYBGBZA9Ah4NZOMSTniIqxmI4w54RnZIH3ZWNMhNHBPoTw&oe=67E4F3DD"
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
                  placeholder="Search species..."
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
              <div className="overflow-hidden rounded-lg shadow-md bg-white dark:bg-gray-800">
                <img
                  src="https://i.pinimg.com/736x/34/5d/76/345d76515a02f0d3ceea2917fb27863d.jpg"
                  alt="Wildlife conservation"
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    October 12, 2024
                  </span>
                  <h3 className="text-xl font-bold my-2 text-gray-500 dark:text-gray-300 ">
                    Best Strategies for Wildlife Monitoring in Protected Areas
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Optimal strategies for effective wildlife monitoring including
                    comprehensive approaches to habitat management, selection of
                    appropriate technologies, and implementation of effective
                    practices.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <img
                  src="https://i.pinimg.com/736x/a8/2a/11/a82a1187f3d3143a36bebf3f8efa9bf8.jpg"
                  alt="Species diversity"
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    October 10, 2024
                  </span>
                  <h3 className="font-bold text-gray-500 dark:text-gray-300">
                    Record Biodiversity Found in Newly Protected Forest Area
                  </h3>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <img
                  src="https://www.aiwire.net/wp-content/uploads/2023/02/wps_cover-1024x474.jpg"
                  alt="Conservation technology"
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    October 8, 2024
                  </span>
                  <h3 className="font-bold text-gray-500 dark:text-gray-300">
                    Latest Innovations in Species Tracking and Monitoring
                    Technology
                  </h3>
                </div>
              </div>
              <div className="flex gap-4 p-4 rounded-lg shadow-md bg-white dark:bg-gray-800">
                <img
                  src="https://media.licdn.com/dms/image/D4E12AQGkGuxjUPkeFg/article-cover_image-shrink_600_2000/0/1719969542133?e=2147483647&v=beta&t=DlKGUHVt9WomYZOZ5wLh5K6jSoXasuyXMhdf4SJ2zNw"
                  alt="Conservation practices"
                  className="w-24 h-24 object-cover rounded"
                />
                <div>
                  <span className="text-sm text-gray-500 dark:text-gray-300">
                    October 5, 2024
                  </span>
                  <h3 className="font-bold text-gray-500 dark:text-gray-300">
                    Best Practices in Establishing Wildlife Corridors in
                    Fragmented Habitats
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Articles */}
        <section className="py-8 px-4 md:px-16 bg-green-50 dark:bg-gray-800">
          <h2 className="text-2xl font-bold mb-6 text-black dark:text-white">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="rounded-lg shadow-md overflow-hidden bg-white/5 backdrop-blur-xl">
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pinimg.com/474x/52/a6/99/52a6998abd9fdd0065c8763fa4638f39.jpg"
                  alt="Forest wildlife"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500 dark:text-gray-200">
                    October 15, 2024
                  </span>
                  <h3 className="text-lg font-bold my-2 text-black dark:text-white">
                    Exploring Potential and Challenges in Rainforest Conservation
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Uncovering the vast potential and complex challenges in the
                    world of tropical rainforest biodiversity protection.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-md overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/e6/60/ee/e660ee8fe83b53934d5d97f189ef15d9.jpg"
                  alt="Grassland ecosystem"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500 dark:text-gray-200">
                    October 13, 2024
                  </span>
                  <h3 className="text-lg font-bold my-2">
                    Bringing Change in the Grassland Ecosystem Management
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Revealing innovations, challenges and transformation factors
                    that bring positive changes in grassland conservation efforts.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-md overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/5a/7a/2a/5a7a2aeb86900a34b9015bcc8948c0fc.jpg"
                  alt="Marine conservation"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500 dark:text-gray-200">
                    October 11, 2024
                  </span>
                  <h3 className="text-lg font-bold my-2">
                    Potential and Constraints Faced in Marine Species Protection
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Discusses challenges and opportunities in achieving high
                    conservation standards in marine environments.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-md overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/74/22/9c/74229c00fd4ebd9ddd2f693a650d5be3.jpg"
                  alt="Urban wildlife"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500">October 9, 2024</span>
                  <h3 className="text-lg font-bold my-2 dark:text-gray-200">
                    Achieving High Biodiversity in Urban Environments
                  </h3>
                  <p className="text-gray-600 text-sm">
                    A practical guide to achieving satisfactory results when
                    managing wildlife in urban settings.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-md overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/4d/bd/55/4dbd5545b2868f53cdce030c1a7f37d7.jpg"
                  alt="Habitat restoration"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500 dark:text-gray-200">
                    October 7, 2024
                  </span>
                  <h3 className="text-lg font-bold my-2">
                    The Best Guide to Habitat Restoration with Optimal Results
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Effective strategies and techniques to achieve quality and
                    productive habitat restoration for endangered species.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-lg shadow-md overflow-hidden bg-white/5 backdrop-blur-sm">
              <div className="rounded-lg shadow-md overflow-hidden">
                <img
                  src="https://i.pinimg.com/736x/4d/bd/55/4dbd5545b2868f53cdce030c1a7f37d7.jpg"
                  alt="Conservation technology"
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <span className="text-sm text-gray-500 dark:text-gray-200">
                    October 5, 2024
                  </span>
                  <h3 className="text-lg font-bold my-2">
                    Strategies for Managing Conservation Areas More Efficiently
                  </h3>
                  <p className="text-gray-600 text-sm">
                    A comprehensive look at technologies and methodologies for
                    sustainable conservation management systems.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Pagination */}
        <div className="flex justify-center py-6 bg-green-50 dark:bg-gray-800">
          <nav className="flex items-center gap-1">
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-500 text-black dark:text-white">
              Previous
            </button>
            <button className="px-3 py-1 rounded bg-green-600 text-white dark:text-white">
              1
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-500 text-black dark:text-white">
              2
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-500 text-black dark:text-white">
              3
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-500 text-black dark:text-white">
              4
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-500 text-black dark:text-white">
              5
            </button>
            <button className="px-3 py-1 rounded border border-gray-300 dark:border-gray-500 text-black dark:text-white">
              Next
            </button>
          </nav>
        </div>
      </div>
    );
  };

  export default EnFaunaApp;
