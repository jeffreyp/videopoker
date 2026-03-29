class MockWorker {
    postMessage() {}
    terminate() {}
}

export default function createProbabilityWorker() {
    return new MockWorker();
}
