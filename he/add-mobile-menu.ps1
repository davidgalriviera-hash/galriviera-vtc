# Script PowerShell pour ajouter mobile-menu-fix.js aux fichiers HTML
# Usage: PowerShell -ExecutionPolicy Bypass -File add-mobile-menu.ps1

param(
    [string]$Path = ".",
    [switch]$Recurse = $false,
    [switch]$NoBackup = $false
)

Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Ajout de mobile-menu-fix.js aux fichiers HTML" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host ""

# Ligne à ajouter
$scriptLine = '<script src="../mobile-menu-fix.js"></script>'

# Créer un dossier de sauvegarde
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$backupDir = "backup_$timestamp"

if (-not $NoBackup) {
    if (-not (Test-Path $backupDir)) {
        New-Item -ItemType Directory -Path $backupDir | Out-Null
        Write-Host "📁 Dossier de sauvegarde créé : $backupDir" -ForegroundColor Green
        Write-Host ""
    }
}

# Obtenir les fichiers HTML
$searchParams = @{
    Path = $Path
    Filter = "*.html"
}

if ($Recurse) {
    $searchParams.Recurse = $true
    Write-Host "🔍 Recherche récursive activée" -ForegroundColor Yellow
}

$htmlFiles = Get-ChildItem @searchParams
$htmlFiles += Get-ChildItem -Path $Path -Filter "*.htm" -Recurse:$Recurse

$totalFiles = $htmlFiles.Count
$modifiedFiles = 0

Write-Host "📊 $totalFiles fichier(s) HTML trouvé(s)" -ForegroundColor Yellow
Write-Host ""

foreach ($file in $htmlFiles) {
    Write-Host "📄 Traitement de : $($file.Name)" -NoNewline
    
    # Lire le contenu du fichier
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Vérifier si le script n'est pas déjà présent
    if ($content -match "mobile-menu-fix\.js") {
        Write-Host " - ⚠️  Script déjà présent" -ForegroundColor Yellow
        continue
    }
    
    # Créer une sauvegarde si nécessaire
    if (-not $NoBackup) {
        $backupPath = Join-Path $backupDir $file.Name
        Copy-Item -Path $file.FullName -Destination $backupPath -Force
    }
    
    # Trouver la dernière occurrence de </script> (case insensitive)
    $pattern = '(?s)(.*)(</script>)(.*?)$'
    
    if ($content -imatch $pattern) {
        # Trouver toutes les occurrences de </script>
        $lastIndex = $content.LastIndexOf("</script>", [StringComparison]::OrdinalIgnoreCase)
        
        if ($lastIndex -ge 0) {
            # Trouver la fin de la balise </script>
            $insertPosition = $lastIndex + 9  # longueur de "</script>"
            
            # Insérer la nouvelle ligne
            $newContent = $content.Insert($insertPosition, "`r`n$scriptLine")
            
            # Sauvegarder le fichier modifié
            Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
            
            Write-Host " - ✅ Modifié" -ForegroundColor Green
            $modifiedFiles++
        } else {
            Write-Host " - ❌ Aucune balise </script> trouvée" -ForegroundColor Red
        }
    } else {
        Write-Host " - ❌ Aucune balise </script> trouvée" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "  Résumé" -ForegroundColor Cyan
Write-Host "================================================" -ForegroundColor Cyan
Write-Host "✅ Fichiers analysés : $totalFiles" -ForegroundColor Green
Write-Host "📝 Fichiers modifiés : $modifiedFiles" -ForegroundColor Green
if (-not $NoBackup) {
    Write-Host "💾 Sauvegardes dans : $backupDir" -ForegroundColor Green
}
Write-Host ""

# Pause pour voir les résultats
Write-Host "Appuyez sur une touche pour terminer..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")