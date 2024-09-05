import { randomExpression } from './generators';
import { pickRandom, randomInt } from 'mathjs';

// Mock the random functions from mathjs
jest.mock('mathjs', () => ({
  __esModule: true,
  ...jest.requireActual('mathjs'),
  pickRandom: jest.fn(),
  randomInt: jest.fn(),
}));

/**
 * Since we aren't seeding the RNG, we have to mock each call
 * involving randomness. This also makes the test more fragile
 * because it depends on knowing the precise implementation of
 * randomExpression.
 */
describe('randomExpression', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('generates random operators and integers', () => {
    (pickRandom as jest.Mock)
      .mockReturnValueOnce('+')
      .mockReturnValueOnce('-');
    (randomInt as jest.Mock)
      .mockReturnValueOnce(12)
      .mockReturnValueOnce(5)
      .mockReturnValueOnce(3);

    const expression = randomExpression();
    expect(expression).toBe('12+5-3');
  });

  it('handles division and generates correct factors', () => {
    (pickRandom as jest.Mock)
      .mockReturnValueOnce('/')
      .mockReturnValueOnce('+');
    (randomInt as jest.Mock).mockReturnValueOnce(12); // a = 12
    (pickRandom as jest.Mock).mockReturnValueOnce(3); // b = 3
    (randomInt as jest.Mock).mockReturnValueOnce(4); // c = 4

    const expression = randomExpression();
    expect(expression).toBe('12/3+4');
  });

  it('ensures prime numbers are adjusted for division', () => {
    (pickRandom as jest.Mock)
      .mockReturnValueOnce('/')
      .mockReturnValueOnce('+');
    (randomInt as jest.Mock).mockReturnValueOnce(13); // Prime number
    (pickRandom as jest.Mock).mockReturnValueOnce(1);
    (randomInt as jest.Mock).mockReturnValueOnce(5);

    const expression = randomExpression();
    expect(expression).toBe('14/1+5'); // 13 adjusted to 14
  });

  it('ensures negative results are avoided', () => {
    (pickRandom as jest.Mock)
      .mockReturnValueOnce('+')
      .mockReturnValueOnce('-');
    (randomInt as jest.Mock)
      .mockReturnValueOnce(10)
      .mockReturnValueOnce(3); // a = 10, b = 3
    (randomInt as jest.Mock).mockReturnValueOnce(9); // c = 9 (within the range)

    const expression = randomExpression();
    expect(expression).toBe('10+3-9');
  });
});
