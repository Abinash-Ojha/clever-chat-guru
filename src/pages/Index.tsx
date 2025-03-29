
import { useState } from 'react';
import ChatInput from '../components/ChatInput';
import ChatResponse from '../components/ChatResponse';
import LoadingSpinner from '../components/LoadingSpinner';
import { fetchChatResponse } from '../services/api';
import '../App.css';

const Index = () => {
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleQuestionSubmit = async (question) => {
    setLoading(true);
    setResponse(null);
    setError(null);
    
    try {
      const apiResponse = await fetchChatResponse(question);
      setResponse(apiResponse);
    } catch (error) {
      console.error('API Error:', error);
      setError(error.response?.data?.message || error.message || "Failed to get a response");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container bg-gradient-to-b from-[#080f1e] to-[#101827]">
      <header className="header">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Clever Chat Guru</h1>
          <div className="px-3 py-1 bg-blue-500/20 rounded-full text-xs text-blue-400 border border-blue-500/30">
            AI Powered
          </div>
        </div>
      </header>
      
      <main className="main-content">
        <ChatInput onSubmit={handleQuestionSubmit} disabled={loading} />
        
        {loading && <LoadingSpinner />}
        
        {error && (
          <div className="w-full max-w-4xl mx-auto my-4 px-4 py-3 bg-red-900/50 border border-red-800 rounded-lg text-red-200">
            {error}
          </div>
        )}
        
        <ChatResponse response={response} />
      </main>
      
      <footer className="footer">
        <p className="text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Clever Chat Guru
        </p>
      </footer>
    </div>
  );
};

export default Index;
