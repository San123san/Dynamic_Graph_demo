// Initialize an array to hold chart objects
const charts = [];
let selectedChartIndex = null;

// Function to create a new chart
function createChart() {
    const chartNameInput = document.getElementById('chartName');
    const chartName = chartNameInput.value;

    if (chartName) {
        const chartContainer = document.getElementById('chartContainer');

        // Create a new canvas element for the chart
        const canvas = document.createElement('canvas');
        canvas.className = 'chart-canvas'; // Set the canvas class for styling
        chartContainer.appendChild(canvas);

        const chartNameLabel = document.createElement('div');
        chartNameLabel.className = 'chart-name-label';
        chartNameLabel.innerText = chartName; // Set the chart name label below the graph
        chartContainer.appendChild(chartNameLabel);

        const ctx = canvas.getContext('2d');
        const newChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: [],
                datasets: [{
                    label: 'Values',
                    data: [],
                    backgroundColor: '#007BFF',
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                },
                plugins: {
                    title: {
                        display: true,
                        text: chartName, // Set the chart title
                    },
                },
            },
        });

        // Add the chart to the array and update the select options
        charts.push({
            name: chartName,
            chart: newChart,
            chartNameLabel: chartNameLabel, // Store the chart name label element
        });

        // Update the select options
        updateSelectOptions();
        chartNameInput.value = '';

        // Display all charts
        updateAllCharts();
    }
}

// Function to select a chart from the dropdown
function selectChart() {
    const selectChart = document.getElementById('selectChart');
    selectedChartIndex = parseInt(selectChart.value); // Parse the selected value as an integer
    updateChart();
}

// Function to delete the selected chart
function deleteChart() {
    if (selectedChartIndex !== null) {
        const selectedChart = charts[selectedChartIndex];
        selectedChart.chart.destroy(); // Destroy the chart instance
        selectedChart.chartNameLabel.remove(); // Remove the chart name label
        charts.splice(selectedChartIndex, 1); // Remove the chart from the array
        updateSelectOptions();
        selectedChartIndex = null;

        // Display all charts
        updateAllCharts();
    }
}

// Function to update the select options with available charts
function updateSelectOptions() {
    const selectChart = document.getElementById('selectChart');
    selectChart.innerHTML = '<option value="" disabled selected>Select Chart</option>';
    charts.forEach((chart, index) => {
        const option = document.createElement('option');
        option.value = index.toString();
        option.text = chart.name;
        selectChart.appendChild(option);
    });
}

// Function to update the currently selected chart
function updateChart() {
    const canvas = document.querySelector('.chart-canvas');
    const selectedChart = charts[selectedChartIndex];

    if (selectedChart) {
        canvas.style.display = 'block';
        const ctx = canvas.getContext('2d');
        selectedChart.chart.config.options.responsive = true;
        selectedChart.chart.resize();
        selectedChart.chart.render();
    } else {
        canvas.style.display = 'none';
    }
}

// Function to update all charts
function updateAllCharts() {
    charts.forEach((chart) => {
        const canvas = chart.chart.canvas;
        const ctx = canvas.getContext('2d');
        chart.chart.config.options.responsive = true;
        chart.chart.resize();
        chart.chart.render();
    });
}

// Function to add data to the selected chart
function addDataToSelectedChart() {
    const labelInput = document.getElementById('labelInput');
    const valueInput = document.getElementById('valueInput');

    if (selectedChartIndex !== null) {
        const label = labelInput.value;
        const value = parseFloat(valueInput.value);

        if (label && !isNaN(value)) {
            charts[selectedChartIndex].chart.data.labels.push(label);
            charts[selectedChartIndex].chart.data.datasets[0].data.push(value);
            charts[selectedChartIndex].chart.update();

            labelInput.value = '';
            valueInput.value = '';
        }
    }
}
