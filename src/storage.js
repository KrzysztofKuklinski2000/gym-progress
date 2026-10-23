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