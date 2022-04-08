import React, { useState, useEffect, useLayoutEffect } from 'react'
import { create } from 'ipfs-http-client'
import './home.css'
import docImage from './Document_image.png'

function MainHomePage() {
  const [fileData, setFileData] = useState()
  const [loading, setLoading] = useState(false)
  const [loading2, setLoading2] = useState(false)
  const [fileHash, setFileHash] = useState([])

  const startIPFS = async () => {
    const addedFiles = []
    const ipfs = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
    })
    console.log('adding File')
    const ipfsAdd = ipfs.addAll(fileData)
    for await (const file of ipfsAdd) {
      addedFiles.push({
        cid: file.cid.toString(),
        path: file.path,
        size: file.size,
      })
    }
    setFileHash(addedFiles)
    setLoading2(true)
    console.log(addedFiles)
  }
  console.log(fileHash)

  const onImageChange = (event) => {
    event.preventDefault()
    if (event.target.files) {
      setFileData(event.target.files)
      setLoading(true)
    } else {
      alert('The File Was not uploaded successfully')
    }
  }

  return (
    <div className="flex h-screen justify-center items-center flex-col">
      <div className="flex w-full justify-center mainContainer">
        <label
          className="block text-sm font-bold text-gray-900 dark:text-gray-300 border-2 p-2"
          htmlFor="user_avatar"
        >
          Upload file
        </label>
        <input
          className="hidden block w-1/2 h-10 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          onChange={onImageChange}
          multiple
          id="user_avatar"
          type="file"
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm mx-3"
          onClick={startIPFS}
        >
          Submit
        </button>
      </div>
      <div className="flex my-2 displayFileData">
        {loading
          ? Object.entries(fileData).map((file, index) => {
              return (
                <div className="my-3 mx-4 w-[100px] fileContainer" key={index}>
                  <img src={docImage} alt="" className="w-[100px]" />
                  <strong className="text-[10px] my-1 fileName">
                    {file[1].name}
                  </strong>
                </div>
              )
            })
          : null}
      </div>
      <div className="flex displayHash">
        {loading2
          ? fileHash.map((hash, index) => {
              console.log(hash)
              return (
                <div className=" mx-3 my-3 hashElement" key={index}>
                  {hash.path}
                </div>
              )
            })
          : null}
      </div>
    </div>
  )
}

export default MainHomePage
