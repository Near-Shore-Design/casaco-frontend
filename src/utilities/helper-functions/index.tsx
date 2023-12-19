interface ObjectWithProperty {
  [key: string]: any;
}

import { useState, useEffect, MutableRefObject } from "react";

//  check window Resize with callback
export function useWindowResize(callback: any) {
  useEffect(() => {
    function handleResize() {
      callback();
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [callback]);
}

// check window resize
export function useScreenWidth() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return screenWidth;
}
export const ExcemptEInput = (event: React.KeyboardEvent<HTMLInputElement>) => {
  if (event.key === "e" || event.key === "-") {
    event.preventDefault(); // Prevent entering the letter "e"
  }
};

// theme update
export function useTheme(theme: boolean) {
  useEffect(() => {
    if (theme) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [theme]);
}

export function findHighestAndLowest<T extends ObjectWithProperty>(
  array: T[] | undefined,
  property: keyof T
) {
  if (!Array.isArray(array) || array.length === 0) {
    return null; // Return null if the array is empty or not an array
  }

  let highestValue = Number(array[0][property]);
  let lowestValue = Number(array[0][property]);

  for (let i = 1; i < array.length; i++) {
    const currentValue = Number(array[i][property]);

    if (currentValue > highestValue) {
      highestValue = currentValue;
    }

    if (currentValue < lowestValue) {
      lowestValue = currentValue;
    }
  }

  return {
    highest: highestValue,
    lowest: lowestValue,
  };
}

export function useOutsideClick(
  ref: MutableRefObject<HTMLInputElement | null>,
  setState: any
) {
  function handleClickOutside(event: any) {
    if (ref.current && !ref.current.contains(event.target)) {
      setState(false);
    }
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setState]);
}

export function nameAbbr(str: string) {
  const firstLetter = str
    .split(" ")
    .map((word) => word[0])
    .join("");

  return firstLetter.toUpperCase();
}

export function generateTimeList() {
  const times = [];
  let hour = 8;
  let minute = 0;

  while (hour < 18 || (hour === 18 && minute === 0)) {
    let timeString = `${String(hour).padStart(2, "0")}:${String(
      minute
    ).padStart(2, "0")}`;
    times.push({ label: timeString, value: timeString });
    minute += 30;
    if (minute > 30) {
      minute = 0;
      hour++;
    }
  }

  return times;
}
export function removeDuplicates(array: Array<any>) {
  const uniqueValues = new Set();
  return array.filter((obj) => {
    if (uniqueValues.has(obj.value)) {
      return false; // Filter out the duplicate object
    } else {
      uniqueValues.add(obj.value);
      return true; // Keep the unique object
    }
  });
}

export function convertToNumber(value: string) {
  // Using parseInt() to convert to an integer
  // return parseInt(value, 10);

  // Using parseFloat() to convert to a floating-point number
  return parseFloat(value);
}

export const findIndexByKeyValuePair = (array: any, key: any, value: any) => {
  return array.findIndex((element: any) => element[key] === value);
};
