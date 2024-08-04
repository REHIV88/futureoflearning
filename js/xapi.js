// LRS Configuration
const lrsEndpoint = "https://your-lrs-endpoint.com/data/xAPI/";
const username = "lefanu";
const password = "ekdebu";
const auth = "Basic " + btoa(username + ":" + password);

// Actor Information
const actor = {
    "mbox": "mailto:user@example.com", // Replace with user's email or unique identifier
    "name": "John Doe"                // Replace with user's actual name
};

// Function to send xAPI statement
function sendXAPIStatement(event) {
    // Prevent default link behavior
    event.preventDefault();

    // Construct the xAPI statement
    const statement = {
        "actor": actor,
        "verb": {
            "id": "http://adlnet.gov/expapi/verbs/started", // Example verb ID
            "display": { "en-US": "started" }               // Example verb display
        },
        "object": {
            "id": "http://example.com/activities/advance-excel-course", // Replace with your course or activity ID
            "definition": {
                "name": { "en-US": "Advance Excel Course" },            // Replace with course name
                "description": { "en-US": "An advanced course on Excel features." } // Replace with course description
            }
        },
        "timestamp": new Date().toISOString()
    };

    // Send the statement to the LRS
    fetch(lrsEndpoint + "statements", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": auth
        },
        body: JSON.stringify(statement)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        return response.json();
    })
    .then(data => {
        console.log("xAPI statement sent successfully:", data);
        // After sending the xAPI statement, open the link in a new tab
        window.open(event.target.href, '_blank');
    })
    .catch(error => {
        console.error("Failed to send xAPI statement:", error);
    });
}
