import { motion } from "framer-motion";

interface ProgressBarProps {
    currentStep: number;
    totalSteps: number;
}

export const ProgressBar = ({ currentStep, totalSteps }: ProgressBarProps) => {
    return (
        <div className="flex gap-2 w-full mb-5" dir="ltr">
            {[...Array(totalSteps)].map((_, index) => {
                const isActive = index <= currentStep;
                const isCurrent = index === currentStep;

                return (
                    <div
                        key={index}
                        className="h-1 flex-1 rounded-full bg-gray-200 relative overflow-hidden"
                    >
                        {isActive && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[#B2C1FF]"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: [0, 1.05, 1] }}
                                transition={{
                                    type: 'tween',
                                    ease: [0.22, 1, 0.36, 1],
                                    duration: 0.7,
                                    times: [0, 0.7, 1],
                                    delay: index * 0.1
                                }}
                                style={{ transformOrigin: 'left center' }}
                            />
                        )}
                        {isCurrent && (
                            <motion.div
                                className="absolute inset-0 rounded-full bg-[#B2C1FF]"
                                initial={{ opacity: 0.2 }}
                                animate={{ opacity: [0.2, 0.5, 0.2] }}
                                transition={{ duration: 1.2, ease: 'easeInOut' }}
                            />
                        )}
                    </div>
                );
            })}
        </div>
    )
}
