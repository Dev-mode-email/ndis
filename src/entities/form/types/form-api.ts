export interface FormsFilters {
    title?: string;
    agentId?: string;
    stepCount?: number;
    searchString?: string;
    sort?: 'asc' | 'desc';
    sortBy?: 'id' | 'name' | 'created';
    page?: number;
    limit?: number;
}