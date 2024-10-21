// Event listener for the 'Find Jobs' button
document.querySelector('.find-jobs-btn')?.addEventListener('click', function (e) {
    e.preventDefault();
    window.open('jobseeker.html', '_blank'); // Opens the jobseeker page in a new tab
});

// Event listener for the 'Post a Job' button
document.querySelector('.post-job-btn')?.addEventListener('click', function (e) {
    e.preventDefault();
    window.open('admin.html', '_blank'); // Opens the admin page in a new tab
});

// Function to display full job details when a job title is clicked
function showJobDetails(jobIndex) {
    // Retrieve jobs from localStorage
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Get the selected job using the jobIndex
    const job = jobs[jobIndex];

    // Get the job details container
    const jobDetailsContainer = document.getElementById('jobDetails');

    // Display the full job details with Share and Apply buttons
    jobDetailsContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4 class="card-title">${job.title}</h4>
                <p class="card-text"><strong>Description:</strong> ${job.description}</p>
                <p class="card-text"><strong>Requirements:</strong> ${job.requirements}</p>

                <!-- Share Button -->
                <button class="btn btn-outline-primary" onclick="shareJob(${jobIndex})">Share</button>

                <!-- Apply Button -->
                <button class="btn btn-success" onclick="applyForJob(${jobIndex})">Apply</button>
            </div>
        </div>
    `;
}

function applyForJob(jobIndex) {
    // Retrieve jobs from localStorage
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Get the selected job
    const job = jobs[jobIndex];

    // Store the job title in localStorage
    localStorage.setItem('selectedJobTitle', job.title);

    // Redirect to the application form page
    window.location.href = 'application.html?jobIndex=' + jobIndex;
}

// Function to handle sharing the job
function shareJob(jobIndex) {
    // Retrieve jobs from localStorage
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Get the selected job
    const job = jobs[jobIndex];
    const jobUrl = `https://yourwebsite.com/jobs/${jobIndex}`;

    // Check if the Share API is available
    if (navigator.share) {
        // Use the Share API to share the job
        navigator.share({
            title: job.title,
            text: `Check out this job: ${job.title}\n${job.description}`,
            url: jobUrl,
        }).then(() => {
            alert('Job shared successfully!');
        }).catch((error) => {
            console.error('Error sharing job:', error);
        });
    } else {
        // Fallback: Copy the job URL to the clipboard
        navigator.clipboard.writeText(jobUrl).then(() => {
            alert('Job URL copied to clipboard!');
        }).catch((error) => {
            console.error('Error copying job URL:', error);
        });
    }
}

// Function to extract query parameters from the URL
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Function to load job details
function loadJobDetails() {
    // Retrieve the jobIndex from the query parameters
    const jobIndex = getQueryParam('jobIndex');

    // Retrieve jobs from localStorage
    let jobs = JSON.parse(localStorage.getItem('jobs')) || [];

    // Check if the job exists
    if (!jobs[jobIndex]) {
        document.getElementById('jobDetails').innerHTML = '<p class="text-danger">Job not found.</p>';
        return;
    }

    // Get the selected job using the jobIndex
    const job = jobs[jobIndex];

    // Get the job details container
    const jobDetailsContainer = document.getElementById('jobDetails');

    // Display the full job details
    jobDetailsContainer.innerHTML = `
        <div class="card">
            <div class="card-body">
                <div class="text-center mb-4">
                    ${job.logoUrl ? `<img src="${job.logoUrl}" alt="Company Logo" class="job-logo mb-2">` : ''}
                </div>
                <h4 class="card-title text-center">${job.title}</h4>
                <p class="card-text"><strong>Role:</strong> ${job.title}</p>
                <p class="card-text"><strong>Company:</strong> ${job.company}</p>
                <p class="card-text"><strong>Category:</strong> ${job.category || 'N/A'}</p>
                <p class="card-text"><strong>JobID:</strong> ${job.jobId}</p>
                <p class="card-text"><strong>State:</strong> ${job.state}</p>
                <p class="card-text"><strong>Location:</strong> ${job.location}</p>
                <p class="card-text"><strong>Experience Required:</strong> ${job.experience} years</p>
                <p class="card-text"><strong>Salary:</strong> ${job.salary}</p>
                <p class="card-text"><strong>Qualification:</strong> ${job.qualification || 'N/A'}</p>
                <p class="card-text"><strong>Notice Period:</strong> ${job.noticePeriod}</p>
                <p class="card-text"><strong>Job Highlights:</strong></p>
                <ul class="bullet-list">${job.highlights}</ul>
                <p class="card-text"><strong>Key Responsibilities:</strong></p>
                <ul class="bullet-list">${job.responsibilities}</ul>
                <p class="card-text"><strong>Date Added:</strong> ${job.dateAdded}</p>
                <!-- Share and Apply buttons -->
                <div class="d-flex justify-content-between mt-4">
                    <button class="btn btn-primary" id="applyButton">Apply Now</button>
                    <button class="btn btn-secondary" id="shareButton">Share</button>
                </div>
            </div>
        </div>
    `;

    // Attach event listeners to the buttons after rendering
    document.getElementById('applyButton').addEventListener('click', function () {
        applyForJob(jobIndex);
    });

    document.getElementById('shareButton').addEventListener('click', function () {
        shareJob(jobIndex);
    });
}

// Load job details when the page loads
window.onload = loadJobDetails;




// Handle admin login
function handleLogin() {
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    // Fetch stored admin credentials from localStorage
    const storedUsername = localStorage.getItem('adminUsername');
    const storedPassword = localStorage.getItem('adminPassword');

    // Check if entered credentials match stored credentials
    if (username === storedUsername && password === storedPassword) {
        localStorage.setItem('isAdmin', 'true'); // Set isAdmin flag in localStorage
        window.location.href = 'admin-dashboard.html'; // Redirect to admin dashboard
    } else {
        alert('Invalid credentials!');
    }
}