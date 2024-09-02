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

These would become the main variables of the [GameState](/src/components/game/GameState.ts) that I use to pass around specific instances of a game.

**Pros**: 

- Any one instance of a Game to be fully represented by a GameState
- By not representation a temporary state (user input before a valid guess), I can avoid rerendering most components that depend on the game state
- Game states can be saved and loaded, potentially for a puzzle mode

**Cons**:

- Since I'm storing guesses and the solution as strings, I might need to transform them into expressions for validation, which can be an expensive process
- Needing to track the active row separately since I can't directly modify the guess string

### Mathler.ts



## FE Technical Design

For the front-end game component, I focused on separating out each meaningful element of the view into small modular components.

For the game, this led to the following components:

- [Key](/src/components/mathler/key): Individual keys that the user can click
- [Keyboard](/src/components/mathler/keyboard): Used to render lists of Keys and pass through click events from Keys to the parent Game
- [Tile](/src/components/mathler/tile): An individual tile that reflected inputted keys
- [Row](/src/components/mathler/row): A row of Tiles that passes through Tile values and display states
- [Game](/src/components/mathler/game): The main view that controls all Tiles and Keys and their states 

### Development Process

Initially, I thought it could be helpful to have Rows figure out Tile display states, but after testing a quick implementation, I realized that to account for the requirement of allowing multiple occurences of the same number or operator would need me to rebuild a solution character hash every rerender. As a result, I abstracted out all the logic from the Key, Keyboard, Row, and Tile components to keep them view focused. 

I also decided to shift some shared states and constants into [util/constants](/src/components/mathler/util/constants.ts) to keep the Game component cleaner and to share DisplayStates across view components.

## Testing
