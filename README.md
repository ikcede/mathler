# Mathler

A NextJS implementation of Mathler

## Stack and Set Up

**Stack**

- NextJS
- React
- CSS Modules
- Jest for testing

I'm using a NextJS/React stack for ease of deployment onto Vercel. Since the application will be lightweight, I'm using CSS modules instead of inline CSS for better performance and to decouple CSS from TSX.

For a quick set up, I ran:

```bash
npx create-next-app@latest --example with-jest with-jest-app
```

For a dev server, use:

```bash
npm run dev
```

## UX Design

For design decisions, check out the `/design` folder.

## Game Design

### User Interactions

The main ways for the user to interact with the game will include:

- Creating a new game
- Entering values
- Submitting a guess

**Creating a new game**: Should reset the game state and generate a new target value and hidden expression

**Entering values**: Possible with mouse/touch or keyboard inputs, will update the boxes left to right with values. Values should also be deleteable.

**Submitting a guess**: The user can use the enter input to submit a guess and have the game validate the guess. If the guess is valid, the game state will need to update. There should be an error that appears if the guess is invalid.

### Game State

The main states I need to track are:

- Current guesses: For rendering and determining how far the game has progessed
- Total guesses allowed: To determine when the game is over
- Target: A cached value that the player is trying to calculate
- Solution: The solution expression
- Completed: A boolean to quickly see if the game is over