const Logo = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto" viewBox="0 0 200 50">
      <defs>
        <linearGradient id="g1" x1="0%" x2="100%">
          <stop offset="0%" stopColor="#FF6A00"/>
          <stop offset="100%" stopColor="#006C8C"/>
        </linearGradient>
      </defs>

      <style>
        {`.s { font-family: 'Poppins', 'Montserrat', sans-serif; font-weight:800; font-size:24px; letter-spacing:-1px; }`}
      </style>
      <text x="10" y="35" className="s" fill="url(#g1)">MyBlogApp</text>
    </svg>
  );
};

export default Logo;