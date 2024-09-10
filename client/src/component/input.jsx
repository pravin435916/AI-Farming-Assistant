import React, { useState } from "react";
import axios from "axios";
import { LuUploadCloud } from "react-icons/lu";
import Potato from "/assets/plants/potatoo.png"; // Corrected paths for images
import groundnut from "/assets/plants/groundnut.png";
import tomata from "/assets/plants/tomata.png";
import pepper from "/assets/plants/pepper.png";
import blackgram from "/assets/plants/blackgram.png";

function Input() {
  const [image, setImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [data, setData] = useState("");
  const [per, setPer] = useState(0);
  const [url, setUrl] = useState("");

  const onFileChange = (event) => {
    const uploadedImage = event.target.files[0];
    setSelectedFile(uploadedImage);
    if (!uploadedImage) return;
    setImage(URL.createObjectURL(uploadedImage));
  };

  const onFileUpload = () => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios.post(`http://localhost:8000/predict/${url}`, formData).then((response) => {
      const obj = response.data;
      setData(obj.class);
      setPer(obj.confidence);
    });
  };

  const clearData = () => {
    setSelectedFile(null);
    setImage(false);
    setData("");
    setPer(0);
  };

  return (
    <>
      <h1 className="text-3xl font-bold text-center mb-8">Give it a try</h1>
      <div className="flex flex-col items-center mb-8">
        <h2 className="text-xl font-semibold mb-4">Select a plant</h2>
        <div className="flex gap-4">
          <button onClick={() => setUrl('potato')} className=" bg-gray-400 rounded-full p-2 active:bg-gray-200" title="potato">
            <img className="w-16 h-16" src={Potato} alt="Potato" />
          </button>
          <button onClick={() => setUrl('tomato')} className="bg-gray-400 rounded-full p-2 active:bg-gray-200" title="tomato">
            <img className="w-16 h-16" src={tomata} alt="Tomato" />
          </button>
          <button onClick={() => setUrl('pepper')} className="bg-gray-400 rounded-full p-2 active:bg-gray-200" title="pepper">
            <img className="w-16 h-16" src={pepper} alt="Pepper" />
          </button>
          <button onClick={() => setUrl('groundnut')} className="bg-gray-400 rounded-full p-2 active:bg-gray-200" title="groundnut">
            <img className="w-16 h-16" src={groundnut} alt="Groundnut" />
          </button>
          <button onClick={() => setUrl('blackgram')} className="bg-gray-400 rounded-full p-2 active:bg-gray-200" title="blackgram">
            <img className="w-16 h-16" src={blackgram} alt="Blackgram" />
          </button>
        </div>
      </div>
      <input type="button" value="" /> {/* This line seems redundant, you might remove it */}
      <div className="flex justify-center items-center gap-8">
        <div className="box1 mr-4">
          {!image && (
            <div className="flex flex-col gap-4">
              <span className="text-3xl font-bold">Is Your Plant Healthy ? </span>
              <p>Check By Upload a photo of your <strong>{url}</strong> plant</p>
              <div className="flex flex-col p-4 justify-center items-center h-64 w-[28rem] border-4 border-dashed rounded-lg">
                <span className="text-9xl"><LuUploadCloud /></span>
                <span className="">Click Here for Upload image</span>
                <input
                  className="absolute opacity-0 cursor-pointer py-20 w-96 border "
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                />
              </div>
            </div>
          )}
          {image && <img className="mt-4 h-64 w-[28rem] object-cover" id="upload-img" src={image} alt="Uploaded plant" />}
          <div className="flex justify-center items-center text-white mt-4 gap-8">
            <button className="btn bg-black" onClick={onFileUpload}>Identify</button>
            <button className="btn bg-black" onClick={clearData}>Clear Data</button>
          </div>
        </div>
        <div className="box2">
          <div className="text2">
            <h2 className="text-xl font-semibold">Result</h2>
            <p><strong>Disease:</strong> {data}</p>
            <p><strong>Confidence:</strong> {(per * 100).toFixed(2)}%</p>
          </div>
          {data == "Anthracnose" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts</li>
                <li>Fungicide Application</li>
              </ul>
            </div>
          )}
          {data == "Leaf Crinckle" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts</li>
                <li>Control Aphid Vectors</li>
                <li>Plant Virus-free Seed</li>
              </ul>
            </div>
          )}
          {data == "Powdery Mildew" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts</li>
                <li>Fungicide Application</li>
                <li>Air Circulation</li>
              </ul>
            </div>
          )}
          {data == "Yellow Mosaic" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts</li>
                <li>Control Whitefly Vectors</li>
                <li>Plant Virus-Free Seed</li>
              </ul>
            </div>
          )}
          {data == "Early Blight" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Proper Fertilization</li>
                <li>Irrigation</li>
                <li>Management of other pests</li>
              </ul>
            </div>
          )}
          {data == "Late Blight" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Apply Fungicides</li>
                <li>Management of other pests</li>
              </ul>
            </div>
          )}
          {data == "Mosaic Virus" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts</li>
                <li>Control Whitefly Vectors</li>
                <li>Plant Virus-Free Seed</li>
              </ul>
            </div>
          )}
          {data == "YellowLeaf Curl Virus" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts</li>
                <li>Control Whitefly Vectors</li>
                <li>Plant Virus-Free Seed</li>
              </ul>
            </div>
          )}
          {data == "Bell Bacterial Spot" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Copper Sprays</li>
              </ul>
            </div>
          )}
          {data == "Early Leaf Spot" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Apply Fungicides or Neem Oil</li>
              </ul>
            </div>
          )}
          {data == "Early Rust" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts</li>
              </ul>
            </div>
          )}
          {data == "Late Leaf Spot" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Crop rotation with non-host crops preferably cereals</li>
              </ul>
            </div>
          )}
          {data == "Nutrition Deficiency" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Application of 250kg/Ha Gypsum</li>
              </ul>
            </div>
          )}
          {data == "Rust" && (
            <div className="treat">
              <h1>Treatment</h1>
              <ul>
                <li>Remove Affected Parts
                  
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Input;