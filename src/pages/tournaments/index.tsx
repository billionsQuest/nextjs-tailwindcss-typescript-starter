import React from "react";

const BlogSection: React.FC = () => {
  return (
    <section className="p-4">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-5">
        <h2 className="mt-6 text-3xl font-bold text-center text-neutral-600">
          Tournaments
        </h2>
      </div>
      <div className="relative mx-auto max-w-7xl">
        <div className="grid max-w-lg gap-12 mx-auto mt-12 lg:grid-cols-3 lg:max-w-none">
          {/* Repeat this div for each blog entry */}

          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => {
            return (
              <>
                <div className="flex flex-col mb-12 overflow-hidden cursor-pointer">
                  <a href="/blog-post">
                    <div className="flex-shrink-0">
                      <img
                        className="object-cover w-full h-48 rounded-lg"
                        src={`https://picsum.photos/id/${item}/200/300`}
                        alt=""
                      />
                    </div>
                  </a>
                  <div className="flex flex-col justify-between flex-1">
                    <a href="/blog-post"></a>
                    <div className="flex-1">
                      <a href="/blog-post">
                        <div className="flex pt-6 space-x-1 text-sm text-gray-500">
                          <time dateTime="2020-03-10"> Mar 10, 2020 </time>
                          <span aria-hidden="true"> - </span>
                          <time dateTime="2020-15-10"> Mar 15, 2020 </time>
                        </div>
                      </a>
                      <a href="#" className="block mt-2 space-y-6">
                        <h3 className="text-2xl font-semibold leading-none tracking-tighter text-neutral-600">
                          Typography on app.
                        </h3>
                        <p className="text-lg font-normal text-gray-500">
                          Filling text so you can see how it looks like with
                          text. Did I say text?
                        </p>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {/* Additional blog entries would be similar */}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
