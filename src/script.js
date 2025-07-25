const submit_button = document.getElementById("submit_button");
const reset_button = document.getElementById("reset_button");
const download_button = document.getElementById("download_button");
const reset_csv_button = document.getElementById("reset_csv");

const select = document.getElementById("expense_type");
const date_field = document.getElementById("date_time_field");
const price_field = document.getElementById("price");
const description = document.getElementById("description");
const custom_input = document.getElementById("custom_type");

const date_save = document.getElementById("date_save");
const type_save = document.getElementById("type_save");
const price_save = document.getElementById("price_save");

const table = document.getElementById("csv_table");

let csvData = [["ID", "Date", "Type", "Price", "Description"]];
const storedData = localStorage.getItem("csvData");
if(storedData) {
    try {
        csvData = JSON.parse(storedData);
    } catch (e) {
        console.error("Error Parsing Stored CSV Data:", e);
        csvData = [["ID", "Date", "Type", "Price", "Description"]];
    }
}

updateTable();

select.onchange = () => {
    const custom_type = document.getElementById("custom_type_container");
    if(select.value === "other") {
        custom_type.style.display = "block";
    } else {
        custom_type.style.display = "none";
    }
}

submit_button.addEventListener("click", () => {
    const date = date_field.value;
    let type = select.value;
    const price = price_field.value;
    const des = description.value;

    if(type === "other") {
        type = custom_input.value.trim();
    }

    if (date === "" || type === "" || price === "" || des === "") {
        alert("Please Enter Every Field");
        return;
    }
    let curr_id = csvData.length;
    csvData.push([curr_id, date, type, price, des]);
    if (!date_save.checked) {
    	date_field.value = "";
	}
    if (!type_save.checked) {
    	select.value = "";
    	custom_input.value = "";
	}
	if (!price_save.checked) {
   	 	price_field.value = "";
	}
    description.value = "";
    updateTable();
    localStorageUpdate();
})

download_button.addEventListener("click", () => {
    const csvString = csvData.map(row => row.join(",")).join("\n");
    const blob = new Blob([csvString], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expense.csv";
    a.click();

    setTimeout(() => URL.revokeObjectURL(url), 100);
})

reset_button.addEventListener("click", () => {
    date_field.value = "";
    select.value = "";
    price_field.value = "";
    description.value = "";
})

reset_csv_button.addEventListener("click", () => {
    csvData = [["ID", "Date", "Type", "Price", "Description"]];
    updateTable();
    localStorage.removeItem("csvData");
})

function updateTable() {
    table.innerHTML = "";

    csvData.forEach((row, rowIndex) => {
        const tr = document.createElement("tr");
        row.forEach(cell => {
            const cellElement = document.createElement(rowIndex == 0 ? "th" : "td");
            cellElement.innerHTML = cell;
            tr.appendChild(cellElement);
        });

        if(rowIndex != 0) {
            const deleteCell = document.createElement("td");
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "delete";
            deleteBtn.style.cursor = "pointer";
            deleteBtn.addEventListener("click", () => {
                csvData.splice(rowIndex, 1);
                reassignID();
                updateTable();
                localStorageUpdate();
            })
            deleteCell.appendChild(deleteBtn);
            tr.appendChild(deleteCell);
        }

        table.appendChild(tr);
    });
}

function reassignID() {
    for(let i = 1; i < csvData.length; i++) {
        csvData[i][0] = i;
    }
}

function localStorageUpdate() {
    localStorage.setItem("csvData", JSON.stringify(csvData));
}