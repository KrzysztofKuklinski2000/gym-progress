import {test} from 'node:test';
import assert from 'node:assert/strict';
import {calculateVolume, calculateTotalVolume} from "./workout.js";


test('calculates volume for one set', () => {
    const result = calculateVolume(40, 8);

    assert.equal(result, 320);
})

test('calculates volume for one set with decimal weight', () => {
    const result = calculateVolume(42.5, 8);

    assert.equal(result, 340);
})


test('calculates volume for 0 weight', () => {
    const result = calculateVolume(0, 8);

    assert.equal(result, 0);
})

test('calculates volume for 0 sets', () => {
    const result = calculateTotalVolume([]);

    assert.equal(result, 0);
})

test('calculates volume for 2 sets', () => {
    const sets = [
        {
            exercise: 'Wyciskanie na sztandze',
            weight: 40,
            reps: 8
        },
        {
            exercise: 'Wyciskanie na sztandze',
            weight: 42.5,
            reps: 8
        }
    ]
    const result = calculateTotalVolume(sets);

    assert.equal(result, 660);
})