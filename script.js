// script.js
document.addEventListener("DOMContentLoaded", async () => {
    const countrySelect = document.getElementById("country");
    const phoneCodeInput = document.getElementById("phoneCode");

    // Fetch data from data.json
    const response = await fetch("data.json");
    const data = await response.json();

    // Populate Country select options
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.Country;
        option.textContent = item.Country;
        countrySelect.appendChild(option);
    });

    // Event listener for selecting Country
    countrySelect.addEventListener("change", () => {
        const selectedCountry = countrySelect.value;
        const CountryData = data.find(item => item.Country === selectedCountry);
        
        if (CountryData) {
            if (Array.isArray(CountryData.Phonenumbercode)) {
                phoneCodeInput.value = CountryData.Phonenumbercode.join("; ");
            } else {
                phoneCodeInput.value = CountryData.Phonenumbercode;
            }
        } else {
            phoneCodeInput.value = "";
        }
    });

    // Event listener for typing plate Phonenumbercode
    phoneCodeInput.addEventListener("input", () => {
        const Phonenumbercode = phoneCodeInput.value;
        const CountryData = data.find(item => 
            Array.isArray(item.Phonenumbercode)
                ? item.Phonenumbercode.includes(Phonenumbercode)
                : item.Phonenumbercode === Phonenumbercode
        );

        if (CountryData) {
            countrySelect.value = CountryData.Country;
        } else {
            countrySelect.value = "";
        }
    });
});
