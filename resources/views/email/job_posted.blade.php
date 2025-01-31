<!DOCTYPE html>
<html>
<head>
    <title>Job Posted Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
        }
        .container {
            background-color: #ffffff;
            border: 1px solid #dddddd;
            border-radius: 5px;
            padding: 30px;
        }
        .header {
            text-align: center;
            padding-bottom: 20px;
            border-bottom: 1px solid #eeeeee;
        }
        .content {
            padding: 20px 0;
        }
        .greeting {
            font-size: 24px;
            color: #333333;
            margin-bottom: 20px;
        }
        .job-details {
            margin: 30px 0;
        }
        .job-title {
            font-size: 20px;
            color: #2d3436;
            margin-bottom: 10px;
        }
        .salary {
            font-size: 18px;
            color: #4a5568;
        }
        .message {
            margin: 20px 0;
            color: #4a5568;
        }
        .cta-button {
            display: inline-block;
            background-color: #2563eb;
            color: white;
            padding: 12px 25px;
            text-decoration: none;
            border-radius: 5px;
            margin: 20px 0;
        }
        .footer {
            text-align: center;
            color: #718096;
            font-size: 14px;
            padding-top: 30px;
        }
    </style>
</head>
<body>
<div class="container">
    <div class="header">
        <img src="your-logo.png" alt="Company Logo" style="max-width: 200px;">
    </div>
    <div class="content">
        <div class="greeting">
            Hi there,
        </div>
        <div class="message">
            <p>Congratulations! Your job posting has been successfully created.</p>
        </div>
        <div class="job-details">
            <div class="job-title">Job Title: {{ $job->title }}</div>
            <div class="salary">Salary: {{ $job->salary }}</div>
        </div>
        <div class="message">
            <p>Your job listing is now live and visible to candidates.</p>
        </div>
        <div style="text-align: center;">
            <a href="{{ url('/') }}" class="cta-button">View Your Job Listing</a>
        </div>
    </div>
    <div class="footer">
        <p>If you have any questions, please contact our support team.</p>
        <p>© 2023 Your Company Name. All rights reserved.</p>
    </div>
</div>
</body>
</html>
