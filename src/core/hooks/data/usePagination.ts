import { useState, useCallback } from 'react';

export const usePagination = (initialPage = 1, pageSize = 7) => {
    const [currentPage, setCurrentPage] = useState(() => {
        const searchParams = new URLSearchParams(window.location.search);
        return parseInt(searchParams.get('page') || initialPage.toString());
    });

    const updateCurrentPage = useCallback((page: number) => {
        setCurrentPage(page);
        
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('page', page.toString());
        
        const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
        window.history.replaceState(null, '', newUrl);
    }, []);

    return {
        currentPage,
        pageSize,
        updateCurrentPage
    };
}; 