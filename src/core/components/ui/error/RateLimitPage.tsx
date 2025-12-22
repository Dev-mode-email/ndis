import { Button } from '../button';

interface RateLimitPageProps {
  onRetry: () => void;
}

export const RateLimitPage = ({ onRetry }: RateLimitPageProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white rounded-[24px] p-8 shadow-[0px_4px_20px_0px_rgba(0,0,0,0.05)] w-full max-w-md text-center">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Too Many Requests! 🤖
          </h1>
          <p className="text-gray-600">
            Our robot got a bit tired from your requests. Please wait a moment and try again. We'll be back to work soon!
          </p>
        </div>
        
        <Button 
          onClick={onRetry}
          className="w-full"
        >
          Try Again
        </Button>
      </div>
    </div>
  );
};
