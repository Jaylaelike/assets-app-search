/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import PhotoCameraBackRoundedIcon from "@mui/icons-material/PhotoCameraBackRounded";
import { pink } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  AlertTitle,
} from "@mui/material";

export default function Avatar({ url, onUpload }) {
  //size in params
  // const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [fileName, setFileName] = useState("");
  const [fileCount, setFileCount] = useState(0);
  const [files, setFiles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFail, setShowAlertFail] = useState(false);

  useEffect(() => {
    // if (url) downloadImage(url);
    fetchFiles();
  }, [url]);

  useEffect(() => {
    async function fetchFiles() {
      try {
        setUploading(true);
        const { data } = await supabase.storage.from("avatars").list("", {
          limit: 200,
          offset: 0,
          sortBy: { column: "created_at", order: "desc" },
        });

        // Update the state with the list of files
        //Bug from supabase get ..emptyFolderPlaceholder we use pop()
        const newData = [...data];
        newData.pop();
        setFiles(newData);
        console.log(data);

        setFileCount(((newData.length / 6057) * 100).toFixed(2));
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
        limit: 200,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

      // Update the state with the list of files
      //Bug from supabase get ..emptyFolderPlaceholder we use pop()
      const newData = [...data];
      newData.pop();
      setFiles(newData);

      setFileCount(((newData.length / 6057) * 100).toFixed(2));
    } catch (error) {
      console.error("Error listing files:", error.message);
    }
  }

  // async function deleteImage(fileName) {
  //   try {
  //     await supabase.storage.from("avatars").remove([fileName]);

  //     // Remove the deleted file from the state
  //     setFiles(files.filter((file) => file.name !== fileName));
  //   } catch (error) {
  //     console.error("Error deleting file:", error.message);
  //   } finally {
  //     fetchFiles();
  //   }
  // }

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
      setShowAlert(false);

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
      setShowAlertFail(true);
    } finally {
      setUploading(false);
      setShowAlert(true);
    }
  }

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredFiles = files.filter((file) =>
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  ///Delete images

  const handleDelete = (file) => {
    setSelectedFile(file);
    setOpenDialog(true);
  };

  const handleDeleteConfirmation = async () => {
    try {
      await supabase.storage.from("avatars").remove([selectedFile.name]);

      // Remove the deleted file from the state
      setFiles(files.filter((file) => file.name !== selectedFile.name));
      setSelectedFile(null);
      setOpenDialog(false);
    } catch (error) {
      console.error("Error deleting file:", error.message);
    } finally {
      fetchFiles();
    }
  };

  const handleCloseDialog = () => {
    setSelectedFile(null);
    setOpenDialog(false);
  };

  //Show alert for upload state success
  const handleAlertClose = () => {
    setShowAlert(false);
  };

  const handleAlertCloseFailed = () => {
    setShowAlertFail(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 justify-center p-8 pt-0">
        <div className="flex justify-center  gap-3">
          <div>
            <label> ID </label>
          </div>
          <input
            type="search"
            id="default-search"
            value={fileName}
            onChange={(e) => setFileName(e.target.value)}
            className="block  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="กรอกเลข ID ให้ตรงกับอุปกรณ์"
            required
          ></input>
        </div>
        <div className="flex justify-center pt-10 gap-3">
          <div>
            <label> ค้นหา </label>
          </div>

          <div>
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="ป้อน ID ที่คุณค้นหา"
              value={searchTerm}
              onChange={handleSearch}
            ></input>

            {filteredFiles?.length === 0 ? (
              <div className="flex justify-center pt-8 gap-3">
                <p> {`ไม่พบรูปภาพที่ค้นหา "${searchTerm}"`}</p>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-2">
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
        <PhotoCameraBackRoundedIcon sx={{ fontSize: 40, color: pink[500] }} />
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

      <div className="pt-0">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-4xl lg:text-4xl dark:text-white">
          Images Assets
        </h1>
        <p className="text-3xl text-gray-500 dark:text-white">
          Total Files: {Math.round((fileCount * 6057) / 100)} / 6057{" "}
        </p>
        {/* <ul>
          {files.map((file) => (
            <li key={file.name}>{file.name}</li>
          ))}
        </ul> */}
        <div className="flex justify-center p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {filteredFiles.map((file) => (
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
                    src={import.meta.env.VITE_IMAGES_URL + `${file.name}`}
                    alt={file.name}
                  />

                  <button
                    type="button"
                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    // onClick={() => deleteImage(file.name)}
                    onClick={() => handleDelete(file)}
                  >
                    ลบ
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>คุณต้องการจะลบรูป: {selectedFile?.name}?</DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteConfirmation} color="secondary">
            Delete
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={showAlert}
        autoHideDuration={5000} // Duration to show the alert in milliseconds (adjust as needed)
        onClose={handleAlertClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MuiAlert
          onClose={handleAlertClose}
          severity="success"
          elevation={6}
          variant="filled"
        >
          เย้ 🥳 อัพโหลดไฟล์เสร็จแล้วค่ะ 🙏🏻
        </MuiAlert>
      </Snackbar>

      <Snackbar
        open={showAlertFail}
        autoHideDuration={5000} // Duration to show the alert in milliseconds (adjust as needed)
        onClose={handleAlertCloseFailed}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {/* <MuiAlert
          onClose={handleAlertCloseFailed}
          severity="success"
          elevation={6}
          variant="filled"
        >
          แย่จัง!! เกิดข้อผิดพลาดในการอัพโหลดไฟล์ 🙏🏻
        </MuiAlert> */}

        <Alert severity="error">
          <AlertTitle>เกิดข้อผิดพลาด</AlertTitle>
          แย่จัง!! เกิดข้อผิดพลาดในการอัพโหลดไฟล์ 🙏🏻 — <strong>กรุณาตรวจสอบ ID !</strong>
        </Alert>
      </Snackbar>
    </div>
  );
}
