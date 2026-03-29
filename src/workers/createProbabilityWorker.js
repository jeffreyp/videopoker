export default function createProbabilityWorker() {
    return new Worker(new URL('./probabilityWorker.js', import.meta.url));
}
