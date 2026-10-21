import './style.css'
import {calculateVolume, calculateTotalVolume} from "./workout.js";

const form = document.querySelector('[data-workout-form]');
const list = document.querySelector('[data-sets-list]');
const emptyListMessage = document.querySelector('[data-empty-list-message]')
const summaryElement = document.querySelector('[data-workout-summary]');
const cancelButton = form.querySelector('[data-cancel-edit]');
const submitLabel = form.querySelector('[data-submit-label]');

let workoutSets = [];
let editingSetId = null;

function handleFormSubmit(event) {
    event.preventDefault();

    const {exercise, weight, reps} = readFormValues();

    if (!exercise || !Number.isFinite(weight) || !Number.isFinite(reps)) {
        return;
    }

    if (editingSetId === null) {
        const exerciseSet = {
            id: crypto.randomUUID(),
            exercise,
            weight,
            reps
        };

        workoutSets.push(exerciseSet);
    } else {
        workoutSets = workoutSets.map(set => {
            if (set.id === editingSetId) {
                return {
                    id: editingSetId,
                    exercise,
                    weight,
                    reps
                }
            } else {
                return set;
            }
        })
    }

    renderWorkout(workoutSets);
    resetForm();
}

function handleListClick(event) {
    const removeButton = event.target.closest('[data-remove-set]');
    const editButton = event.target.closest('[data-edit-set]');

    if (removeButton) {
        removeSet(removeButton.dataset.removeSet);
        return;
    }

    if (editButton) {
        startEditingSet(editButton.dataset.editSet);
    }

}

function startEditingSet(id) {
    const editingSet = workoutSets.find(set => set.id === id);

    if (!editingSet) return;

    editingSetId = id;

    form.elements.namedItem('name').value = editingSet.exercise;
    form.elements.namedItem('weight').value = editingSet.weight;
    form.elements.namedItem('reps').value = editingSet.reps;



    submitLabel.textContent = 'Zapisz zmiany';
    cancelButton.hidden = false;
    form.elements.namedItem('name').focus();
}

function removeSet(id) {
    workoutSets = workoutSets.filter(set => set.id !== id);

    if (id === editingSetId) {
        resetForm();
    }

    renderWorkout(workoutSets);
}

function readFormValues() {
    const exercise = form.elements.namedItem('name').value.trim();
    const weight = form.elements.namedItem('weight').valueAsNumber;
    const reps = form.elements.namedItem('reps').valueAsNumber;

    return {exercise, weight, reps};
}


function resetForm() {
    editingSetId = null;
    form.reset();

    submitLabel.textContent = 'Dodaj serię';
    cancelButton.hidden = true;
}


function renderWorkout(workoutSets) {
    list.replaceChildren();
    summaryElement.textContent = `Serie: ${workoutSets.length} - Łączna objętość: ${calculateTotalVolume(workoutSets)} kg`

    workoutSets.forEach(set => {
        list.append(createSetElement(set));
    });

    emptyListMessage.hidden = workoutSets.length > 0;
}

function createSetElement(set) {
    const volume = calculateVolume(set.weight, set.reps);

    const li = document.createElement('li');
    const removeButton = document.createElement('button');
    const editButton = document.createElement('button')

    const description = document.createElement('span');
    description.className = 'set-description';
    description.textContent = `${set.exercise} - ${set.weight} kg x ${set.reps} - objętość: ${volume} kg`;

    removeButton.type = 'button';
    removeButton.textContent = 'Usuń';
    removeButton.setAttribute('data-remove-set', set.id);


    editButton.type = 'button';
    editButton.textContent = 'Edytuj';
    editButton.setAttribute('data-edit-set', set.id);

    const actions = document.createElement('div');
    actions.className = 'set-actions';
    editButton.className = 'set-button set-button-edit';
    removeButton.className = 'set-button set-button-remove';
    actions.append(editButton, removeButton);
    li.append(description, actions);

    return li;

}


form.addEventListener('submit', handleFormSubmit);
list.addEventListener('click', handleListClick);
cancelButton.addEventListener('click', resetForm);
renderWorkout(workoutSets);