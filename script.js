const container = document.getElementById("array-container");
let array = [];
let speed = 50; 


document.getElementById("speed").addEventListener("input", function () {
    speed = 101 - this.value; 
});


function generateArray(size = 50) {
    array = [];
    container.innerHTML = "";
    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100) + 5;
        array.push(value);

        const bar = document.createElement("div");
        bar.className = "array-bar";
        bar.style.height = `${value * 3}px`;
        container.appendChild(bar);
    }
}


async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


async function bubbleSort() {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            bars[j].classList.add("active");
            bars[j + 1].classList.add("active");

            if (array[j] > array[j + 1]) {
                [array[j], array[j + 1]] = [array[j + 1], array[j]];

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            }
            await sleep(speed);

            bars[j].classList.remove("active");
            bars[j + 1].classList.remove("active");
        }
        bars[array.length - i - 1].classList.add("sorted");
    }
}


async function selectionSort() {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 0; i < array.length; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) minIdx = j;
        }
        if (minIdx !== i) {
            [array[i], array[minIdx]] = [array[minIdx], array[i]];
            bars[i].style.height = `${array[i] * 3}px`;
            bars[minIdx].style.height = `${array[minIdx] * 3}px`;
        }
        bars[i].classList.add("sorted");
        await sleep(speed);
    }
}


async function insertionSort() {
    const bars = document.querySelectorAll(".array-bar");
    for (let i = 1; i < array.length; i++) {
        let j = i;
        while (j > 0 && array[j] < array[j - 1]) {
            [array[j], array[j - 1]] = [array[j - 1], array[j]];
            bars[j].style.height = `${array[j] * 3}px`;
            bars[j - 1].style.height = `${array[j - 1] * 3}px`;
            j--;
            await sleep(speed);
        }
        bars[i].classList.add("sorted");
    }
}


async function mergeSort(start = 0, end = array.length - 1) {
    if (start >= end) return;

    const mid = Math.floor((start + end) / 2);
    await mergeSort(start, mid);
    await mergeSort(mid + 1, end);
    await merge(start, mid, end);
}

async function merge(start, mid, end) {
    const bars = document.querySelectorAll(".array-bar");
    let left = start, right = mid + 1;
    const temp = [];

    while (left <= mid && right <= end) {
        if (array[left] <= array[right]) {
            temp.push(array[left++]);
        } else {
            temp.push(array[right++]);
        }
    }

    while (left <= mid) temp.push(array[left++]);
    while (right <= end) temp.push(array[right++]);

    for (let i = start; i <= end; i++) {
        array[i] = temp[i - start];
        bars[i].style.height = `${array[i] * 3}px`;
        await sleep(speed);
    }
}


async function sortArray() {
    const algorithm = document.getElementById("sorting-algorithm").value;
    switch (algorithm) {
        case "bubble":
            await bubbleSort();
            break;
        case "selection":
            await selectionSort();
            break;
        case "insertion":
            await insertionSort();
            break;
        case "merge":
            await mergeSort();
            break;
    }
}


generateArray();