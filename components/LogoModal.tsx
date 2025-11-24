import React from 'react';

interface LogoModalProps {
    logos: string[];
    selectedIndex: number;
    onSelect: (index: number) => void;
    onClose: () => void;
}

export const LogoModal: React.FC<LogoModalProps> = ({ logos, selectedIndex, onSelect, onClose }) => {
    const handleSelect = (index: number) => {
        onSelect(index);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 animate-in fade-in zoom-in-95 duration-200" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900">Choose Your Logo</h2>
                    <button
                        onClick={onClose}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500"
                    >
                        ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    {logos.map((logo, index) => (
                        <button
                            key={index}
                            onClick={() => handleSelect(index)}
                            className={`aspect-square rounded-xl border-4 transition-all hover:scale-105 ${selectedIndex === index
                                    ? 'border-black shadow-lg'
                                    : 'border-gray-200 hover:border-gray-300'
                                }`}
                        >
                            <img
                                src={logo}
                                alt={`Logo variation ${index + 1}`}
                                className="w-full h-full object-contain p-4"
                            />
                        </button>
                    ))}
                </div>

                <div className="flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-6 py-2 rounded-lg border-2 border-gray-300 hover:bg-gray-50 transition-colors font-medium"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
