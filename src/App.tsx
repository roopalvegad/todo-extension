import { ChakraProvider, Container, HStack, Heading, Box, VStack, Text } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { Todo, TodoFilters } from './types/todo';
import { storage } from './utils/storage';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import TodoFiltersComponent from './components/TodoFilters';

function App() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filters, setFilters] = useState<TodoFilters>({
    tags: [],
    sortBy: 'createdAt',
    sortOrder: 'desc'
  });

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const loadedTodos = await storage.getTodos();
    setTodos(loadedTodos);
  };

  const handleAddTodo = async (todo: Todo) => {
    await storage.addTodo(todo);
    await loadTodos();
  };

  const handleUpdateTodo = async (todo: Todo) => {
    await storage.updateTodo(todo);
    await loadTodos();
  };

  const handleDeleteTodo = async (id: string) => {
    await storage.deleteTodo(id);
    await loadTodos();
  };

  const handleExport = async () => {
    const data = await storage.exportTodos();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'todos.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  const filteredTodos = todos
    .filter(todo => 
      filters.tags.length === 0 || 
      todo.tags.some(tag => filters.tags.includes(tag))
    )
    .sort((a, b) => {
      const dateA = filters.sortBy === 'createdAt' ? a.createdAt : (a.completedAt || '');
      const dateB = filters.sortBy === 'createdAt' ? b.createdAt : (b.completedAt || '');
      return filters.sortOrder === 'asc' 
        ? dateA.localeCompare(dateB)
        : dateB.localeCompare(dateA);
    });

  const availableTags = Array.from(new Set(todos.flatMap(todo => todo.tags)));

  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Container maxW="container.xl" py={8}>
          <VStack spacing={8} align="stretch">
            <Heading as="h1" size="xl" textAlign="center">
              My Todo List
            </Heading>
            
            <HStack align="start" spacing={8}>
              {/* Left Column - Filters */}
              <Box w="250px" bg="white" p={4} borderRadius="lg" boxShadow="sm">
                <VStack align="stretch" spacing={4}>
                  <Text fontWeight="bold" fontSize="lg">Filter by Tags</Text>
                  <TodoFiltersComponent
                    filters={filters}
                    onFiltersChange={setFilters}
                    availableTags={availableTags}
                    onExport={handleExport}
                    displayStyle="vertical"
                  />
                </VStack>
              </Box>

              {/* Middle Column - Todo List */}
              <Box flex={1} bg="white" p={6} borderRadius="lg" boxShadow="sm">
                <TodoList
                  todos={filteredTodos}
                  onUpdate={handleUpdateTodo}
                  onDelete={handleDeleteTodo}
                />
              </Box>

              {/* Right Column - Add Todo Form */}
              <Box w="300px" bg="white" p={4} borderRadius="lg" boxShadow="sm">
                <TodoForm onSubmit={handleAddTodo} />
              </Box>
            </HStack>
          </VStack>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

export default App; 