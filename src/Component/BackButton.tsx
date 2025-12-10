import { useNavigate } from 'react-router-dom';

const BackButton = ({ className = "" }) => {
  const navigate = useNavigate();

  return (
    <button 
      onClick={() => navigate('/')}
      className={`bg-teal-600 text-white rounded-full flex items-center justify-center hover:bg-orange-500 transition-all duration-300 group shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 ${className}`}
    >
      <svg className="w-5 h-5 transform transition-transform duration-300 group-hover:-translate-x-1" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
    </button>
  );
};

export default BackButton;