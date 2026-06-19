$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:8080/")
$listener.Start()
Write-Host "SkyRoute Dev Server running at http://localhost:8080"
Write-Host "Press Ctrl+C to stop"

$root = "E:\Flight"
$mimeTypes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".jpeg" = "image/jpeg"
    ".gif"  = "image/gif"
    ".svg"  = "image/svg+xml"
    ".ico"  = "image/x-icon"
    ".webp" = "image/webp"
    ".woff" = "font/woff"
    ".woff2"= "font/woff2"
    ".ttf"  = "font/ttf"
}

while ($listener.IsListening) {
    $context = $listener.GetContext()
    $request = $context.Request
    $response = $context.Response

    $urlPath = $request.Url.LocalPath
    if ($urlPath -eq "/") { $urlPath = "/index.html" }

    $filePath = Join-Path $root ($urlPath -replace "/", "\")

    if (Test-Path $filePath -PathType Leaf) {
        $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
        $contentType = $mimeTypes[$ext]
        if (-not $contentType) { $contentType = "application/octet-stream" }
        
        $response.ContentType = $contentType
        $response.StatusCode = 200
        $buffer = [System.IO.File]::ReadAllBytes($filePath)
        $response.ContentLength64 = $buffer.Length
        $response.OutputStream.Write($buffer, 0, $buffer.Length)
        Write-Host "$($request.HttpMethod) $urlPath -> 200 ($contentType)"
    } else {
        # For SPA: serve index.html for non-file routes
        $indexPath = Join-Path $root "index.html"
        if (Test-Path $indexPath) {
            $response.ContentType = "text/html; charset=utf-8"
            $response.StatusCode = 200
            $buffer = [System.IO.File]::ReadAllBytes($indexPath)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
            Write-Host "$($request.HttpMethod) $urlPath -> 200 (SPA fallback)"
        } else {
            $response.StatusCode = 404
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
            $response.ContentLength64 = $msg.Length
            $response.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "$($request.HttpMethod) $urlPath -> 404"
        }
    }
    
    $response.Close()
}
