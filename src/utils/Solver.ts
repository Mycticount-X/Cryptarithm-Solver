import { evaluate } from 'mathjs';

interface Solution {
    [key: string]: number;
}

export function solveCryptarithm(puzzle: string): Solution | null {
    const equationParts = puzzle.split('===');
    if (equationParts.length !== 2) return null;

    const leftSide = equationParts[0].trim();
    const rightSide = equationParts[1].trim();

    // Extract all unique letters
    const letters = new Set<string>();
    const addLetters = (str: string) => {
        str.split('').forEach(c => {
            if (c >= 'A' && c <= 'Z') letters.add(c);
        });
    };

    addLetters(leftSide);
    addLetters(rightSide);
    const uniqueLetters = Array.from(letters);

    // Generate all possible permutations
    const permutations = generatePermutations(uniqueLetters.length);
    
    for (const perm of permutations) {
        const solution: Solution = {};
        uniqueLetters.forEach((letter, index) => {
            solution[letter] = perm[index];
        });

        // Check if any word starts with 0
        if (hasLeadingZero(leftSide, solution) || hasLeadingZero(rightSide, solution)) {
            continue;
        }

        // Evaluate both sides
        try {
            const leftValue = evaluate(replaceLetters(leftSide, solution));
            const rightValue = evaluate(replaceLetters(rightSide, solution));
            
            if (leftValue === rightValue) {
                return solution;
            }
        } catch (e) {
            continue;
        }
    }

    return null;
}

function generatePermutations(length: number): number[][] {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result: number[][] = [];
    
    function backtrack(current: number[], remaining: number[]) {
        if (current.length === length) {
            result.push([...current]);
            return;
        }
        
        for (let i = 0; i < remaining.length; i++) {
            current.push(remaining[i]);
            const newRemaining = remaining.filter((_, idx) => idx !== i);
            backtrack(current, newRemaining);
            current.pop();
        }
    }
    
    backtrack([], digits);
    return result;
}

function replaceLetters(expression: string, solution: Solution): string {
    let result = expression;
    for (const [letter, digit] of Object.entries(solution)) {
        result = result.replace(new RegExp(letter, 'g'), digit.toString());
    }
    return result;
}

function hasLeadingZero(word: string, solution: Solution): boolean {
    const words = word.split('+').map(w => w.trim());
    return words.some(w => {
        const firstChar = w[0];
        return solution[firstChar] === 0;
    });
}