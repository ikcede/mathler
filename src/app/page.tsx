import GameWrapper from '@/components/game-wrapper/GameWrapper';
import styling from './page.module.css';

export default function Page() {
  return (
    <div className={styling.app}>
      <header>
        <h1>Mathler</h1>
      </header>
      <main>
        <GameWrapper />
      </main>
    </div>
  );
}
