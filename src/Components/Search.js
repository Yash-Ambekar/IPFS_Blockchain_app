import "./search.css"
import { useState, useEffect } from 'react';
import { ethers } from "ethers";
import Hashes from ".././artifacts/contracts/Hashes.sol/Hashes.json";


const hashesAddress="0x5FbDB2315678afecb367f032d93F642f64180aa3";


const Search = () => {
    
    const [fileName, setFileName] = useState();
    const [hashData, setHashData] = useState();
    const [searchFileHash, setSearchFileHash] = useState(false);
    const [loading, setLoading] = useState()

    
    
    useEffect(()=>{
    
      async function fetchData()
    {if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner(); 
    const contract = new ethers.Contract(
      hashesAddress,
      Hashes.abi,
      provider
    );
    try {
      const data = await contract.retriveHash();
      console.log("data: ",data);
      setHashData(data)
    } catch (error) {
      console.log("Error: ", error);
    }
  }}
  fetchData();
  },[])


    const handleInput=(event)=>{
        setFileName(event.target.value)
    }
    

    // async function requestAccounts(){
    //     await window.ethereum.request({ method:"eth_requestAccounts" });
    // }
    const searchForFile = ()=>{
      for(var i=0; i<hashData.length; i++){
        JSON.parse(hashData[i]).map((file)=>{
          if(file.fileName === fileName){
            setSearchFileHash({fileName: file.fileName, fileHash: file.cid});
            setLoading(true)

          }     
        })
      }
    }

    console.log(searchFileHash)
   

    return (
        <>
        <div className="flex w-full justify-center items-center h-screen">
            <input type="text" placeholder="Search" className=" p-3 mx-3 w-1/4 outline-none border-[1px] border-solid border-black rounded" onChange={handleInput}/>
            <button className="border-[1px] p-3 bg-blue-300 border-solid border-black rounded" onClick={searchForFile}>Search</button>
            <a href='/'> 
              <button className='border-[1px] mx-3 p-3 bg-blue-300 border-solid border-black rounded'>Upload Files</button>
            </a>
            {
              loading? (<a href={`https://ipfs.infura.io/ipfs/${searchFileHash.fileHash}`} target="_blank">{searchFileHash.fileName}</a>):null
            }
        </div>
        </>
      );
}
 
export default Search ;