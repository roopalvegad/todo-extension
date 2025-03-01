import {
  VStack,
  HStack,
  Text,
  IconButton,
  Checkbox,
  Tag,
  TagLabel,
  Box,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Todo } from '../types/todo';
import { format } from 'date-fns';

interface TodoListProps {
  todos: Todo[];
  onUpdate: (todo: Todo) => void;
  onDelete: (id: string) => void;
}

function TodoList({ todos, onUpdate, onDelete }: TodoListProps) {
  const handleToggleComplete = (todo: Todo) => {
    onUpdate({
      ...todo,
      completed: !todo.completed,
      completedAt: !todo.completed ? new Date().toISOString() : undefined,
    });
  };

  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy h:mm a');
  };

  return (
    <VStack spacing={4} align="stretch">
      {todos.map(todo => (
        <Box
          key={todo.id}
          borderBottomWidth="1px"
          borderColor="gray.200"
          pb={4}
          opacity={todo.completed ? 0.7 : 1}
        >
          <HStack spacing={4} align="start">
            <Checkbox
              isChecked={todo.completed}
              onChange={() => handleToggleComplete(todo)}
              mt={1}
            />
            
            <VStack align="start" flex={1} spacing={2}>
              <Text
                fontSize="md"
                textDecoration={todo.completed ? 'line-through' : 'none'}
              >
                {todo.description}
              </Text>
              
              <HStack spacing={2} wrap="wrap">
                {todo.tags.map(tag => (
                  <Tag
                    key={tag}
                    size="sm"
                    borderRadius="full"
                    variant="subtle"
                    colorScheme="blue"
                  >
                    <TagLabel>#{tag}</TagLabel>
                  </Tag>
                ))}
              </HStack>

              <Text fontSize="xs" color="gray.500">
                Created: {formatDate(todo.createdAt)}
                {todo.completedAt && (
                  <> • Completed: {formatDate(todo.completedAt)}</>
                )}
              </Text>
            </VStack>

            <IconButton
              aria-label="Delete todo"
              icon={<DeleteIcon />}
              onClick={() => onDelete(todo.id)}
              variant="ghost"
              colorScheme="red"
              size="sm"
            />
          </HStack>
        </Box>
      ))}

      {todos.length === 0 && (
        <Text textAlign="center" color="gray.500">
          No todos found
        </Text>
      )}
    </VStack>
  );
}

export default TodoList; 