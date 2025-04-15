# Interactive Quiz App

A modern, interactive quiz application with time-based scoring and leaderboards built for a frontend UI hackathon.

## Features

- **Interactive Quiz Interface:** Clean UI with visual feedback and progress tracking
- **Time-Based Scoring System:** Rewards quick responses with higher points
- **Leaderboard Functionality:** Track top performers with visual ranking
- **Responsive Design:** Works on various screen sizes

## Technologies Used

- React
- Tailwind CSS
- Lucide React (for icons)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/quiz-app.git
cd quiz-app
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm start
# or
yarn start
```

4. Open your browser and navigate to `http://localhost:3000`

## How to Play

1. Enter your username on the start screen
2. Answer questions as quickly as possible - faster answers earn more points
3. See your final score and check your rank on the leaderboard
4. Challenge yourself to beat your high score!

## Project Structure

```
/src
  /components
    QuizApp.jsx         # Main quiz application component
  /hooks
    useTimer.js         # Custom hook for timer functionality
  /data
    questions.js        # Quiz questions data
  /styles               # Additional styling
  App.js                # Root app component
  index.js              # Entry point
```

## Future Enhancements

- Add more question categories
- Implement multiplayer functionality
- Add difficulty levels
- Integrate with a backend for persistent leaderboards

## License

This project is licensed under the MIT License - see the LICENSE file for details.
