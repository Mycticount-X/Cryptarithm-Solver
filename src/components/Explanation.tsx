const Explanation = () => {
    return (
        <div className="explanation">
            <h2>What is a Cryptarithm?</h2>
            <p>
                A cryptarithm is a type of mathematical puzzle in which the digits are replaced by letters.
                Each letter represents a unique digit. The goal is to find the digit-to-letter substitution
                that makes the arithmetic equation valid.
            </p>
            
            <h3>How to use this solver:</h3>
            <ol>
                <li>Enter a cryptarithm puzzle in the input field</li>
                <li>Click the "Solve" button</li>
                <li>The solver will attempt to find a digit substitution that makes the equation valid</li>
            </ol>
            
            <h3>Puzzle Format Rules:</h3>
            <ul>
                <li>Use uppercase letters (A-Z)</li>
                <li>Separate words/numbers with +, -, *, / operators</li>
                <li>Use === or = for equality</li>
                <li>No leading zeros (words can't start with 0)</li>
            </ul>
        </div>
    );
};

export default Explanation;