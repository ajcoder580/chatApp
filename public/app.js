document.addEventListener('DOMContentLoaded', () => {
    // Select all delete forms
    const deleteForms = document.querySelectorAll('form[action*="?_method=DELETE"]');

    // Add event listener to each delete form
    deleteForms.forEach((form) => {
        form.addEventListener('submit', (event) => {
            const confirmation = confirm("Are you sure you want to delete this chat?");
            if (!confirmation) {
                // Prevent form submission if the user cancels
                event.preventDefault();
                console.log("Chat deletion canceled.");
            }
        });
    });
});
