import "./search.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import Hashes from ".././artifacts/contracts/Hashes.sol/Hashes.json";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const hashesAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3";

const Search = () => {
  const [fileName, setFileName] = useState(); //this is the file name we get as an input from our user
  const [hashData, setHashData] = useState([]); //contains the whole array of hashes and metadata from the blockchain
  const [searchFileHash, setSearchFileHash] = useState(false); //contains the requested hash and filename
  const [loading, setLoading] = useState(false);

  //fetch data from the blockchain
  useEffect(() => {
    async function fetchData() {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(
          hashesAddress,
          Hashes.abi,
          provider
        );
        try {
          const data = await contract.retriveHash();
          console.log("data: ", data);
          setHashData(data);
        } catch (error) {
          console.log("Error: ", error);
        }
      }
    }
    fetchData();
  }, []);

  //get the user input

  const handleInput = (event) => {
    setFileName(event.target.value);
  };

  //search for the file requested by the user
  const searchForFile = () => {
    for (var i = 0; i < hashData.length; i++) {
      JSON.parse(hashData[i]).map((file) => {
        if (file.fileName === fileName) {
          toast("File sucessfully found", {
            type: "success",
            position: "top-center",
            theme: "dark",
          });
          setSearchFileHash({ fileName: file.fileName, fileHash: file.cid });
          setLoading(true);
        }
        console.log("After return");
      });
    }
  };

  console.log(searchFileHash);

  return (
    <>
      <ToastContainer />
      <div className="flex w-full justify-center items-center h-screen">
        <input
          type="text"
          placeholder="Search"
          className=" p-3 mx-3 w-1/4 outline-none border-[1px] border-solid border-black rounded"
          onChange={handleInput}
        />
        <button
          className="border-[1px] p-3 bg-blue-300 border-solid border-black rounded"
          onClick={searchForFile}
        >
          Search
        </button>
        <a href="/">
          <button className="border-[1px] mx-3 p-3 bg-blue-300 border-solid border-black rounded">
            Upload Files
          </button>
        </a>
        {loading ? (
          <a
            href={`https://ipfs.infura.io/ipfs/${searchFileHash.fileHash}`}
            target="_blank"
            rel="noreferrer"
          >
            {searchFileHash.fileName}
          </a>
        ) : null}
      </div>
    </>
  );
};

export default Search;
