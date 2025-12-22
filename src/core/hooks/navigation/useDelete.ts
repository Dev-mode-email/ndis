import { useState, useCallback } from 'react';
import { useModal } from '../utils/useModal';

interface DeleteMutation {
    mutateAsync: (id: number) => Promise<unknown>;
}

export const useDelete = (deleteMutation: DeleteMutation) => {
    const modal = useModal<{ id: number }>();
    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = useCallback((id: number) => {
        modal.open({ id });
    }, [modal]);

    const confirmDelete = useCallback(async () => {
        if (!modal.data?.id) return;
        
        setIsDeleting(true);
        try {
            await deleteMutation.mutateAsync(modal.data.id);
            modal.close();
        } catch (error) {
            console.error('Delete failed:', error);
        } finally {
            setIsDeleting(false);
        }
    }, [modal, deleteMutation]);

    return {
        ...modal,
        isDeleting,
        handleDelete,
        confirmDelete
    };
}; 