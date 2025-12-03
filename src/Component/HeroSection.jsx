import { Link } from "react-router-dom";

export default function HeroSection() {
  const bgUrl =
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1920&auto=format&fit=crop"; // blog-themed background

  return (
    <section
      className="relative overflow-hidden"
      style={{
        backgroundImage: `url(${bgUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-800/70 via-indigo-900/60 to-purple-900/60" />

      <div className="relative mx-auto max-w-6xl px-6 py-20 lg:px-12 lg:py-28">
        <div className="rounded-2xl border border-white/20 bg-white/10 p-10 shadow-2xl backdrop-blur-lg">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-center">
            {/* Left: Text */}
            <div>
              <h1 className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold leading-tight">
                Share Your Stories with the World
              </h1>
              <p className="mt-4 text-white/90 text-base sm:text-lg md:text-xl">
                Write, read, and connect with a community of bloggers. Express
                your ideas and let your words inspire others.
              </p>
              <Link
                to="/blog"
                className="inline-flex items-center justify-center rounded-xl bg-blue-300 px-8 py-4 text-base font-semibold text-indigo-900 shadow-lg transition hover:bg-blue-500 active:scale-95 w-95 mt-14"
              >
                Let's dive into Blogementry 
              </Link>
            </div>

            {/* Right: Illustration */}
            <div className="flex flex-col items-center lg:items-center gap-6">
              <img
                src="/images/myimage.png"
                alt="Blog illustration"
                className="w-[95%] md:w-80 lg:w-95 drop-shadow-lg rounded-xl bg-blue-300"
              />

              <Link
                to="/create"
                className="inline-flex items-center justify-center rounded-xl bg-blue-300 px-8 py-4 text-base font-semibold text-indigo-900 shadow-lg transition hover:bg-blue-500 active:scale-95 w-95"
              >
                Create Your Own Blog
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
