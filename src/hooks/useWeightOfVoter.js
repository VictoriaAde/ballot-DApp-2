import { useEffect, useState } from "react";
import { getProposalsContract } from "../constants/contracts";
import { useWeb3ModalAccount } from "@web3modal/ethers/react";
import { readOnlyProvider } from "../constants/providers";
// import { useLatestBlock } from "./useLatestBlock";

const useWeightOfVoter = () => {
    const { address } = useWeb3ModalAccount();
    const [voterWeight, setVoterWeight] = useState(0);

    // const newBlock = useLatestBlock();

    // console.log(address);

    useEffect(() => {
        const contract = getProposalsContract(readOnlyProvider);
        contract
            .voters([address].weight)
            .then((res) => {
                // console.log("response", res);
                setVoterWeight(res.weight);
            })
            .catch((err) => {
                console.error("error fetching proposals: ", err);
            });
    }, [address]);

    return voterWeight;
};

export default useWeightOfVoter;

// import { useCallback } from "react";
// import { isSupportedChain } from "../utils";
// import { isAddress } from "ethers";
// import { getProvider } from "../constants/providers";
// import { getProposalsContract } from "../constants/contracts";
// import {
//     useWeb3ModalAccount,
//     useWeb3ModalProvider,
// } from "@web3modal/ethers/react";

// const useWeightOfVoter = () => {
//     const { chainId } = useWeb3ModalAccount();
//     const { walletProvider } = useWeb3ModalProvider();
//     // const [value, setValue] = useState(0);

//     return useCallback(async () => {
//         if (!isSupportedChain(chainId)) return console.error("Wrong network");
//         if (!isAddress(address)) return console.error("Invalid address");
//         const readWriteProvider = getProvider(walletProvider);
//         const signer = await readWriteProvider.getSigner();

//         const contract = getProposalsContract(signer);

//         try {
//             const transaction = await contract.voters([address].weight);

//             console.log("transaction: ", transaction);
//             const receipt = await transaction.wait();

//             console.log("receipt: ", receipt);

//             if (receipt.status) {
//                 return console.log("giveRightToVote successfull!");
//             }

//             console.log("giveRightToVote failed!");
//         } catch (error) {
//             console.error("error: ", error);
//         }
//     }, [address, chainId, walletProvider]);
// };

// export default useWeightOfVoter;
