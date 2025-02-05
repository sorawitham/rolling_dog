const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

btnSearch.addEventListener("click", searchCondition);
btnClear.addEventListener('click', clearSearch);

function searchCondition() {
    const input = document.getElementById('textInput').value.toLowerCase();
    const inputWithS = input + 's';
    const inputWithEs = input + 'es';
    const inputWithIes = input.slice(0, input.length - 1) + 'ies';
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = "";

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            console.log(data)

            let keyword = "";

            if (data[input]) {
                console.log(data[input])
                keyword = input;
            }

            else if (data[inputWithS]) {
                console.log(data[inputWithS])
                keyword = inputWithS;
            }

            else if (data[inputWithEs]) {
                console.log(data[inputWithEs])
                keyword = inputWithEs;
            }

            else if (data[inputWithIes]) {
                console.log(data[inputWithIes])
                keyword = inputWithIes;
            }

            if (keyword) {
                data[keyword].forEach(element => {
                    if (element.cities) {
                        element.cities.forEach(element => {
                            const newResultDiv = document.createElement('div');
                            let name = element.name;
                            let imageUrl = element.imageUrl;
                            let description = element.description;

                            newResultDiv.innerHTML = `<h1>${name}</h1><br>
                                <img src="${imageUrl}" width="300"><br>
                                <p>${description}</p>`;

                            resultDiv.appendChild(newResultDiv);
                        })
                    }

                    else {
                        const newResultDiv = document.createElement('div');
                        let name = element.name;
                        let imageUrl = element.imageUrl;
                        let description = element.description;

                        newResultDiv.innerHTML = `<h1>${name}</h1><br>
                            <img src="${imageUrl}" width="300"><br>
                            <p>${description}</p>`;

                        resultDiv.appendChild(newResultDiv);
                    }
                });
            }

            else {
                console.log("Search is not found")
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function clearSearch() {
    document.getElementById('textInput').value = "";
    document.getElementById('result').innerHTML = "";
}
