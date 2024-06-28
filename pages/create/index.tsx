import React, { useState } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import Collection_dropdown2 from "../../components/dropdown/collection_dropdown2";
import {
  collectionDropdown2_data,
  EthereumDropdown2_data,
} from "../../data/dropdown";
import { FileUploader } from "react-drag-drop-files";
import Proparties_modal from "../../components/modal/proparties_modal";
import { useDispatch } from "react-redux";
import { showPropatiesModal } from "../../redux/counterSlice";
import Meta from "../../components/Meta";
import axios from "axios";

const Create = () => {
  const fileTypes = [
    "JPG",
    "PNG",
    "GIF",
    "SVG",
    "MP4",
    "WEBM",
    "MP3",
    "WAV",
    "OGG",
    "GLB",
    "GLTF",
  ];
  const [file, setFile] = useState("");
  const [token_id, setToken_id] = useState("5");

  const dispatch = useDispatch();

  const uploadToPinata = async file => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios({
          method: 'POST',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: '4a86a8be0709d53c0eba',
            pinata_secret_api_key:
              'b602a8ba8ce3a572fb3cb83573d93af1066f3fccee4d1647bde0e6299a9723ed',
            'Content-Type': 'multipart/form-data',
          },
        });
        const CID = response.data.IpfsHash;
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${CID}`;
        console.log(ImgHash);
        return ImgHash;
      } catch (error) {
        console.log('Unable to upload image to Pinata');
      }
    }
  };

  const uploadDocToPinata = async file => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('file', file);
        const response = await axios({
          method: 'POST',
          url: 'https://api.pinata.cloud/pinning/pinFileToIPFS',
          data: formData,
          headers: {
            pinata_api_key: '1bce2636b898ada50d62',
            pinata_secret_api_key:
              'b01a3d10a80598681bde3dd3a36d9db79bd937c608f846adcafa218ecfa3c965',
            'Content-Type': 'multipart/form-data',
          },
        });
        const CID = response.data.IpfsHash;
        const DocHash = `https://gateway.pinata.cloud/ipfs/${CID}`;
        console.log(DocHash);
        return DocHash;
      } catch (error) {
        console.log('Unable to upload image to Pinata');
      }
    }
  };

  const pinJSONToIPFS = async (name, description, ImgHash, DocHash) => {
    const JWT =
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiIxNDgwOGYzMi1hMGUyLTQ1ZDMtYjg3Mi02YjgzYjMzNzNmMTEiLCJlbWFpbCI6InNpZGRoYXJ0aHByYW5heTBAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsInBpbl9wb2xpY3kiOnsicmVnaW9ucyI6W3siZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiRlJBMSJ9LHsiZGVzaXJlZFJlcGxpY2F0aW9uQ291bnQiOjEsImlkIjoiTllDMSJ9XSwidmVyc2lvbiI6MX0sIm1mYV9lbmFibGVkIjpmYWxzZSwic3RhdHVzIjoiQUNUSVZFIn0sImF1dGhlbnRpY2F0aW9uVHlwZSI6InNjb3BlZEtleSIsInNjb3BlZEtleUtleSI6IjFiY2UyNjM2Yjg5OGFkYTUwZDYyIiwic2NvcGVkS2V5U2VjcmV0IjoiYjAxYTNkMTBhODA1OTg2ODFiZGUzZGQzYTM2ZDlkYjc5YmQ5MzdjNjA4Zjg0NmFkY2FmYTIxOGVjZmEzYzk2NSIsImV4cCI6MTc1MTA5MzYxN30.zZo06lenceMlVU11_3q_0UPewOwsB-ermN0griNiaTk';

    const data = JSON.stringify({
      pinataContent: {
        name: name,
        description: description,
        image: ImgHash,
        document: DocHash,
      },
      pinataMetadata: {
        name: 'metadata.json',
      },
    });
    try {
      const res = await axios.post(
        'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: JWT,
          },
        }
      );
      console.log('PIN JSON func return: ', res.data);
      console.log('PIN JSON func return IPFSHash: ', res.data.IpfsHash);
      const fileUrl = `https://gateway.pinata.cloud/ipfs/${res.data.IpfsHash}`;
      setFinalHash(fileUrl);
    } catch (error) {
      console.log(error);
      // return error
    }
    alert('NFT has been listed');

    setToken_id(String(Number(token_id) + 1))

    let dataMint = JSON.stringify({
      "contractAddress": "nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7",
      "account": "nibi197gw9qcxfnvypn3dwqwys2jptgyrl5zksfz86a",
      "token_id": "7",
      "token_uri": `${finalHash}`,
      "name": `${name}`,
      "description": `${description}`,
      "attributes": "[]"
    });
    
    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/mint-nft',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataMint
    };
    
    axios.request(config)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });

    let dataApprove = JSON.stringify({
      "spender": "nibi1j65ycuzrawuyntjmgkl26qv3hy4y93xexjuyelrvv9q6n8smvh5sg9jrx6",
      "contractAddress": "nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7",
      "account": "nibi197gw9qcxfnvypn3dwqwys2jptgyrl5zksfz86a",
      "token_id": "7"
    });
    
    let configApprove = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/approve-nft',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataApprove
    };
    
    axios.request(configApprove)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });
    

    let dataList = JSON.stringify({
      "contractAddress": "nibi1j65ycuzrawuyntjmgkl26qv3hy4y93xexjuyelrvv9q6n8smvh5sg9jrx6",
      "collectionAddress": "nibi1gu49g3vndt6ued4k329j83xvkf4nk236vqm6zsxattztwxqnztfqnpu6p7",
      "account": "nibi197gw9qcxfnvypn3dwqwys2jptgyrl5zksfz86a",
      "token_id": "7",
      "auction_config": {
        "fixed_price": {
          "price": {
            "denom": "unibi",
            "amount": `${price}`
          },
          "start_time": null,
          "end_time": null
        }
      }
    });
    
    let configList = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:3000/list-nft',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : dataList
    };
    
    axios.request(configList)
    .then((response) => {
      console.log(JSON.stringify(response.data));
    })
    .catch((error) => {
      console.log(error);
    });


  };

  const [imgHasg, setImgHash]= useState<string| undefined>("");
  const [docHash, setDocHash] = useState<string| undefined>("");
  const [finalHash, setFinalHash] = useState<string| undefined>("");
  const [name, setName] = useState<string| undefined>("");
  const [description, setDescription] = useState<string| undefined>("");
  const [price, setPrice] = useState<string|undefined>("")

  const handleChange = async (file) => {
    setFile(file.name);
    // console.log(file);
    const imgHash = await uploadToPinata(file);
    setImgHash(imgHash);

    // pinJSONToIPFS(file.name, "description", "external_url", "CID");
  };
  const fileTypePDF = ["PDF"];
  const [filePDF, setFilePDF] = useState("");

  const handleChangePDF = async (file) => {
    setFile(file.name);
    const DocHash =await uploadDocToPinata(file);
    setDocHash(DocHash);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await pinJSONToIPFS(name, description, imgHasg, docHash);
    console.log("Final Hash", finalHash);
    // setFinalHash(finalHash);
  };


  return (
    <div>
      <Meta title="Create || Xhibiter | NFT Marketplace Next.js Template" />
      {/* <!-- Create --> */}
      <section className="relative py-24">
        <picture className="pointer-events-none absolute inset-0 -z-10 dark:hidden">
          <img
            src="/images/gradient_light.jpg"
            alt="gradient"
            className="h-full w-full"
          />
        </picture>
        <div className="container">
          <h1 className="font-display text-jacarta-700 py-16 text-center text-4xl font-medium dark:text-white">
            Create
          </h1>

          <div className="mx-auto max-w-[48.125rem]">
            {/* <!-- Name --> */}
            <div className="mb-6">
              <label
                htmlFor="item-name"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Name<span className="text-red">*</span>
              </label>
              <input
                type="text"
                id="item-name"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Property Name"
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            {/* <!-- Description --> */}
            <div className="mb-6">
              <label
                htmlFor="item-description"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Description
              </label>
              <p className="dark:text-jacarta-300 text-2xs mb-3">
                The description will be included on the {"Property's"} detail page
                underneath its image. Markdown syntax is supported.
              </p>
              <textarea
                id="item-description"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                rows={4}
                required
                placeholder="Provide a detailed description of your item."
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>
            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Property Image
                <span className="text-red">*</span>
              </label>

              {file ? (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  successfully uploaded : {file}
                </p>
              ) : (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Drag or choose your file to upload
                </p>
              )}

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M16 13l6.964 4.062-2.973.85 2.125 3.681-1.732 1-2.125-3.68-2.223 2.15L16 13zm-2-7h2v2h5a1 1 0 0 1 1 1v4h-2v-3H10v10h4v2H9a1 1 0 0 1-1-1v-5H6v-2h2V9a1 1 0 0 1 1-1h5V6zM4 14v2H2v-2h2zm0-4v2H2v-2h2zm0-4v2H2V6h2zm0-4v2H2V2h2zm4 0v2H6V2h2zm4 0v2h-2V2h2zm4 0v2h-2V2h2z" />
                  </svg>
                  <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                    JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV, OGG, GLB, GLTF. Max
                    size: 100 MB
                  </p>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                  <FileUploader
                    handleChange={handleChange}
                    name="file"
                    types={fileTypes}
                    classes="file-drag"
                    maxSize={100}
                    minSize={0}
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label className="font-display text-jacarta-700 mb-2 block dark:text-white">
                Property Document (PDF)
                <span className="text-red">*</span>
              </label>

              {file ? (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Successfully uploaded: {file}
                </p>
              ) : (
                <p className="dark:text-jacarta-300 text-2xs mb-3">
                  Drag or choose your PDF file to upload
                </p>
              )}

              <div className="dark:bg-jacarta-700 dark:border-jacarta-600 border-jacarta-100 group relative flex max-w-md flex-col items-center justify-center rounded-lg border-2 border-dashed bg-white py-20 px-5 text-center">
                <div className="relative z-10 cursor-pointer">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="fill-jacarta-500 mb-4 inline-block dark:fill-white"
                  >
                    <path fill="none" d="M0 0h24v24H0z" />
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93s3.06-7.44 7-7.93v15.86zm2-15.86c1.03.13 2 .45 2.87.93H13v-.93zM13 7h5.24c.25.31.48.65.68 1H13V7zm0 3h6.74c.08.33.15.66.19 1H13v-1zm0 3h6.93c-.02.34-.07.67-.14 1H13v-1zM13 19.93V19h2.87c-.87.48-1.84.8-2.87.93zM18.24 17H13v-1h5.92c-.2.35-.43.69-.68 1zm1.5-3H13v-1h6.93c-.07.33-.12.66-.19 1z"/>
                  </svg>
                  <p className="dark:text-jacarta-300 mx-auto max-w-xs text-xs">
                    PDF files only. Max size: 10 MB
                  </p>
                </div>
                <div className="dark:bg-jacarta-600 bg-jacarta-50 absolute inset-4 cursor-pointer rounded opacity-0 group-hover:opacity-100 ">
                  <FileUploader
                    handleChange={handleChangePDF}
                    name="filePDF"
                    types={fileTypePDF}
                    classes="file-drag"
                    maxSize={10}
                    minSize={0}
                  />
                </div>
              </div>
            </div>
            <div className="mb-6">
              <label
                htmlFor="price"
                className="font-display text-jacarta-700 mb-2 block dark:text-white"
              >
                Checkout Price<span className="text-red">*</span>
              </label>
              <input
                type="number"
                id="price"
                className="dark:bg-jacarta-700 border-jacarta-100 hover:ring-accent/10 focus:ring-accent dark:border-jacarta-600 dark:placeholder:text-jacarta-300 w-full rounded-lg py-3 px-3 hover:ring-2 dark:text-white"
                placeholder="Checkout Price"
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
            {/* <!-- Submit --> */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-accent-lighter hover:bg-accent-dark border-2 text-black cursor-default rounded-full py-3 px-8 text-center font-semibold text-white transition-all"
            >
              Create
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Create;
