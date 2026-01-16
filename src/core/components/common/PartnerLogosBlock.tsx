import React from 'react';

export interface PartnerLogo {
    id: string | number;
    name?: string;
    s3Url: string;
}

interface PartnerLogosBlockProps {
    logos: PartnerLogo[];
    isSingleLogo: boolean;
    hasLogos: boolean;
    startMarkup?: string;
    compact?: boolean; 
}

export const PartnerLogosBlock: React.FC<PartnerLogosBlockProps> = ({ logos, isSingleLogo, hasLogos, startMarkup, compact }) => {
    const getTextLineCount = (text: string | undefined): number => {
        if (!text) return 0;
        const cleanText = text.replace(/<[^>]*>/g, '').trim();
        if (!cleanText) return 0;
        return cleanText.split('\n').filter(line => line.trim().length > 0).length;
    };

    const textLineCount = getTextLineCount(startMarkup);
    const isShortText = compact ?? (textLineCount <= 3);
    
    const LogoImage: React.FC<{ logo: PartnerLogo }> = ({ logo }) => {
        const [naturalSize, setNaturalSize] = React.useState<{ w: number; h: number } | null>(null);
        const isSquare = naturalSize ? Math.abs(naturalSize.w - naturalSize.h) / Math.max(naturalSize.w, naturalSize.h) < 0.1 : false;

        const baseMaxHeight = isSingleLogo ? (isShortText ? 160 : 140) : (isShortText ? 100 : 80);
        const squareMaxHeight = isSingleLogo ? (isShortText ? 144 : 128) : (isShortText ? 90 : 72);
        const maxHeight = isSquare ? squareMaxHeight : baseMaxHeight;

        return (
            <img
                key={logo.id}
                src={logo.s3Url}
                alt={logo.name || 'Partner logo'}
                className="object-contain shrink-0"
                style={{ height: maxHeight, width: 'auto' }}
                onLoad={(e) => setNaturalSize({ w: e.currentTarget.naturalWidth, h: e.currentTarget.naturalHeight })}
            />
        );
    };

    if (!hasLogos || logos.length === 0) {
        return null;
    }

    return (
        <div className={`relative w-full flex items-center justify-center bg-card gap-6 ${isShortText ? 'pt-20 pb-5' : 'pb-5'}`}>
            {logos.map((logo) => (
                <LogoImage key={logo.id} logo={logo} />
            ))}
        </div>
    );
};