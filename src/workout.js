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

export function groupSetsByExercise(sets) {
    console.log(sets);
    const groupedSets = Object.groupBy(sets, set => set.exercise.trim().toLowerCase());

    for (const exerciseName of Object.keys(groupedSets)) {
        const groupedExercisesByName = groupedSets[exerciseName];

        groupedSets[exerciseName] = {
            exercise: groupedExercisesByName[0].exercise.trim(),
            sets: groupedExercisesByName,
            totalReps: groupedExercisesByName.reduce((sum, set) => sum + set.reps, 0),
            totalVolume: calculateTotalVolume(groupedExercisesByName)
        }
    }

    return Object.values(groupedSets)
}