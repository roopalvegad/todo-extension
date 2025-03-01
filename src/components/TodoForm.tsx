import { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  Input,
  VStack,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  Text,
} from '@chakra-ui/react';
import { Todo } from '../types/todo';

interface TodoFormProps {
  onSubmit: (todo: Todo) => void;
}

function TodoForm({ onSubmit }: TodoFormProps) {
  const [description, setDescription] = useState('');
  const [tagInput, setTagInput] = useState('');
  const [tags, setTags] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      description: description.trim(),
      tags,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    onSubmit(newTodo);
    setDescription('');
    setTags([]);
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTag = tagInput.trim().toLowerCase();
      if (!tags.includes(newTag)) {
        setTags([...tags, newTag]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={4} align="stretch">
        <Text fontWeight="bold" fontSize="lg">Description</Text>
        <FormControl>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter todo description"
            size="md"
            bg="gray.50"
          />
        </FormControl>

        <Text fontWeight="bold" fontSize="lg">Tags (press Enter to add)</Text>
        <FormControl>
          <Input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleAddTag}
            placeholder="Add tags"
            size="md"
            bg="gray.50"
          />
        </FormControl>

        <HStack spacing={2} wrap="wrap" minH="60px">
          {tags.map(tag => (
            <Tag key={tag} size="md" borderRadius="full" variant="solid" colorScheme="blue">
              <TagLabel>#{tag}</TagLabel>
              <TagCloseButton onClick={() => removeTag(tag)} />
            </Tag>
          ))}
        </HStack>

        <Button
          type="submit"
          colorScheme="green"
          width="full"
          size="lg"
          mt={4}
        >
          Add Todo
        </Button>
      </VStack>
    </Box>
  );
}

export default TodoForm; 