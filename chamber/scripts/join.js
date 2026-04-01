
// Timestamp for hidden field
const timestampField = document.querySelector("#timestamp");

if (timestampField) {
    timestampField.value = new Date().toISOString();
}


// OPEN MODALS

const openButtons = document.querySelectorAll(".open-modal");

openButtons.forEach(button => {

    button.addEventListener("click", () => {

        const modalId = button.dataset.modal;

        const modal = document.getElementById(modalId);

        if (modal) {
            modal.showModal();
        }

    });

});


// CLOSE MODALS

const closeButtons = document.querySelectorAll(".close-modal");

closeButtons.forEach(button => {

    button.addEventListener("click", () => {

        const dialog = button.closest("dialog");

        if (dialog) {
            dialog.close();
        }

    });

});