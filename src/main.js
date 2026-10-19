import './style.css'


const form = document.querySelector('[data-workout-form]');
const list = document.querySelector('[data-sets-list]');
const emptyListMessage = document.querySelector('[data-empty-list-message]')

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.elements.namedItem('name').value.trim();
    const weight = form.elements.namedItem('weight').valueAsNumber;
    const reps = form.elements.namedItem('reps').valueAsNumber;

    if(!name || !Number.isFinite(weight) || !Number.isFinite(reps)) {
        return;
    }

    const volume = calculateVolume(weight, reps);


    const li = document.createElement('li');
    li.textContent = `${name} - ${weight} kg x ${reps} - objętość: ${volume} kg`
    list.append(li);

    emptyListMessage.remove();
})
function calculateVolume(weight, reps) {
    return weight * reps;
}