/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import PhotoCameraBackRoundedIcon from '@mui/icons-material/PhotoCameraBackRounded';
import { pink } from '@mui/material/colors';


export default function Avatar({ url, onUpload }) {
  //size in params
  // const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    // if (url) downloadImage(url);
    fetchFiles();
  }, [url]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        setUploading(true);
        const { data } = await supabase.storage.from("avatars").list("", {
          limit: 100,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

        // Update the state with the list of files
        //Bug from supabase get ..emptyFolderPlaceholder we use pop()
        const newData = [...data];
        newData.pop();
        setFiles(newData);
        console.log(data);

        setFileCount(((newData.length / 6001) * 100).toFixed(2));
      } catch (error) {
        console.error("Error listing files:", error.message);
      } finally {
        setUploading(false);
      }
    }

    fetchFiles();
  }, []);

  async function fetchFiles() {
    try {
      const { data } = await supabase.storage.from("avatars").list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

      // Update the state with the list of files
      //Bug from supabase get ..emptyFolderPlaceholder we use pop()
      const newData = [...data];
      newData.pop();
      setFiles(newData);

      setFileCount(((newData.length / 6001) * 100).toFixed(2));
    } catch (error) {
      console.error("Error listing files:", error.message);
    }
  }

  async function deleteImage(fileName) {
    try {
      await supabase.storage.from("avatars").remove([fileName]);

      // Remove the deleted file from the state
      setFiles(files.filter((file) => file.name !== fileName));
    } catch (error) {
      console.error("Error deleting file:", error.message);
    } finally {
      fetchFiles();
    }
  }

  // async function downloadImage(path) {
  //   try {
  //     const { data, error } = await supabase.storage
  //       .from("avatars")
  //       .list("")
  //       .download(path);
  //     if (error) {
  //       throw error;
  //     }
  //     const url = URL.createObjectURL(data);
  //     setAvatarUrl(url);
  //   } catch (error) {
  //     console.log("Error downloading image: ", error.message);
  //   }
  // }


  async function uploadAvatar(event) {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      if (!fileName) {
        throw new Error("โปรดใส่ ID ของอุปกรณ์ด้วยค่ะ.");
      }

      const file = event.target.files[0];
      const filePath = `${fileName}.jpg`;

      let { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(event, filePath);
      setFileName(""); // Clear the fileName input field
    } catch (error) {
      alert(error.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <div>
        <label> ID </label>
        <input
          type="text"
          value={fileName}
          onChange={(e) => setFileName(e.target.value)}
          placeholder="กรอกเลข ID ให้ตรงกับอุปกรณ์"
        />
      </div>
      {/* 
      {avatarUrl ? (
        <img
          src={avatarUrl}
          alt="Avatar"
          className="avatar image"
          style={{ height: size, width: size }}
        />
      ) : (
        <div
          className="avatar no-image"
          style={{ height: size, width: size }}
        />
      )} */}

      <div className="flex justify-center pt-10">
        <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        Upload file
        <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        ></input>
      </div>

      <div className="flex justify-center p-8">
      <PhotoCameraBackRoundedIcon  sx={{ fontSize: 40 , color:pink[500] }} />
        <div className="flex justify-between mb-1">
          <span className="text-base font-medium text-blue-700 dark:text-white">
            Percent of Assets images
          </span>
          <span className="text-sm font-medium text-blue-700 dark:text-white">
            {fileCount} %
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${fileCount}` + "%" }}
          ></div>
        </div>
      </div>

      <div>
        <h1>List of Files</h1>
        <p>Total Files: {Math.round((fileCount * 6001) / 100)} / 6001 </p>
        {/* <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul> */}
        <div className="flex justify-center p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {files.map((file) => (
              <div
                key={file.name}
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "10px",
                }}
              >
                <div className="grid grid-cols-1 gap-4">
                  <img
                    className="h-auto max-w-full rounded-lg"
                    key={file.name}
                    src={ import.meta.env.VITE_IMAGES_URL + `${file.name}`}
                    alt={file.name}
                  />

                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    onClick={() => deleteImage(file.name)}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
