const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="relative">
        {/* Outer ring - Teal */}
        <div className="rounded-full h-20 w-20 bg-teal-200 animate-ping absolute"></div>
        {/* Middle ring - Violet */}
        <div className="rounded-full h-14 w-14 bg-violet-300 animate-ping absolute top-3 left-3 animation-delay-200"></div>
        {/* Center ring - Orange */}
        <div className="rounded-full h-8 w-8 bg-orange-200 animate-ping absolute top-6 left-6 animation-delay-400"></div>
      </div>
    </div>
  );
};

export default Loader;
