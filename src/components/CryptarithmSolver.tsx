import { useState } from 'react';
import { solveCryptarithm } from '../utils/Solver';
import './App.css';

const CryptarithmSolver = () => {
    const [word1, setWord1] = useState('');
    const [word2, setWord2] = useState('');
    const [result, setResult] = useState('');
    const [solution, setSolution] = useState<{ [key: string]: number } | null>(null);
    const [error, setError] = useState('');
    const [isSolving, setIsSolving] = useState(false);

    const handleSolve = () => {
        if (!word1 || !word2 || !result) {
            setError('Please fill in all fields');
            return;
        }

        setIsSolving(true);
        setError('');
        
        try {
            const puzzle = `${word1} + ${word2} === ${result}`;
            const solved = solveCryptarithm(puzzle);
            
            if (solved) {
                setSolution(solved);
            } else {
                setError('No solution found for this puzzle.');
                setSolution(null);
            }
        } catch (err) {
            setError('An error occurred while solving the puzzle.');
            setSolution(null);
        } finally {
            setIsSolving(false);
        }
    };

    const handleExample = (example: string) => {
        const [w1, w2, res] = example.split(' ');
        setWord1(w1);
        setWord2(w2);
        setResult(res);
        setSolution(null);
        setError('');
    };

    const substitute = (word: string, sol: { [key: string]: number }) => {
        return word.split('').map(c => sol[c] !== undefined ? sol[c] : c).join('');
    };

    return (
        <div className="cryptarithm-solver">
            <div className="equation-display">
                <div className="equation-row">
                    <div className="equation-input">
                        <label htmlFor="word1">Word 1</label>
                        <input
                            id="word1"
                            type="text"
                            value={word1}
                            onChange={(e) => setWord1(e.target.value.toUpperCase())}
                            placeholder="e.g., SEND"
                        />
                    </div>
                </div>
                
                <div className="equation-row">
                    <div className="equation-input">
                        <label htmlFor="word2">Word 2</label>
                        <input
                            id="word2"
                            type="text"
                            value={word2}
                            onChange={(e) => setWord2(e.target.value.toUpperCase())}
                            placeholder="e.g., MORE"
                        />
                    </div>
                    <div className="equation-operator">+</div>
                </div>
                
                <div className="divider"></div>
                
                <div className="equation-row">
                    <div className="equation-input">
                        <label htmlFor="result">Result</label>
                        <input
                            id="result"
                            type="text"
                            value={result}
                            onChange={(e) => setResult(e.target.value.toUpperCase())}
                            placeholder="e.g., MONEY"
                        />
                    </div>
                </div>
            </div>

            <button 
                className="solve-btn" 
                onClick={handleSolve} 
                disabled={isSolving}
            >
                {isSolving ? 'Solving...' : 'Solve Puzzle'}
            </button>

            <div className="examples">
                <p>Try these examples:</p>
                <button 
                    className="example-btn" 
                    onClick={() => handleExample('SEND MORE MONEY')}
                >
                    SEND + MORE = MONEY
                </button>
                <button 
                    className="example-btn" 
                    onClick={() => handleExample('TWO TWO FOUR')}
                >
                    TWO + TWO = FOUR
                </button>
                <button 
                    className="example-btn" 
                    onClick={() => handleExample('CRACK HACK ERROR')}
                >
                    CRACK + HACK = ERROR
                </button>
            </div>

            {error && <div className="error">{error}</div>}

            {solution && (
                <div className="solution">
                    <h2>Solution Found!</h2>
                    <ul>
                        {Object.entries(solution).map(([letter, digit]) => (
                            <li key={letter}>
                                {letter} = {digit}
                            </li>
                        ))}
                    </ul>
                    
                    <div className="solution-equation">
                        <p>{substitute(word1, solution)}</p>
                        <p>+ {substitute(word2, solution)}</p>
                        <hr />
                        <p>{substitute(result, solution)}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CryptarithmSolver;