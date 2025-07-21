const submit_button = document.getElementById("submit_button");
const reset_button = document.getElementById("reset_button");
const download_button = document.getElementById("download_button");

const select = document.getElementById("expense_type");
const date_field = document.getElementById("date_time_field");
const price_field = document.getElementById("price");
const description = document.getElementById("description");
const custom_input = document.getElementById("custom_type");

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

    if(date === "" || type == "" || price == "" || description == "") {
        alert("Please Enter Every Field");
        return;
    }

    csvData.push([date, type, price, des]);
})

download_button.addEventListener("click", () => {
    const csv_content = csvData.map(row => row.map(escapeCSV).join(",").join("\n"));
    const blob = new Blob([csv_content], {type : "text/csv;charset=utf-8"});
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "expense.csv";
    a.click();

    URL.revokeObjectURL(url);
})

function escapeCSV(value) {
    if(value.includes(",") || value.include('"')) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}