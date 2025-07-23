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

let csvData = [["Date", "Type", "Price", "Description"]];

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
    csvData.push([date, type, price, des]);
    if(!(date_save.value === "on")) {
        date_field.value = "";
    } 
    if(!(type_save.value === "on")) {
        select.value = "";
    } 
    if(!(price_save.value === "on")) {
        price_field.value = "";
    } 
    description.value = "";
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
    csvData = [["Date", "Type", "Price", "Description"]];
})