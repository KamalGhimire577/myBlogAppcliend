import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../hooks/redux'
import { clearMessages } from '../store/slices/statusSlice'


const StatusHandler: React.FC = () => {
  const { loading, error, success } = useAppSelector(state => state.status)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        dispatch(clearMessages())
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [success])

  useEffect(() => {
    if (error) {
      // Error stays until user clicks button
    }
  }, [error])

  return (
    <>
      {loading && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex flex-col items-center justify-center">
          <div className="relative">
            <div className="rounded-full h-20 w-20 bg-gradient-to-r from-[#7a0bc0] to-[#fa58b6] opacity-30 animate-ping absolute"></div>
            <div className="rounded-full h-14 w-14 bg-gradient-to-r from-[#fa58b6] to-[#7a0bc0] opacity-50 animate-ping absolute top-3 left-3" style={{animationDelay: '200ms'}}></div>
            <div className="rounded-full h-8 w-8 bg-gradient-to-r from-[#7a0bc0] to-[#fa58b6] opacity-70 animate-ping absolute top-6 left-6" style={{animationDelay: '400ms'}}></div>
          </div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-[#7a0bc0] to-[#fa58b6] bg-clip-text text-transparent mt-4">
            Loading
            <span className="inline-flex">
              <span className="animate-bounce" style={{animationDelay: '0ms'}}>.</span>
              <span className="animate-bounce" style={{animationDelay: '150ms'}}>.</span>
              <span className="animate-bounce" style={{animationDelay: '300ms'}}>.</span>
            </span>
          </h2>
        </div>
      )}
      {error && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-7 max-w-lg w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="bg-red-100 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Error</h3>
            </div>
            <p className="text-gray-600 mb-6">{error}</p>
            <div className="flex gap-3">
              <button
                onClick={() => dispatch(clearMessages())}
                className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                OK
              </button>
              <button
                onClick={() => dispatch(clearMessages())}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      {success && (
        <div className="fixed inset-0 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-xl p-7 max-w-lg w-full mx-4">
            <div className="flex items-center mb-4">
              <div className="bg-green-100 rounded-full p-2 mr-3">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Success</h3>
            </div>
            <p className="text-gray-600">{success}</p>
          </div>
        </div>
      )}
    </>
  )
}

export default StatusHandler