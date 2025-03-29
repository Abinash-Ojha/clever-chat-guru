
import { Loader2 } from "lucide-react";

const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full max-w-4xl mx-auto my-8 py-6">
            <Loader2 className="h-8 w-8 text-primary animate-spin mb-2" />
            <p className="text-sm text-gray-400">Getting your answer...</p>
        </div>
    );
};

export default LoadingSpinner;
