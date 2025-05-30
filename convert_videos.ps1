# Définir le chemin du dossier contenant les vidéos à convertir
$inputFolder = ".\videos_to_convert"
# Définir le chemin du dossier pour les vidéos converties
$outputFolder = ".\videos_converted"

# Créer les dossiers s'ils n'existent pas
New-Item -ItemType Directory -Force -Path $inputFolder
New-Item -ItemType Directory -Force -Path $outputFolder

# Vérifier si ffmpeg est installé
$ffmpegPath = "ffmpeg"
try {
    Get-Command $ffmpegPath -ErrorAction Stop
} catch {
    Write-Host "FFmpeg n'est pas installé ou n'est pas dans le PATH. Veuillez l'installer d'abord."
    Write-Host "Vous pouvez l'installer via: choco install ffmpeg"
    exit
}

# Fonction pour convertir une vidéo
function Convert-Video {
    param (
        [string]$inputFile,
        [string]$outputFile,
        [int]$width,
        [int]$crf
    )
    
    $command = "ffmpeg -i `"$inputFile`" -vf `"fps=30,scale=$width:-1`" -movflags faststart -vcodec libx264 -crf $crf -g 1 -pix_fmt yuv420p `"$outputFile`""
    Write-Host "Conversion en cours: $inputFile"
    Write-Host "Commande: $command"
    Invoke-Expression $command
}

# Obtenir tous les fichiers vidéo du dossier d'entrée
$videoFiles = Get-ChildItem -Path $inputFolder -Include @("*.mp4", "*.mov", "*.avi", "*.mkv") -Recurse

foreach ($video in $videoFiles) {
    $baseName = [System.IO.Path]::GetFileNameWithoutExtension($video.Name)
    
    # Version Desktop
    $desktopOutput = Join-Path $outputFolder "$baseName`_desktop.mp4"
    Convert-Video -inputFile $video.FullName -outputFile $desktopOutput -width 1280 -crf 20
    
    # Version Mobile
    $mobileOutput = Join-Path $outputFolder "$baseName`_mobile.mp4"
    Convert-Video -inputFile $video.FullName -outputFile $mobileOutput -width 720 -crf 23
}

Write-Host "Conversion terminée !"
Write-Host "Les vidéos converties se trouvent dans: $outputFolder" 