import React from 'react';
import { cn } from '@/core/lib/utils';
import { CustomCheckbox } from '../ui/inputs/custome-checkbox';

interface TermOfServiceBlockProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  className?: string;
  termOfServiceUrl?: string;
}

export const TermOfServiceBlock: React.FC<TermOfServiceBlockProps> = ({
  checked,
  onCheckedChange,
  className,
  termOfServiceUrl
}) => {
  const handlePrivacyPolicyClick = () => {
    const url = termOfServiceUrl || '/terms-of-service';
    window.open(url, '_blank');
  };

  return (
    <div className={cn("flex items-center justify-start gap-3 p-4", className)}>
      <div>
        <CustomCheckbox
            checked={checked}
            onCheckedChange={onCheckedChange}
            className="mt-0.5"
        />
      </div>
      <div className="text-sm text-muted-foreground leading-relaxed">
        <span className="text-[#000000]">
          I confirm the transfer of data and their use to contact me, exclusively for internal use in accordance with the{' '}
          <a
            onClick={handlePrivacyPolicyClick}
            className="text-blue-600 cursor-pointer underline hover:text-blue-800"
          >
            privacy policy
          </a>
        </span>
      </div>
    </div>
  );
};
