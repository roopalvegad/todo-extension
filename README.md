# Simple Todo Manager Chrome Extension

A clean and simple Chrome extension for managing todos with tag filtering and organization features.

## Features

- Add todos with descriptions and tags
- Mark todos as complete
- Delete todos
- Filter todos by tags
- Sort by creation or completion date
- Export todos to JSON
- Works completely offline
- No data collection or tracking

## Installation

### From Chrome Web Store
1. Visit the [Chrome Web Store page](#) (link coming soon)
2. Click "Add to Chrome"
3. Click "Add extension" in the popup

### From Source
1. Clone this repository:
```bash
git clone https://github.com/yourusername/todo-extension.git
cd todo-extension
```

2. Install dependencies:
```bash
npm install
```

3. Build the extension:
```bash
npm run build
```

4. Load in Chrome:
- Open Chrome and go to `chrome://extensions/`
- Enable "Developer mode"
- Click "Load unpacked"
- Select the `dist` directory from this project

## Development

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Tech Stack

- React
- TypeScript
- Chakra UI
- Vite
- Chrome Extension APIs

## Privacy

This extension:
- Works completely offline
- Stores all data locally in your browser
- Does not collect any personal information
- Does not use any analytics or tracking
- Does not communicate with any external servers

## License

MIT License - feel free to use this code in your own projects.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request 