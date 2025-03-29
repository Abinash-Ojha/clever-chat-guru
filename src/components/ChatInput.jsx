
import { useState } from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatInput = ({ onSubmit, disabled }) => {
    const [question, setQuestion] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (question.trim()) {
            onSubmit(question);
            setQuestion("");
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto mt-4 mb-8">
            <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <input
                    type="text"
                    className="flex-1 px-4 py-3 bg-secondary text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary transition-all"
                    placeholder="Ask a question..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    disabled={disabled}
                />
                <Button 
                    type="submit" 
                    className="p-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={disabled || !question.trim()}
                >
                    <Send size={20} />
                </Button>
            </form>
        </div>
    );
};

export default ChatInput;
