import { Component, createSignal, For, onCleanup } from 'solid-js';
import { createStore } from 'solid-js/store';
import createWow from './createWow';

const enum State {
  Empty,
  Food,
  Snake,
}

const randomNumber = (max: number) => Math.floor(Math.random() * max);

function randomElement<T>(array: readonly T[]): T {
  return array[randomNumber(array.length)];
}

const enum Direction {
  Up,
  Left,
  Down,
  Right,
}

const toArrowKey = (key: string): Direction | null => {
  if (key === 'ArrowUp' || key === 'w') return Direction.Up;
  if (key === 'ArrowLeft' || key === 'a') return Direction.Left;
  if (key === 'ArrowDown' || key === 's') return Direction.Down;
  if (key === 'ArrowRight' || key === 'd') return Direction.Right;
  return null;
};

const isValidMove = (current: Direction, queued: Direction): boolean =>
  ((current === Direction.Up || current === Direction.Down) &&
    queued !== Direction.Up &&
    queued !== Direction.Down) ||
  ((current === Direction.Right || current === Direction.Left) &&
    queued !== Direction.Right &&
    queued !== Direction.Left);

const BOARD_SIZE = 20;
const newBoard = (): State[][] =>
  Array.from({ length: BOARD_SIZE }, () =>
    new Array(BOARD_SIZE).fill(State.Empty),
  );

type Location = { x: number; y: number };

const STARTING_TICK = 350;
const MIN_TICK = 100;

const App: Component = () => {
  const [board, setBoard] = createStore(newBoard());
  const [score, setScore] = createSignal(0);
  const [timer, setTimer] = createSignal<number | undefined>();
  const [paused, setPaused] = createSignal(false);
  const wow = createWow();

  let direction = randomElement([
    Direction.Up,
    Direction.Left,
    Direction.Down,
    Direction.Right,
  ]);
  let queuedDirection = direction;
  let tick = STARTING_TICK;
  let food: Location;
  const snake: Location[] = [];
  const queuedSegments: Location[] = [];

  const handleKeyDown = (e: KeyboardEvent): void => {
    const newDirection = toArrowKey(e.key);
    if (newDirection !== null) {
      e.preventDefault();
      queuedDirection = newDirection;
    }
  };
  document.addEventListener('keydown', handleKeyDown);

  onCleanup(() => {
    clearTimeout(timer());
    document.removeEventListener('keydown', handleKeyDown);
  });

  const paintSnake = (): boolean => {
    let [{ x, y }] = snake;
    const tail = snake.pop()!;

    if (direction === Direction.Down) {
      y += 1;
    } else if (direction === Direction.Up) {
      y -= 1;
    } else if (direction === Direction.Right) {
      x += 1;
    } else if (direction === Direction.Left) {
      x -= 1;
    }

    if (board[y]?.[x] === undefined || board[y][x] === State.Snake) {
      return false;
    }

    const newTail = queuedSegments.pop();
    if (newTail) {
      snake.push(newTail);
    } else {
      setBoard(tail.y, tail.x, State.Empty);
    }

    setBoard(y, x, State.Snake);
    snake.unshift({ x, y });
    return true;
  };

  const setFood = (): boolean => {
    const newFood = randomElement(
      board.flatMap((row, y) =>
        row
          .map((cell, x) => (cell === State.Empty ? { x, y } : null))
          .filter(Boolean),
      ),
    );

    if (newFood === null) return false;
    food = newFood;
    setBoard(food.y, food.x, State.Food);
    return true;
  };

  const stop = (shouldPause = false) => {
    setPaused(shouldPause);
    clearTimeout(timer());
    setTimer(undefined);
  };

  const loop = () => {
    const loopStart = Date.now();

    if (isValidMove(direction, queuedDirection)) direction = queuedDirection;

    if (!paintSnake()) {
      stop();
      return;
    }

    const [head] = snake;
    if (head.x === food.x && head.y === food.y) {
      wow();
      setScore((prev) => prev + 10);
      const tail = snake.at(-1)!;
      queuedSegments.push({ ...tail });
      queuedSegments.push({ ...tail });
      queuedSegments.push({ ...tail });
      if (!setFood()) {
        // you won
        stop();
        return;
      }
    }

    const wait = tick - (Date.now() - loopStart);
    tick = Math.max(STARTING_TICK - Math.floor(score() / 100) * 10, MIN_TICK);
    // console.log('looping in', wait, 'ms. new tick:', tick);
    setTimer(setTimeout(loop, wait));
  };

  const start = () => {
    if (!paused()) {
      snake.length = 0;
      tick = STARTING_TICK;
      setScore(0);
      setBoard(newBoard());

      snake.push({
        x: randomNumber(BOARD_SIZE - 10) + 5,
        y: randomNumber(BOARD_SIZE - 10) + 5,
      });
      paintSnake();
      setFood();
    }
    setPaused(false);
    setTimer(setTimeout(loop, tick));
  };

  return (
    <div class="flex min-h-screen w-full flex-col items-center justify-center space-y-6 bg-black text-white">
      <span>Score: {score()}</span>
      <div class="grid grid-cols-[repeat(20,_minmax(0,_1fr))]">
        <For each={board}>
          {(row) => (
            <For each={row}>
              {(state) => (
                <div
                  class="h-5 w-5 outline outline-1 outline-stone-700"
                  classList={{
                    'bg-stone-900': state === State.Empty,
                    'bg-red-500': state === State.Food,
                    'bg-green-500': state === State.Snake,
                  }}
                />
              )}
            </For>
          )}
        </For>
      </div>
      <div class="space-x-2">
        <button
          type="button"
          class="rounded-md bg-green-500 py-1 px-2 text-stone-900 transition hover:bg-green-400 disabled:bg-green-300"
          onClick={start}
          disabled={timer() !== undefined}
        >
          Start
        </button>
        <button
          type="button"
          class="rounded-md bg-yellow-500 py-1 px-2 text-stone-900 transition hover:bg-yellow-400 disabled:bg-yellow-300"
          onClick={() => stop(true)}
          disabled={timer() === undefined}
        >
          Pause
        </button>
        <button
          type="button"
          class="rounded-md bg-red-500 py-1 px-2 text-stone-900 transition hover:bg-red-400 disabled:bg-red-300"
          onClick={() => stop()}
          disabled={!paused() && timer() === undefined}
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default App;
