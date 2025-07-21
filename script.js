
const select = document.getElementById("expense_type");
select.onchange = () => {
    const custom_type = document.getElementById("custom_type_container");
    if(select.value === "other") {
        custom_type.style.display = "block";
    } else {
        custom_type.style.display = "none";
    }
}