import {
  Box,
  VStack,
  HStack,
  Select,
  Tag,
  TagLabel,
  TagCloseButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';
import { TodoFilters } from '../types/todo';

interface TodoFiltersComponentProps {
  filters: TodoFilters;
  onFiltersChange: (filters: TodoFilters) => void;
  availableTags: string[];
  onExport: () => void;
  displayStyle?: 'vertical' | 'horizontal';
}

function TodoFiltersComponent({
  filters,
  onFiltersChange,
  availableTags,
  onExport,
  displayStyle = 'horizontal'
}: TodoFiltersComponentProps) {
  const handleTagSelect = (tag: string) => {
    if (!filters.tags.includes(tag)) {
      onFiltersChange({
        ...filters,
        tags: [...filters.tags, tag],
      });
    } else {
      handleTagRemove(tag);
    }
  };

  const handleTagRemove = (tag: string) => {
    onFiltersChange({
      ...filters,
      tags: filters.tags.filter(t => t !== tag),
    });
  };

  if (displayStyle === 'vertical') {
    return (
      <VStack align="stretch" spacing={3}>
        {availableTags.map(tag => (
          <Tag
            key={tag}
            size="lg"
            borderRadius="md"
            variant={filters.tags.includes(tag) ? "solid" : "subtle"}
            colorScheme="blue"
            cursor="pointer"
            onClick={() => handleTagSelect(tag)}
            py={2}
          >
            <TagLabel>#{tag}</TagLabel>
          </Tag>
        ))}
        {availableTags.length === 0 && (
          <Text color="gray.500" fontSize="sm">No tags available</Text>
        )}
        <Button size="sm" onClick={onExport} mt={4}>
          Export
        </Button>
      </VStack>
    );
  }

  return (
    <Box>
      <HStack spacing={4} wrap="wrap">
        <Menu>
          <MenuButton as={Button} rightIcon={<ChevronDownIcon />} size="sm">
            Filter by Tags
          </MenuButton>
          <MenuList>
            {availableTags.length === 0 ? (
              <MenuItem isDisabled>No tags available</MenuItem>
            ) : (
              availableTags.map(tag => (
                <MenuItem
                  key={tag}
                  onClick={() => handleTagSelect(tag)}
                  isDisabled={filters.tags.includes(tag)}
                >
                  #{tag}
                </MenuItem>
              ))
            )}
          </MenuList>
        </Menu>

        <Select
          size="sm"
          value={filters.sortBy}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              sortBy: e.target.value as 'createdAt' | 'completedAt',
            })
          }
        >
          <option value="createdAt">Sort by Created Date</option>
          <option value="completedAt">Sort by Completed Date</option>
        </Select>

        <Select
          size="sm"
          value={filters.sortOrder}
          onChange={(e) =>
            onFiltersChange({
              ...filters,
              sortOrder: e.target.value as 'asc' | 'desc',
            })
          }
        >
          <option value="desc">Newest First</option>
          <option value="asc">Oldest First</option>
        </Select>

        <Button size="sm" onClick={onExport}>
          Export
        </Button>
      </HStack>

      {filters.tags.length > 0 && (
        <HStack spacing={2} mt={4} wrap="wrap">
          <Text fontSize="sm">Active filters:</Text>
          {filters.tags.map(tag => (
            <Tag
              key={tag}
              size="sm"
              borderRadius="full"
              variant="solid"
              colorScheme="blue"
            >
              <TagLabel>#{tag}</TagLabel>
              <TagCloseButton onClick={() => handleTagRemove(tag)} />
            </Tag>
          ))}
        </HStack>
      )}
    </Box>
  );
}

export default TodoFiltersComponent; 