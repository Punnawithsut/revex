let storedData = localStorage.getItem("csvData");
if (!storedData) {
  alert("There isn't any Expense Information");
} else {
  let csvData = JSON.parse(storedData); // [["ID", "Date", "Type", "Price", "Description"]

  let arr = [0, 0, 0, 0]; // food, leisure, travel, other

  for (let i = 1; i < csvData.length; i++) {
    let type = csvData[i][2];
    let price = parseFloat(csvData[i][3]);

    if (type === "food") {
      arr[0] += price;
    } else if (type === "leisure") {
      arr[1] += price;
    } else if (type === "travel") {
      arr[2] += price;
    } else {
      arr[3] += price;
    }
  }

  let colors = ["#77b052", "#558343", "#396b25", "#285516"];
  const ctx = document.getElementById("myChart").getContext("2d");

  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["food", "leisure", "travel", "other"],
      datasets: [{
        backgroundColor: colors,
        data: arr
      }]
    },
    options: {
      plugins: {
        title: {
          display: true,
          text: "Expense"
        }
      }
    }
  });
}

async function getAIAdvice(prompt) {
    const API_KEY = "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";

    try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body : JSON.stringify({
                model: "meta-llama/llama-3-8b-instruct",
                messages : [
                    {role: "user", content: prompt}
                ]
            })
        });

        if(!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return data.choices?.[0]?.message?.content || "No advice received.";
    } catch (e) {
        return `Error: ${e.message}`;
    }
}

document.getElementById("getAdviceBtn").onclick = async () => {
  const prompt = document.getElementById("userPrompt").value.trim();
  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }
  document.getElementById("aiResult").textContent = "Loading...";
  const advice = await getAIAdvice(prompt);
  document.getElementById("aiResult").textContent = advice;
};