# Mathler

A NextJS implementation of Mathler

## Stack and Set Up

**Stack**

- NextJS
- React
- CSS Modules
- MUI for dialogs, buttons, and icons
- Notistack for notifications
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

I set up a separate folder for the game with the idea that the game should be playable without a UI. A user can import `src/game/Mathler.ts` and run their own game:

```ts
let game = Mathler.newGame();
if (Mathler.validate('42/2+0', game).valid) {
  game = Mathler.guess('42/2+0', game);
}
```

This also makes it easier to test the game mechanics separately from view rendering.

### Game Math

To evaluate the expressions and check if the solution is reached, I had a few options:

1. Use JS built in eval()
2. Write my own math expression parser
3. Use a library like MathJS

I ended up deciding to use [MathJS](https://mathjs.org/) since there's no need to reinvent the wheel, and it meant I could avoid potentially unsafe eval()s. MathJS also had functions that helped with random number generation, which proved to be useful for generating expressions.

MathJS also supports `symbolicEqual`, which would have let me check if a solution was commutative, but at the time, the latest instance failed to export the type definition for the function.

### Generating Expressions

Perhaps the hardest part of this exercise was figuring out how I wanted to generate the expressions for a new game. There were a couple of constraints that the real Mathler seemed to follow, namely:

1. Use integer division only
2. No negative numbers

Adding on to the fact that expressions had to be exactly 6 characters resulted in a few limits to the types of expressions that could be generated.

1. Single operator expressions

These could lead to large numbers with an expression like 999\*99 and would always follow a 3 digit - op - 2 digit structure.

2. 2 operator expressions

Had the most variety.

3. 3 operator expressions

This was only possible with a + or - at the start, and since we're avoiding negative numbers, I decided to leave them out.

For the sake of **fun**, I wanted to ensure that most of the arithmetic was easily mentally calculatable to avoid users from using an external calculator or additional pen and paper and detracting from the immersion of the game, so I stuck with only 2 operator expressions.

And to avoid having targets of the 2 operator expressions grow too large, I took out expressions with two multipications.

For ease of generation, I also took out expressions with two divisions, since those are a smaller subset of total expression space.

This more or less left `2 digit - op - 1 digit - op 1 digit` type expressions, making for an easier generation process (and easier to test).

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

My goal with this project was to get in as much test coverage as possible, and it was cool to eventually see the `jest --coverage` report reach 100%. There are still a few use cases I skipped over, but I wanted to at least reach every branch.

My strategy for the most part was:

- **Views**: Does everything render correctly depending on which props are set? Am I covering all the use cases?
- **Mocks**: Does this component need to know what the child is doing or is it enough to assume the child works as long as the right props are passed?
- **Game**: Typical unit testing, try to find all the edge cases

This was also the section that took the most amount of time, but it helped me catch a lot of issues I'd missed while building out a quick mvp.

## Future Features

There were a lot of ideas I was considering adding but didn't have the time for including:

- Adding JSDoc support
- Actually having the tiles turn red on error like in the design spec
- More animations: on guess, on win, on lose, on new game
- Show the real solution on loss
- Multiple game modes including a timed mode
- Tracking game stats to localStorage and rendering them in a chart
