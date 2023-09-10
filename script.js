fetch('https://tot.moli.lat/v1/users/845247450172096532/')
    .then(response => response.json())
    .then(data => {
        const user = data.data;
        const user_info = user.discord_user;
        const username = user_info.username;
        const user_state = user.discord_status;
        const spotify = 'Spotify'

        let status2 = "";

        if (user_state === "dnd") {
            status2 = `<span style="color: #e78284;">in dnd</span>`;
        }
        if (user_state === "idle") {
            status2 = `<span style="color: #e5c890;">Idle</span>`;
        }
        if (user_state === "online") {
            status2 = `<span style="color: #a6d189;">online</span>`;
        }
        if (user_state === "offline") {
            status2 = `<span style="color: #949cbb;">offline</span>`;
        }

        // Display the user's Discord status with colored text
        document.getElementById('user-status').innerHTML = `I am currently ${status2}`;

        // Display the user's Discord username in yellow
        document.getElementById('user-fullname').innerHTML = `You can contact me on Discord: <span style="color: #babbf1;">@${username}</span>`;

        // Check if there is a Visual Studio Code activity
        const activities = user.activities;
        let vscodeActivity = null;

        // Check if the user is listening to Spotify
        const spotifyActivity = activities.find(activity => activity.name === "Spotify");

        if (spotifyActivity) {
            // Display Spotify information with icons and colors
            const song = spotifyActivity.details || "Unknown Song";
            const artist = spotifyActivity.state || "Unknown Artist";
            document.getElementById('spotify-info').innerHTML = 
                `<i class="fab fa-spotify" style="color: #a6d189;"></i> Listening to <span style="color: #a6d189;">${spotify}</span> <span style="color: #AEC6CF;">${song}</span> by ` +
                `<span style="color: #B0E57C;">${artist}</span>`;
        } else {
            // If not listening to Spotify, clear the Spotify info
            document.getElementById('spotify-info').textContent = "Not listening to Spotify.";
        }

        // Iterate through activities and check for variations of "Visual Studio Code"
        activities.forEach(activity => {
            const name = activity.name.toLowerCase();
            if (name.includes("visual studio code") || name.includes("vs code") || name.includes("code") || name.includes('VSCodium')) {
                vscodeActivity = activity;
                return; // Exit the loop once a match is found
            }
        });

        if (vscodeActivity) {
            // Display the Visual Studio Code activity with icons and colors
            const vscodeTitle = vscodeActivity.state || "Unknown Title";
            const vscodeActivityState = vscodeActivity.details || "Unknown State";
            document.getElementById('vscode-activity').innerHTML = 
                `<i class="fas fa-code" style="color: #85c1dc;"></i> VSCode: ` +
                `<span style="color: #85c1dc;">${vscodeTitle}</span> | ` +
                `<span style="color: #ef9f76;">${vscodeActivityState}</span>`;
        } else {
            // If there is no Visual Studio Code activity, you can handle it here
            document.getElementById('vscode-activity').textContent = "I am currently not using VSCode.";
        }
    })
    .catch(error => {
        console.error('Error fetching user status:', error);
    });