import CryptarithmSolver from './components/CryptarithmSolver';
import Explanation from './components/Explanation';
import './App.css';

function App() {
    return (
        <div className="app">
            <main>
                <CryptarithmSolver />
                <Explanation />
            </main>
            <footer>
                <p>Copyright &copy; 2025 Mycticount Xeta Ahlovely</p>
            </footer>
        </div>
    );
}

export default App;