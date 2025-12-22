import { Button } from "@/core/components/ui/button";
import { useTranslation } from "react-i18next";
import { FileText } from "lucide-react";
import { Answer } from "@/core/types/answer";
import { useTranscribeAudioByAnswerId } from "@/core/hooks/api/useAudio";

interface TranscriptAllAnswerProps {
  selectedAnswerId: Answer["id"];
}
export const TranscriptAllAnswer: React.FC<TranscriptAllAnswerProps> = ({
  selectedAnswerId,
}) => {
  console.log(selectedAnswerId);
  const { t } = useTranslation();
  const { mutate: transcribeAudioByAnswerId, isPending } =
    useTranscribeAudioByAnswerId();

  return (
    <Button
      variant="admin-secondary"
      size="sm"
      onClick={() => {
        transcribeAudioByAnswerId(selectedAnswerId);
      }}
      disabled={isPending}
      className="flex items-center gap-2"
    >
      <FileText className="h-4 w-4" />
      {t("common.transcriptAllAnswer")}
    </Button>
  );
};
