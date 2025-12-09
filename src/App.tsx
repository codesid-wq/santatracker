import SantaTracker from './components/SantaTracker';
import { SantaProvider } from './context/SantaContext';

function App() {
  return (
    <SantaProvider>
      <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-900 to-slate-900">
        <SantaTracker />
      </div>
    </SantaProvider>
  );
}

export default App;
