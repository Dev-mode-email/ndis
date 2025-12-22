import React from "react";
import { Button } from "@/core/components/ui/button";

interface FileInputProps {
    label: string;
    onFileChange: (file: File | null) => void;
    fileName?: string;
}


function getDisplayFileName(fileName?: string) {
    if (!fileName) return undefined;
    if (fileName.length <= 16) return fileName;
    const ext = fileName.includes('.') ? fileName.substring(fileName.lastIndexOf('.')) : '';
    return fileName.substring(0, 8) + '...' + ext;
}

export const FileInput: React.FC<FileInputProps> = ({ label, onFileChange, fileName }) => {
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const handleButtonClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        onFileChange(file);
    };

    return (
        <div className="space-y-2">
            <label className="block text-base font-medium">
                {label}
            </label>
            <div className="flex items-center gap-4">
                <div className="flex-1 px-4 py-2 bg-gray-100 rounded-[24px] border border-gray-200 text-gray-600">
                    {getDisplayFileName(fileName) || "No file selected"}
                </div>
                <Button
                    type="button"
                    onClick={handleButtonClick}
                    className="rounded-2xl cursor-pointer"
                >
                    Select File
                </Button>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                />
            </div>
        </div>
    );
};
