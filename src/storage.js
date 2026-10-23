export function saveWorkout(sets) {
    try {
        const setsJson = JSON.stringify(sets);
        localStorage.setItem('gym-progress:workout', setsJson);

        return true;
    }catch (error){
        console.error(error);
        return false;
    }
}

export function loadWorkout() {
    try {
        const setsJSON = localStorage.getItem('gym-progress:workout');

        if(setsJSON === null) {
            return [];
        }

        const sets = JSON.parse(setsJSON);

        if(!Array.isArray(sets)){
            throw new Error('Dane treningu muszą być tablicą');
        }

        const isValid = sets.every(isValidSet);

        if(!isValid) {
            throw new Error('Niepoprawne dane treningu');
        }

        return sets;

    }catch(error) {
        console.error(error);
        return [];
    }
}

function isValidSet(set) {
    if(set === null || typeof set !== 'object' || Array.isArray(set)){
        return false;
    }

    if (typeof set.id !== 'string' || set.id.trim() === '') {
        return false;
    }

    if (typeof set.exercise !== 'string' || set.exercise.trim() === '') {
        return false;
    }

    if(!Number.isFinite(set.weight) || set.weight < 0) {
        return false;
    }

    if (!Number.isInteger(set.reps) || set.reps <= 0) {
        return false;
    }

    return true;
}