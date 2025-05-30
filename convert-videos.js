const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    inputFolder: './videos_to_convert',
    outputFolder: './videos_converted',
    formats: ['.mp4', '.mov', '.avi', '.mkv'],
    versions: {
        desktop: {
            width: 1280,
            crf: 20
        },
        mobile: {
            width: 720,
            crf: 23
        }
    }
};

// Créer les dossiers s'ils n'existent pas
if (!fs.existsSync(config.inputFolder)) {
    fs.mkdirSync(config.inputFolder, { recursive: true });
}
if (!fs.existsSync(config.outputFolder)) {
    fs.mkdirSync(config.outputFolder, { recursive: true });
}

// Vérifier si ffmpeg est installé
exec('ffmpeg -version', (error) => {
    if (error) {
        console.error('FFmpeg n\'est pas installé. Veuillez l\'installer d\'abord.');
        console.log('Sur Windows: choco install ffmpeg');
        console.log('Sur Mac: brew install ffmpeg');
        console.log('Sur Linux: sudo apt-get install ffmpeg');
        process.exit(1);
    }
    processVideos();
});

function convertVideo(inputFile, outputFile, width, crf) {
    return new Promise((resolve, reject) => {
        const command = `ffmpeg -i "${inputFile}" -vf "fps=30,scale=${width}:-1" -movflags faststart -vcodec libx264 -crf ${crf} -g 1 -pix_fmt yuv420p "${outputFile}"`;
        
        console.log(`\nConversion en cours: ${path.basename(inputFile)}`);
        console.log(`Commande: ${command}\n`);

        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Erreur lors de la conversion de ${inputFile}:`, error);
                reject(error);
                return;
            }
            resolve();
        });
    });
}

async function processVideos() {
    try {
        // Lire tous les fichiers du dossier d'entrée
        const files = fs.readdirSync(config.inputFolder);
        
        // Filtrer pour ne garder que les vidéos
        const videoFiles = files.filter(file => 
            config.formats.includes(path.extname(file).toLowerCase())
        );

        if (videoFiles.length === 0) {
            console.log(`Aucune vidéo trouvée dans ${config.inputFolder}`);
            console.log(`Formats supportés: ${config.formats.join(', ')}`);
            return;
        }

        console.log(`${videoFiles.length} vidéo(s) trouvée(s)`);

        // Convertir chaque vidéo
        for (const video of videoFiles) {
            const inputPath = path.join(config.inputFolder, video);
            const baseName = path.parse(video).name;

            // Version Desktop
            const desktopOutput = path.join(config.outputFolder, `${baseName}_desktop.mp4`);
            await convertVideo(
                inputPath,
                desktopOutput,
                config.versions.desktop.width,
                config.versions.desktop.crf
            );

            // Version Mobile
            const mobileOutput = path.join(config.outputFolder, `${baseName}_mobile.mp4`);
            await convertVideo(
                inputPath,
                mobileOutput,
                config.versions.mobile.width,
                config.versions.mobile.crf
            );
        }

        console.log('\nConversion terminée !');
        console.log(`Les vidéos converties se trouvent dans: ${config.outputFolder}`);

    } catch (error) {
        console.error('Une erreur est survenue:', error);
    }
} 