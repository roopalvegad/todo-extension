export interface Todo {
  id: string;
  description: string;
  tags: string[];
  completed: boolean;
  createdAt: string;
  completedAt?: string;
}

export interface TodoFilters {
  tags: string[];
  sortBy: 'createdAt' | 'completedAt';
  sortOrder: 'asc' | 'desc';
} 