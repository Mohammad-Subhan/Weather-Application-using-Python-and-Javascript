document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("#form").addEventListener("submit", function (event) {
        const cityField = document.querySelector("#city-field");
        const errorSpan = document.querySelector("#error-span");
        const inputDiv = document.querySelector(".input-div");

        // Clear previous error message
        errorSpan.textContent = '';

        // Check if the city field is empty
        if (cityField.value.trim() === "") {
            // change color to red
            inputDiv.style.border = "2px solid red";

            // Set error message
            errorSpan.textContent = "*City is required";
            event.preventDefault(); // Prevent form submission
        }
    })
})