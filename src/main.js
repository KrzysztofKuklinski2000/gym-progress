import './style.css'


const form = document.querySelector('[data-workout-form]');
const list = document.querySelector('[data-sets-list]');
const emptyListMessage = document.querySelector('[data-empty-list-message]')
const summaryElement = document.querySelector('[data-workout-summary]');

const workoutSets = [];

renderWorkout(workoutSets);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.namedItem('name').value.trim();
    const weight = form.elements.namedItem('weight').valueAsNumber;
    const reps = form.elements.namedItem('reps').valueAsNumber;

    if(!name || !Number.isFinite(weight) || !Number.isFinite(reps)) {
        return;
    }

    const exerciseSet = {
        exercise: name,
        weight,
        reps
    };

    workoutSets.push(exerciseSet);
    renderWorkout(workoutSets);


})
function calculateVolume(weight, reps) {
    return weight * reps;
}

function calculateTotalVolume(workoutSets) {
    let volume = 0;

    workoutSets.forEach(set => {
        volume += calculateVolume(set.weight, set.reps);
    });

    return volume;
}

function renderWorkout(workoutSets) {
    list.replaceChildren();
    summaryElement.textContent = `Serie: ${workoutSets.length} - Łączna objętość: ${calculateTotalVolume(workoutSets)} kg`

    workoutSets.forEach(set => {
        const volume = calculateVolume(set.weight, set.reps);

        const li = document.createElement('li');
        li.textContent = `${set.exercise} - ${set.weight} kg x ${set.reps} - objętość: ${volume} kg`
        list.append(li);
    });

    emptyListMessage.hidden = workoutSets.length > 0;
}