import { useEffect, useState, useRef } from 'react'

const defaultPhrases = [
    'Loading...',
    'Please wait...',
    'Processing...'
]

export const LoadingMessage = () => {
    const [phraseIdx, setPhraseIdx] = useState(0)
    const [fade, setFade] = useState(true)
    const gifRef = useRef<HTMLImageElement>(null)
    const textRef = useRef<HTMLSpanElement>(null)

    useEffect(() => {
        const animate = () => {
            if (textRef.current) {
                textRef.current.style.transform = 'translate3d(0,0,0)';
            }
            
            setFade(false);
            
            requestAnimationFrame(() => {
                setTimeout(() => {
                    setPhraseIdx((prev) => (prev + 1) % defaultPhrases.length);
                    setFade(true);
                }, 150);
            });
        };

        const interval = setInterval(animate, 2500);
        
        const initialTimeout = setTimeout(() => {
            if (textRef.current) {
                textRef.current.style.opacity = '1';
            }
            animate();
        }, 300);
        
        return () => {
            clearInterval(interval);
            clearTimeout(initialTimeout);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-background p-4" dir="ltr">
            <img
                ref={gifRef}
                src="/Robot.gif"
                alt="Loading bot"
                className="mb-4"
            />
            <span
                ref={textRef}
                className={`inline-block text-center dark:text-foreground min-h-[48px] transition-opacity duration-150 ease-in-out will-change-opacity ${fade ? 'opacity-100' : 'opacity-0'}`}
                style={{
                    WebkitTransition: 'opacity 150ms ease-in-out',
                    WebkitTransform: 'translate3d(0,0,0)',
                    transform: 'translate3d(0,0,0)',
                    WebkitBackfaceVisibility: 'hidden',
                    backfaceVisibility: 'hidden'
                }}
                dir="ltr"
            >
                {defaultPhrases[phraseIdx]}
            </span>
        </div>
    );
}
