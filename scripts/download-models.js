const path = require('path');
const fs = require('fs');

async function downloadModels() {
    // Динамический импорт внутри асинхронной функции
    const { pipeline, env } = await import('@xenova/transformers');
    
    const modelsDir = path.join(__dirname, '../resources/models');
    
    if (!fs.existsSync(modelsDir)) {
        fs.mkdirSync(modelsDir, { recursive: true });
    }

    env.cacheDir = modelsDir;
    
    try {
        console.log('[download-models] Downloading Xenova/all-MiniLM-L6-v2...');
        await pipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2');
        console.log('[download-models] all-MiniLM-L6-v2 downloaded.');

        console.log('[download-models] Downloading Xenova/mobilebert-uncased-mnli...');
        await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
        console.log('[download-models] mobilebert-uncased-mnli downloaded.');

        console.log('[download-models] All models downloaded successfully!');
    } catch (e) {
        console.error('[download-models] Error downloading model:', e);
        process.exit(1);
    }
}

downloadModels();