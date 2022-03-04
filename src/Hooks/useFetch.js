import { useState, useEffect } from 'react';

export const useFetch = (url, method = 'GET') => {
  const [data, setData] = useState(null); // state to store data
  const [isPending, setIsPending] = useState(false); // loading state
  const [error, setError] = useState(null); // error state
  const [options, setOptions] = useState(null);

  const postData = (postData) => {
    setOptions({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
  };

  useEffect(() => {
    // * Create an abort controller for clean up

    const controller = new AbortController();

    // * Function To Fetch Data, that takes a url as a parameter

    const fetchData = async (fetchOptions) => {
      //* set loading state
      setIsPending(true);

      // * try Catch to catch errors if any

      try {
        //
        const response = await fetch(url, {
          ...fetchOptions,
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const data = await response.json();
        // console.log(data);

        setIsPending(false); // set loading state back to false

        setData(data); // set the data fetched to data state

        setError(null); // data is gotten, set error state back to false
      } catch (error) {
        if (error.name === 'AbortError') {
          console.log('Fetch was aborted');
        } else {
          setIsPending(false); // if there's an error loading state is false

          setError(error.name); // create error message
          console.log(error);
        }
      }
    };

    // * Do not forget to call the fetchData function after it's been created
    if (method === 'GET') {
      fetchData();
    }

    if (method === 'POST' && options) {
      fetchData(options);
    }

    // * Clean up function
    return () => {
      controller.abort();
    };
  }, [url, method, options]);

  // * Custom hooks always return something

  return { data, isPending, error, postData };
};
