import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TFunction } from 'i18next';
import { FileText, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/core/components/ui/button';
import { useTranscribeAudioById } from '@/core/hooks/api/useAudio';
import { toastManager } from '@/core/components/ui/toast/toast';
import { useAudioByUuid } from '@/core/hooks/api/useAudio';
import { AudioFileItem } from '@/core/types/answer';

const getTranscriptionStatusText = (transcriptionStatus: string | undefined, t: TFunction) => {
  if (transcriptionStatus === 'completed') {
    return t('admin.audio.status.transcribed', 'Готово');
  }
  if (transcriptionStatus === 'pending') {
    return t('admin.audio.status.pending', 'В обработке');
  }
  if (transcriptionStatus === 'failed') {
    return t('admin.audio.status.failed', 'Ошибка');
  }
  return t('admin.audio.status.notStarted', 'Не начато');
};

interface AudioFilePlayerProps {
  audioItem?: AudioFileItem | string;
  audioId?: string | null;
  t?: TFunction;
}

export const AudioFilePlayer: React.FC<AudioFilePlayerProps> = ({ 
  audioItem, 
  audioId,
  t: tProp 
}) => {
  const { t: tHook } = useTranslation();
  const t = tProp || tHook;
  const [showTranscription, setShowTranscription] = useState(false);
  const transcribeAudio = useTranscribeAudioById();
  
  const hasAudioItemUrl = typeof audioItem === 'string' 
    ? Boolean(audioItem)
    : Boolean(audioItem?.s3Url || audioItem?.url);
  
  const shouldLoadByUuid = audioId && !hasAudioItemUrl;
  const { data: audioDataByUuid, isLoading: isLoadingAudio, error: audioError } = useAudioByUuid(
    shouldLoadByUuid ? audioId : undefined
  );
  
  const finalAudioItem: AudioFileItem | undefined = audioDataByUuid 
    ? {
        id: audioDataByUuid.id,
        s3Url: audioDataByUuid.s3Url,
        url: audioDataByUuid.s3Url,
        mimetype: audioDataByUuid.mimetype,
        transcription: 'transcription' in audioDataByUuid ? audioDataByUuid.transcription : undefined,
        transcriptionStatus: 'transcriptionStatus' in audioDataByUuid ? audioDataByUuid.transcriptionStatus : undefined,
      }
    : (audioItem as AudioFileItem | undefined);
  
  const audioUrl = typeof finalAudioItem === 'string' 
    ? finalAudioItem 
    : finalAudioItem?.s3Url || finalAudioItem?.url;
  const audioType = typeof finalAudioItem === 'object' && finalAudioItem?.mimetype 
    ? finalAudioItem.mimetype 
    : 'audio/webm';
  
  const transcription = typeof finalAudioItem === 'object' ? finalAudioItem?.transcription : undefined;
  const transcriptionStatus = typeof finalAudioItem === 'object' ? finalAudioItem?.transcriptionStatus : undefined;
  const audioIdForTranscribe = typeof finalAudioItem === 'object' ? finalAudioItem?.id : undefined;
  
  const hasTranscription = Boolean(transcription);
  const canTranscribe = !hasTranscription && Boolean(audioIdForTranscribe);
  
  const handleTranscribe = async () => {
    if (!audioIdForTranscribe) return;
    try {
      await transcribeAudio.mutateAsync(audioIdForTranscribe);
      toastManager.success(t('admin.audio.transcribe.success', 'Транскрипция запущена'));
    } catch (_error) {
    }
  };
  
  if (shouldLoadByUuid && isLoadingAudio) {
    return <span className="text-muted-foreground">{t('common.loading') || 'Loading...'}</span>;
  }
  
  if (shouldLoadByUuid && audioError) {
    return (
      <div className="text-red-500 text-sm">
        {t('admin.answers.audio.error') || 'Error loading audio. Please check console for details.'}
      </div>
    );
  }
  
  if (!audioUrl) {
    return null;
  }
  
  return (
    <div className="space-y-2">
      <audio controls className="w-full max-w-md">
        <source src={audioUrl} type={audioType} />
        {t('admin.answers.audio.notSupported') || 'Your browser does not support the audio element.'}
      </audio>
      
      {(transcriptionStatus || hasTranscription) && (
        <div className="flex items-center gap-2 text-xs">
          <span className="text-muted-foreground">
            {t('admin.audio.section.transcription', 'Транскрипция')}:
          </span>
          <span className={`font-medium ${
            transcriptionStatus === 'completed' ? 'text-green-600' :
            transcriptionStatus === 'pending' ? 'text-yellow-600' :
            transcriptionStatus === 'failed' ? 'text-red-600' :
            'text-muted-foreground'
          }`}>
            {getTranscriptionStatusText(transcriptionStatus, t)}
          </span>
        </div>
      )}
      
      {hasTranscription && (
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowTranscription(!showTranscription)}
          className="w-full justify-between"
        >
          <span className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {showTranscription 
              ? t('admin.audio.hideTranscription', 'Скрыть транскрипцию')
              : t('admin.audio.showTranscription', 'Показать транскрипцию')
            }
          </span>
          {showTranscription ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      )}
      
      {showTranscription && transcription && (
        <div className="mt-2 p-3 bg-muted rounded-lg">
          <div className="text-xs font-medium text-muted-foreground mb-2">
            {t('admin.audio.section.transcription', 'Транскрипция')}:
          </div>
          <div className="whitespace-pre-wrap text-sm text-foreground leading-relaxed">
            {transcription}
          </div>
        </div>
      )}
      
      {canTranscribe && (
        <Button
          variant="outline"
          size="sm"
          onClick={handleTranscribe}
          disabled={transcribeAudio.isPending}
          className="w-full"
        >
          <FileText className="h-4 w-4 mr-2" />
          {transcribeAudio.isPending 
            ? t('admin.audio.transcribing', 'Обработка...')
            : t('admin.audio.actions.transcribe', 'Расшифровать')
          }
        </Button>
      )}
    </div>
  );
};

