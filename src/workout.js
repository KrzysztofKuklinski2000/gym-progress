export function calculateVolume(weight, reps) {
    return weight * reps;
}

export function calculateTotalVolume(workoutSets) {
    let volume = 0;

    workoutSets.forEach(set => {
        volume += calculateVolume(set.weight, set.reps);
    });

    return volume;
}

export function sortSets(sets, sortBy) {
    const sortedSets = [...sets];

    switch (sortBy) {
        case 'name':
            sortedSets.sort((a,b) => a.exercise.localeCompare(b.exercise, 'pl'));
            break;
        case 'weight-desc':
            sortedSets.sort((a,b) => b.weight - a.weight);
            break;
        case 'volume-desc':
            sortedSets.sort((a,b) =>  calculateVolume(b.weight, b.reps) - calculateVolume(a.weight, a.reps))
            break;
    }

    return sortedSets;
}