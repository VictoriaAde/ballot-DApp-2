import { useEffect, useState } from "react";
import { wssProvider } from "../constants/providers";

// Custom React hook for tracking and retrieving the latest block number from a WebSocket provider
export function useLatestBlock() {
      const [blockNumber, setBlockNumber] = useState(undefined);

      // useEffect hook to perform side effects when the component mounts
      useEffect(() => {
            // Callback function that updates the blockNumber state with the new block number
            const onBlock = (newBlockNumber) => setBlockNumber(newBlockNumber);

            // Set up an event listener for "block" events emitted by the wssProvider
            wssProvider.on("block", onBlock);

            // Cleanup function to remove the event listener when the component unmounts
            return () => {
                  wssProvider.off("block", onBlock);
            };
      }, []); // Empty dependency array ensures the effect runs only once when the component mounts

      // Return the current blockNumber state variable
      return blockNumber;
}
