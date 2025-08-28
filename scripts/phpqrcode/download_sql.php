<?php
// SQL file download functionality
$sqlFilePath = '../../gym_mms (1).sql';
$sqlFileName = 'gym_mms.sql';

// Check if download is requested
if (isset($_GET['download']) && $_GET['download'] == 'true') {
    if (file_exists($sqlFilePath)) {
        // Set headers for file download
        header('Content-Type: application/octet-stream');
        header('Content-Disposition: attachment; filename="' . $sqlFileName . '"');
        header('Content-Length: ' . filesize($sqlFilePath));
        header('Cache-Control: must-revalidate');
        header('Pragma: public');
        
        // Output file content
        readfile($sqlFilePath);
        exit;
    } else {
        $error = "SQL file not found!";
    }
}

// Check if file exists for display purposes
$fileExists = file_exists($sqlFilePath);
$fileSize = $fileExists ? filesize($sqlFilePath) : 0;
$lastModified = $fileExists ? date('Y-m-d H:i:s', filemtime($sqlFilePath)) : 'N/A';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SQL Database Download</title>
    <style>
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            margin: 0;
            padding: 20px;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .container {
            background: white;
            border-radius: 15px;
            padding: 40px;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
            max-width: 500px;
            width: 100%;
            text-align: center;
        }
        
        .icon {
            font-size: 4rem;
            margin-bottom: 20px;
        }
        
        .success-icon {
            color: #28a745;
        }
        
        .error-icon {
            color: #dc3545;
        }
        
        h1 {
            color: #333;
            margin-bottom: 10px;
            font-size: 2rem;
        }
        
        .subtitle {
            color: #666;
            margin-bottom: 30px;
            font-size: 1.1rem;
        }
        
        .file-info {
            background: #f8f9fa;
            border-radius: 10px;
            padding: 20px;
            margin: 20px 0;
            text-align: left;
        }
        
        .file-info h3 {
            margin-top: 0;
            color: #495057;
        }
        
        .file-detail {
            margin: 10px 0;
            color: #6c757d;
        }
        
        .file-detail strong {
            color: #495057;
        }
        
        .download-btn {
            background: linear-gradient(45deg, #28a745, #20c997);
            color: white;
            border: none;
            padding: 15px 30px;
            font-size: 1.1rem;
            border-radius: 50px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }
        
        .download-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
        }
        
        .error-message {
            background: #f8d7da;
            color: #721c24;
            padding: 15px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #f5c6cb;
        }
        
        .not-found-message {
            background: #fff3cd;
            color: #856404;
            padding: 20px;
            border-radius: 10px;
            margin: 20px 0;
            border: 1px solid #ffeaa7;
        }
        
        .back-btn {
            background: #6c757d;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 25px;
            cursor: pointer;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            transition: background 0.3s ease;
        }
        
        .back-btn:hover {
            background: #5a6268;
        }
    </style>
</head>
<body>
    <div class="container">
        <?php if (isset($error)): ?>
            <div class="icon error-icon">⚠️</div>
            <h1>Download Failed</h1>
            <div class="error-message">
                <?php echo htmlspecialchars($error); ?>
            </div>
        <?php elseif ($fileExists): ?>
            <div class="icon success-icon">📁</div>
            <h1>SQL Database File</h1>
            <p class="subtitle">Gym Membership Management System Database</p>
            
            <div class="file-info">
                <h3>📋 File Information</h3>
                <div class="file-detail">
                    <strong>File Name:</strong> <?php echo htmlspecialchars($sqlFileName); ?>
                </div>
                <div class="file-detail">
                    <strong>File Size:</strong> <?php echo number_format($fileSize / 1024, 2); ?> KB
                </div>
                <div class="file-detail">
                    <strong>Last Modified:</strong> <?php echo $lastModified; ?>
                </div>
                <div class="file-detail">
                    <strong>Status:</strong> <span style="color: #28a745;">✅ Ready for download</span>
                </div>
            </div>
            
            <a href="?download=true" class="download-btn">
                📥 Download SQL File
            </a>
            
        <?php else: ?>
            <div class="icon error-icon">❌</div>
            <h1>File Not Found</h1>
            <p class="subtitle">SQL Database file is not available</p>
            
            <div class="not-found-message">
                <strong>⚠️ Database file not found!</strong><br><br>
                The SQL file <code><?php echo htmlspecialchars($sqlFileName); ?></code> is not present in the expected location.<br><br>
                <strong>Possible reasons:</strong>
                <ul style="text-align: left; margin-top: 10px;">
                    <li>File has been moved or deleted</li>
                    <li>Database export has not been created yet</li>
                    <li>File path configuration is incorrect</li>
                </ul>
                <br>
                <strong>💡 What to do:</strong><br>
                Please contact your system administrator or export the database from phpMyAdmin to generate the SQL file.
            </div>
        <?php endif; ?>
        
        <a href="../../index.html" class="back-btn">← Back to Main System</a>
    </div>
</body>
</html>
