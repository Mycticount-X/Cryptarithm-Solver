import { useState } from 'react';
import { solveCryptarithm } from '../utils/Solver';

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
            <h1>Cryptarithm Solver</h1>
            
            <div className="input-section">
                <label htmlFor="word1">Word 1</label>
                <input
                    id="word1"
                    type="text"
                    value={word1}
                    onChange={(e) => setWord1(e.target.value.toUpperCase())}
                    placeholder="e.g., CRACK"
                />

                <label htmlFor="word2">Word 2</label>
                <input
                    id="word2"
                    type="text"
                    value={word2}
                    onChange={(e) => setWord2(e.target.value.toUpperCase())}
                    placeholder="e.g., HACK"
                />

                <label htmlFor="result">Result</label>
                <input
                    id="result"
                    type="text"
                    value={result}
                    onChange={(e) => setResult(e.target.value.toUpperCase())}
                    placeholder="e.g., ERROR"
                />

                <button onClick={handleSolve} disabled={isSolving}>
                    {isSolving ? 'Solving...' : 'Solve'}
                </button>
            </div>

            <div className="examples">
                <p>Try these examples:</p>
                <button onClick={() => handleExample('CRACK HACK ERROR')}>CRACK + HACK = ERROR</button>
                <button onClick={() => handleExample('TWO TWO FOUR')}>TWO + TWO = FOUR</button>
                <button onClick={() => handleExample('ADA DI DIA')}>ADA + DI = DIA</button>
            </div>

            {error && <div className="error">{error}</div>}

            {solution && (
                <div className="solution">
                    <h2>Solution:</h2>
                    <ul>
                        {Object.entries(solution).map(([letter, digit]) => (
                            <li key={letter}>
                                {letter} = {digit}
                            </li>
                        ))}
                    </ul>
                    <div className="equation">
                        <p>Substituted equation:</p>
                        <p>
                            {substitute(word1, solution)} + {substitute(word2, solution)} = {substitute(result, solution)}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CryptarithmSolver;