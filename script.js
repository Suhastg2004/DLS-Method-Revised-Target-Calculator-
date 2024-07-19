$(document).ready(function() {
    // Hide the result initially
    $('#result').hide();

    // Add hover effects to the button
    $('#calculateButton').hover(
        function() {
            $(this).animate({ opacity: 0.7 }, 200);
        },
        function() {
            $(this).animate({ opacity: 1 }, 200);
        }
    );

    // Add click effect to the button
    $('#calculateButton').click(function() {
        $(this).animate({ opacity: 0.5 }, 100).animate({ opacity: 1 }, 100);
        calculateTarget();
    });
});


function calculateTarget() {
    // Get input values
    const format = $('#format').val();
    const team1Score = parseFloat($('#team1Score').val());
    const team2OversRemaining = parseFloat($('#team2OversRemaining').val());
    const team2WicketsLost = parseFloat($('#team2WicketsLost').val());

    // Validate inputs
    if (isNaN(team1Score) || isNaN(team2OversRemaining) || isNaN(team2WicketsLost)) {
        alert("Please enter valid inputs.");
        return;
    }

    // Resource percentage tables for ODI and T20
    const resourcePercentageTableODI = [
        [100.0, 93.4, 85.1, 74.9, 62.7, 49.0, 34.9, 22.0, 11.9, 4.7], // 50 overs remaining
        [99.1, 92.6, 84.5, 74.4, 62.5, 48.9, 34.9, 22.0, 11.9, 4.7], // 49 overs remaining
        [98.1, 91.7, 83.8, 74.0, 62.2, 48.8, 34.9, 22.0, 11.9, 4.7], // 48 overs remaining
        [97.1, 90.9, 83.2, 73.5, 61.9, 48.6, 34.9, 22.0, 11.9, 4.7], // 47 overs remaining
        [96.1, 90.0, 82.5, 73.0, 61.6, 48.5, 34.8, 22.0, 11.9, 4.7], // 46 overs remaining
        [95.0, 89.1, 81.8, 72.5, 61.3, 48.4, 34.8, 22.0, 11.9, 4.7], // 45 overs remaining
        [93.9, 88.2, 81.0, 72.0, 61.0, 48.3, 34.8, 22.0, 11.9, 4.7], // 44 overs remaining
        [92.8, 87.3, 80.3, 71.4, 60.7, 48.1, 34.7, 22.0, 11.9, 4.7], // 43 overs remaining
        [91.7, 86.3, 79.5, 70.9, 60.3, 47.9, 34.7, 22.0, 11.9, 4.7], // 42 overs remaining
        [90.5, 85.3, 78.7, 70.3, 59.9, 47.8, 34.6, 22.0, 11.9, 4.7], // 41 overs remaining
        [89.3, 84.2, 77.8, 69.6, 59.5, 47.6, 34.6, 22.0, 11.9, 4.7], // 40 overs remaining
        [88.0, 83.1, 76.9, 69.0, 59.1, 47.4, 34.5, 22.0, 11.9, 4.7], // 39 overs remaining
        [86.7, 82.0, 76.0, 68.3, 58.7, 47.1, 34.5, 21.9, 11.9, 4.7], // 38 overs remaining
        [85.4, 80.9, 75.0, 67.6, 58.2, 46.9, 34.4, 21.9, 11.9, 4.7], // 37 overs remaining
        [84.1, 79.7, 74.1, 66.8, 57.7, 46.6, 34.3, 21.9, 11.9, 4.7], // 36 overs remaining
        [82.7, 78.5, 73.0, 66.0, 57.2, 46.4, 34.2, 21.9, 11.9, 4.7], // 35 overs remaining
        [81.3, 77.2, 72.0, 65.2, 56.6, 46.1, 34.1, 21.9, 11.9, 4.7], // 34 overs remaining
        [79.8, 75.9, 70.9, 64.4, 56.0, 45.8, 34.0, 21.9, 11.9, 4.7], // 33 overs remaining
        [78.3, 74.6, 69.7, 63.5, 55.4, 45.4, 33.9, 21.9, 11.9, 4.7], // 32 overs remaining
        [76.7, 73.2, 68.6, 62.5, 54.8, 45.1, 33.7, 21.9, 11.9, 4.7], // 31 overs remaining
        [75.1, 71.8, 67.3, 61.6, 54.1, 44.7, 33.6, 21.8, 11.9, 4.7], // 30 overs remaining
        [73.5, 70.3, 66.1, 60.5, 53.4, 44.2, 33.4, 21.8, 11.9, 4.7], // 29 overs remaining
        [71.8, 68.8, 64.8, 59.5, 52.6, 43.8, 33.2, 21.8, 11.9, 4.7], // 28 overs remaining
        [70.1, 67.2, 63.4, 58.4, 51.8, 43.3, 33.0, 21.7, 11.9, 4.7], // 27 overs remaining
        [68.3, 65.6, 62.0, 57.2, 50.9, 42.8, 32.8, 21.7, 11.9, 4.7], // 26 overs remaining
        [66.5, 63.9, 60.5, 56.0, 50.0, 42.2, 32.6, 21.6, 11.9, 4.7], // 25 overs remaining
        [64.6, 62.2, 59.0, 54.7, 49.0, 41.6, 32.3, 21.6, 11.9, 4.7], // 24 overs remaining
        [62.7, 60.4, 57.4, 53.4, 48.0, 40.9, 32.0, 21.5, 11.9, 4.7], // 23 overs remaining
        [60.7, 58.6, 55.8, 52.0, 47.0, 40.2, 31.6, 21.4, 11.9, 4.7], // 22 overs remaining
        [58.7, 56.7, 54.1, 50.6, 45.8, 39.4, 31.2, 21.3, 11.9, 4.7], // 21 overs remaining
        [56.6, 54.8, 52.4, 49.1, 44.6, 38.6, 30.8, 21.2, 11.9, 4.7], // 20 overs remaining

    ];    


    const resourcePercentageTableT20 = [
        [96.8, 92.6, 86.7, 78.8, 68.2, 54.4, 37.5, 21.3, 8.3],
        [93.3, 89.2, 83.9, 76.7, 66.6, 53.5, 37.3, 21.0, 8.3],
        [89.6, 85.9, 81.1, 74.2, 65.0, 52.7, 36.9, 21.0, 8.3],
        [85.7, 82.5, 77.9, 71.7, 63.3, 51.6, 36.6, 21.0, 8.3],
        [81.8, 79.0, 74.7, 69.1, 61.3, 50.4, 36.2, 20.8, 8.3],
        [77.9, 75.3, 71.6, 66.4, 59.2, 49.1, 35.7, 20.8, 8.3],
        [73.7, 71.4, 68.0, 63.4, 56.9, 47.7, 35.2, 20.8, 8.3],
        [69.4, 67.3, 64.5, 60.4, 54.4, 46.1, 34.5, 20.7, 8.3],
        [65.0, 63.3, 60.6, 57.1, 51.9, 44.3, 33.6, 20.5, 8.3],
        [60.4, 59.0, 56.7, 53.7, 49.1, 42.4, 32.7, 20.3, 8.3],
        [55.8, 54.4, 52.7, 50.0, 46.1, 40.3, 31.6, 20.1, 8.3],
        [51.1, 49.8, 48.4, 46.1, 42.8, 37.8, 30.2, 19.8, 8.3],
        [45.9, 45.1, 43.8, 42.0, 39.4, 35.2, 28.6, 19.3, 8.3],
        [40.8, 40.1, 39.2, 37.8, 35.5, 32.2, 26.9, 18.6, 8.3],
        [35.5, 35.0, 34.3, 33.2, 31.4, 29.0, 24.6, 17.8, 8.1],
        [30.0, 29.7, 29.2, 28.4, 27.2, 25.3, 22.1, 16.6, 8.1],
        [24.4, 24.2, 23.9, 23.3, 22.4, 21.2, 18.9, 14.8, 8.0],
        [18.6, 18.4, 18.2, 18.0, 17.5, 16.8, 15.4, 12.7, 7.4],
        [12.5, 12.5, 12.4, 12.4, 12.0, 11.7, 11.0, 9.7, 6.5],
        [6.4, 6.4, 6.4, 6.4, 6.2, 6.2, 6.0, 5.7, 4.4]
    ];

    // Assuming this is inside a function or an event handler
    {
 // Select the appropriate resource table
 let resourceTable;
 if (format === "ODI") {
    resourceTable = resourcePercentageTableODI;   
 } else if (format === "T20") {
     resourceTable = resourcePercentageTableT20;
 } else {
     alert("Please select a valid format.");
     return;
 }
 const oversIndex = format === "T20" ? 20 - team2OversRemaining : 50 - team2OversRemaining
 const wicketsIndex = team2WicketsLost // for wickets lost: 0-9

 const team2ResourcePercentage = resourceTable[oversIndex][wicketsIndex];

 // Calculate the revised target
 const revisedTarget = Math.round((team1Score / 100) * team2ResourcePercentage);

 // Display the revised target
 $('#result').hide().text(`Revised Target for Team 2: ${revisedTarget}`).fadeIn(1000);
}
}
