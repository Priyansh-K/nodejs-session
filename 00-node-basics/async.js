// some work take time ( 5 - 10 s, disk read, network read)
// database read write). JS doesn't stop and wait for the 
// tasks to complete so it gets back a promise, and 'await'
// pauses the function until its ready 

function fakedatabasequery() {
    return new Promise((resolve) => {
        setTimeout(() => resolve([{ id: 1, note: "Salary" }]), 1000);
    }
    )
}

const notReady = fakedatabasequery();
console.log("not ready:", notReady);

const rows = await fakedatabasequery();
console.log(" ready:", rows);

async function mightFail() {
    throw new Error("NO database!");
}

try {
    await mightFail();
} catch (err) {
    console.log("caught:", err.message);
}