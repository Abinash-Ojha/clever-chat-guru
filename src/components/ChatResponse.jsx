
import { useState } from "react";
import { ExternalLink, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatResponse = ({ response }) => {
    const [copiedIndex, setCopiedIndex] = useState(null);

    if (!response) {
        return null;
    }
    
    const { candidates, usageMetadata } = response;
    
    const copyToClipboard = (text, index) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            {candidates?.map((candidate, index) => (
                <div className="response-card p-5 mb-6" key={index}>
                    <div className="flex justify-between items-start mb-4">
                        <h3 className="text-xl font-medium text-blue-400">Response</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-400 hover:text-white"
                            onClick={() => copyToClipboard(candidate.content.parts[0].text, index)}
                        >
                            {copiedIndex === index ? (
                                <><Check size={16} className="mr-1" /> Copied</>
                            ) : (
                                <><Copy size={16} className="mr-1" /> Copy</>
                            )}
                        </Button>
                    </div>
                    
                    <div className="mb-4">
                        <p className="text-white/90 whitespace-pre-line">
                            {candidate.content.parts[0].text}
                        </p>
                    </div>
                    
                    {candidate?.citationMetadata?.citationSources && (
                        <div className="mt-4 border-t border-gray-700 pt-3">
                            <h6 className="text-sm font-medium text-gray-300 mb-2">Citations:</h6>
                            <ul className="space-y-2">
                                {candidate.citationMetadata.citationSources.map((source, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <ExternalLink size={16} className="text-primary mt-1 mr-2 flex-shrink-0" />
                                        <a 
                                            href={source.url} 
                                            target="_blank" 
                                            rel="noopener noreferrer"
                                            className="citation-link text-sm break-all"
                                        >
                                            {source.url}
                                            <span className="text-gray-400 ml-2">
                                                (indexes: {source.startIndex}-{source.endIndex})
                                            </span>
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            ))}

            {usageMetadata && (
                <div className="bg-secondary/50 rounded-lg p-4 mb-6 border border-gray-700">
                    <h4 className="text-sm font-medium text-gray-300 mb-2">Usage Metadata</h4>
                    <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                        <div>Prompt Tokens: <span className="text-primary">{usageMetadata.promptTokenCount}</span></div>
                        <div>Response Tokens: <span className="text-primary">{usageMetadata.candidatesTokenCount}</span></div>
                        
                        {usageMetadata.promptTokenDetails && (
                            <>
                                <div>Modality: <span className="text-primary">{usageMetadata.promptTokenDetails.modality}</span></div>
                                <div>Token Count: <span className="text-primary">{usageMetadata.promptTokenDetails.tokenCount}</span></div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatResponse;
