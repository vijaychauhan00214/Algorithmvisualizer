import React, { useEffect, useState } from 'react';
import './VisualizationComponent.css';

const VisualizationComponent = ({ data, algorithm }) => {
  const [visualizationData, setVisualizationData] = useState(data);

  useEffect(() => {
    const sortData = async () => {
      if (algorithm === 'Bubble Sort') {
        await bubbleSort([...data]);
      } else if (algorithm === 'Selection Sort') {
        await selectionSort([...data]);
      } else if (algorithm === 'Insertion Sort') {
        await insertionSort([...data]);
      } else if (algorithm === 'Counting Sort') {
        await countingSort([...data]);
      } else if (algorithm === 'Merge Sort') {
        await mergeSort([...data], 0, data.length - 1);
      } else if (algorithm === 'Quick Sort') {
        await quickSort([...data], 0, data.length - 1);
      }
    };

    sortData();
  }, [data, algorithm]);

  const bubbleSort = async (arr) => {
    let sortedArr = [...arr];
    let n = sortedArr.length;

    for (let i = 0; i < n - 1; i++) {
        let swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            let updatedData = [...sortedArr];
            if (updatedData[j] > updatedData[j + 1]) {
                [updatedData[j], updatedData[j + 1]] = [updatedData[j + 1], updatedData[j]];
                sortedArr = updatedData; // Update the sorted array
                swapped = true;
                setVisualizationData(updatedData.map((value, index) => ({
                    value,
                    isMoving: index === j || index === j + 1
                })));
                await sleep(300); // Adjust the delay as needed
            }
        }
        if (!swapped) break; // Array is sorted early
    }
};

  const selectionSort = async (arr) => {
    let sortedArr = [...arr];
    let n = sortedArr.length;
    for (let i = 0; i < n - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < n; j++) {
        if (sortedArr[j] < sortedArr[minIndex]) {
          minIndex = j;
        }
      }
      if (minIndex !== i) {
        [sortedArr[i], sortedArr[minIndex]] = [sortedArr[minIndex], sortedArr[i]];
        setVisualizationData(sortedArr.map((value, index) => ({
          value,
          isMoving: index === i || index === minIndex
        })));
        await sleep(300);
      }
    }
  };

  const insertionSort = async (arr) => {
    let sortedArr = [...arr];
    let n = sortedArr.length;
    for (let i = 1; i < n; i++) {
      let key = sortedArr[i];
      let j = i - 1;
      while (j >= 0 && sortedArr[j] > key) {
        sortedArr[j + 1] = sortedArr[j];
        j--;
      }
      sortedArr[j + 1] = key;
      setVisualizationData(sortedArr.map((value, index) => ({
        value,
        isMoving: index === j + 1
      })));
      await sleep(300);
    }
  };

  const countingSort = async (arr) => {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let range = max - min + 1;
    let count = Array(range).fill(0);
    let output = Array(arr.length).fill(0);

    for (let i = 0; i < arr.length; i++) {
      count[arr[i] - min]++;
    }

    for (let i = 1; i < count.length; i++) {
      count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
      output[count[arr[i] - min] - 1] = arr[i];
      count[arr[i] - min]--;
      setVisualizationData(output.map((value, index) => ({
        value,
        isMoving: index === i
      })));
      await sleep(300);
    }
  };

  const mergeSort = async (arr, left, right) => {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSort(arr, left, middle);
      await mergeSort(arr, middle + 1, right);
      await merge(arr, left, middle, right);
    }
  };

  const merge = async (arr, left, middle, right) => {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    const leftArr = new Array(n1);
    const rightArr = new Array(n2);

    for (let i = 0; i < n1; i++) leftArr[i] = arr[left + i];
    for (let j = 0; j < n2; j++) rightArr[j] = arr[middle + 1 + j];

    let i = 0, j = 0, k = left;
    while (i < n1 && j < n2) {
      if (leftArr[i] <= rightArr[j]) {
        arr[k] = leftArr[i];
        i++;
      } else {
        arr[k] = rightArr[j];
        j++;
      }
      setVisualizationData(arr.map((value, index) => ({
        value,
        isMoving: index === k
      })));
      await sleep(300);
      k++;
    }

    while (i < n1) {
      arr[k] = leftArr[i];
      i++;
      k++;
      setVisualizationData(arr.map((value, index) => ({
        value,
        isMoving: index === k
      })));
      await sleep(300);
    }

    while (j < n2) {
      arr[k] = rightArr[j];
      j++;
      k++;
      setVisualizationData(arr.map((value, index) => ({
        value,
        isMoving: index === k
      })));
      await sleep(300);
    }
  };

  const quickSort = async (arr, start, end) => {
    if (start >= end) return;

    const pivotIndex = await partition(arr, start, end);

    await quickSort(arr, start, pivotIndex - 1);
    await quickSort(arr, pivotIndex + 1, end);

    setVisualizationData(arr.map((value, index) => ({
      value,
      isMoving: index === pivotIndex || index === end
    })));
  };

  const partition = async (arr, start, end) => {
    let pivotValue = arr[end];
    let pivotIndex = start;

    for (let i = start; i < end; i++) {
      if (arr[i] < pivotValue) {
        [arr[i], arr[pivotIndex]] = [arr[pivotIndex], arr[i]];
        pivotIndex++;
        setVisualizationData(arr.map((value, index) => ({
          value,
          isMoving: index === i || index === pivotIndex
        })));
        await sleep(300);
      }
    }
    [arr[pivotIndex], arr[end]] = [arr[end], arr[pivotIndex]];
    setVisualizationData(arr.map((value, index) => ({
      value,
      isMoving: index === pivotIndex || index === end
    })));
    await sleep(300);

    return pivotIndex;
  };

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  return (
    <div className="visualization">
      <div className="array-container">
        {visualizationData.map(({ value, isMoving }, index) => (
          <div
            key={index}
            className={`array-bar ${isMoving ? 'moving' : ''}`}
            style={{ height: `${value * 2}px` }}
          >
            <span>{value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VisualizationComponent;
