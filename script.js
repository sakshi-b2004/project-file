async function fetchAnswer() {
    // User se question lene ki process
    const question = document.getElementById('question').value;  // "question" input field se value lena

    // Agar question empty ho toh error message show karna
    if (question.trim() === "") {
        alert("Please enter a question!");
        return;
    }

    try {
        // Fetch request backend API se data lene ke liye
        const response = await fetch('http://localhost:3000/get-answer', {  // Backend ka URL yahan specify karein
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',  // Content type ko specify karte hain
            },
            body: JSON.stringify({ question: question })  // Frontend se question ko JSON format mein bhejna
        });

        // Backend se response milne ke baad, uska answer display karna
        const data = await response.json();  // Backend se JSON response lena
        document.getElementById('answer').textContent = data.answer || "Sorry, I couldn't find an answer.";  // Answer ko display karna

    } catch (error) {
        document.getElementById('answer').textContent = "Something went wrong. Please try again.";  // Agar koi error ho toh message dikhana
        console.error(error);  // Error ko console pe log karna
    }
}