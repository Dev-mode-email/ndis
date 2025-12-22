import { useTranslation } from 'react-i18next';
import { AudioFilePlayer } from './AudioFilePlayer';
import { AudioFileItem } from '@/core/types/answer';
import type { Answer } from '@/core/types/answer';

interface AudioPlayerComponentProps {
  answer: Answer;
}

export const AudioPlayerComponent: React.FC<AudioPlayerComponentProps> = ({ answer }) => {
  const { t } = useTranslation();
  const showAudio = answer.audioFiles && answer.audioFiles.length > 0;
  
  if (showAudio) {
    return (
      <div className="space-y-4">
        {answer.audioFiles?.map((audioItem, idx) => (
          <AudioFilePlayer 
            key={idx} 
            audioItem={audioItem as AudioFileItem | string} 
          />
        ))}
        {answer.value_type === 'AUDIO_OR_TEXT' && answer.value_text && (
          <div className="mt-2 p-3 bg-muted rounded-lg">
            <div className="text-xs font-medium text-muted-foreground mb-1">
              {t('admin.answers.audioOrText.textAnswer') || 'Text answer:'}
            </div>
            <div className="whitespace-pre-wrap text-sm">{answer.value_text}</div>
          </div>
        )}
      </div>
    );
  }
  
  if (answer.audioId) {
    return (
      <div className="space-y-4">
        <AudioFilePlayer audioId={answer.audioId} />
        {answer.value_type === 'AUDIO_OR_TEXT' && answer.value_text && (
          <div className="mt-2 p-3 bg-muted rounded-lg">
            <div className="text-xs font-medium text-muted-foreground mb-1">
              {t('admin.answers.audioOrText.textAnswer') || 'Text answer:'}
            </div>
            <div className="whitespace-pre-wrap text-sm">{answer.value_text}</div>
          </div>
        )}
      </div>
    );
  }
  
  return <div className="text-muted-foreground">{t('admin.answers.audio.noAudio') || 'No audio recorded'}</div>;
};

