import './style.css'
import {calculateVolume, calculateTotalVolume} from "./workout.js";

const form = document.querySelector('[data-workout-form]');
const list = document.querySelector('[data-sets-list]');
const emptyListMessage = document.querySelector('[data-empty-list-message]')
const summaryElement = document.querySelector('[data-workout-summary]');
const cancelButton = form.querySelector('[data-cancel-edit]');
const submitLabel = form.querySelector('[data-submit-label]');

let workoutSets = [];
let editingSetId  = null;

renderWorkout(workoutSets);

cancelButton.addEventListener('click', resetForm);

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.namedItem('name').value.trim();
    const weight = form.elements.namedItem('weight').valueAsNumber;
    const reps = form.elements.namedItem('reps').valueAsNumber;

    if(!name || !Number.isFinite(weight) || !Number.isFinite(reps)) {
        return;
    }
    if(editingSetId === null) {
        const exerciseSet = {
            id: crypto.randomUUID(),
            exercise: name,
            weight,
            reps
        };

        workoutSets.push(exerciseSet);
    }else {
        workoutSets = workoutSets.map(set => {
            if(set.id === editingSetId) {
                return {
                    id: editingSetId,
                    exercise: name,
                    weight,
                    reps
                }
            }else {
                return set;
            }
        })
    }

    renderWorkout(workoutSets);
    resetForm();

})

function renderWorkout(workoutSets) {
    list.replaceChildren();
    summaryElement.textContent = `Serie: ${workoutSets.length} - Łączna objętość: ${calculateTotalVolume(workoutSets)} kg`

    workoutSets.forEach(set => {
        const volume = calculateVolume(set.weight, set.reps);

        const li = document.createElement('li');
        const removeButton = document.createElement('button');
        const editButton = document.createElement('button')

        removeButton.type = 'button';
        removeButton.textContent = 'Usuń';
        removeButton.setAttribute('data-remove-set', set.id);


        editButton.type = 'button';
        editButton.textContent = 'Edytuj';
        editButton.setAttribute('data-edit-set', set.id);

        const description = document.createElement('span');
        description.className = 'set-description';
        description.textContent = `${set.exercise} - ${set.weight} kg x ${set.reps} - objętość: ${volume} kg`;

        const actions = document.createElement('div');
        actions.className = 'set-actions';
        editButton.className = 'set-button set-button-edit';
        removeButton.className = 'set-button set-button-remove';
        actions.append(editButton, removeButton);
        li.append(description, actions);

        list.append(li);
    });

    emptyListMessage.hidden = workoutSets.length > 0;
}

list.addEventListener('click', (event) => {
    const removeButton = event.target.closest('[data-remove-set]');
    const editButton = event.target.closest('[data-edit-set]');

    if(removeButton) {
        const attributeValue = removeButton.getAttribute('data-remove-set');
        workoutSets = workoutSets.filter(set => set.id !== attributeValue);

        if (attributeValue === editingSetId) {
            resetForm();
        }
    }

    if(editButton) {
        editingSetId = editButton.getAttribute('data-edit-set');
        const editingSet = workoutSets.find(set => set.id === editingSetId);

        form.elements.namedItem('name').value = editingSet.exercise;
        form.elements.namedItem('weight').value = editingSet.weight;
        form.elements.namedItem('reps').value = editingSet.reps;


        submitLabel.textContent = 'Zapisz zmiany';
        cancelButton.hidden = false;
    }



    renderWorkout(workoutSets);
})

function resetForm() {
    editingSetId = null;
    form.reset();

    submitLabel.textContent = 'Dodaj serię';
    cancelButton.hidden = true;
}
