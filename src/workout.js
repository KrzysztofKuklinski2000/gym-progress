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