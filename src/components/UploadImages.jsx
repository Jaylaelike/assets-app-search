import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { supabase } from "./upload_images/supabaseClient";
import axios from 'axios';

import PhotoCameraBackRoundedIcon from "@mui/icons-material/PhotoCameraBackRounded";
import { pink } from "@mui/material/colors";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Alert,
  AlertTitle,
  LinearProgress
} from "@mui/material";
import { Skeleton } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import DeleteConfirmationDialog from './ConfirmDelete'
// import { useNavigate } from "react-router-dom";
// import { decode } from "base64-arraybuffer";

const CardContentNoPadding = styled(CardContent)(`
  padding: 0;
  &:last-child {
    padding-bottom: 0;
  }
`);

const CDNURL = import.meta.env.VITE_CDN_URL;

const UploadImages = () => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // const [selectedImageName, setSelectedImageName] = useState(null);
  const [selectedImageId, setSelectedImageID] = useState('');
  const [searchId, setSearchId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [fileCount, setFileCount] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertFail, setShowAlertFail] = useState(false);
  const [open, setOpen] = useState(false);
  const [dataToDelete, setDataToDelete] = useState({ image: '', imageId: '' });
  const [isUploadShow, setIsUploadShow] = useState(false);
  const [isShowImageUpdate, setIsShowImageUpdate] = useState('');


  //Check ID validate
  const stringValPatternValidation = (value) => {
    return /\s/g.test(value);
  };
  const handleChangeStringVal = (event) => {
    const { value } = event.target;
    const isValid = stringValPatternValidation(value);
    setSelectedImageID(value);
    setIsValid(isValid);
    //console.log(stringValPatternValidation(value));
  };

  // const handleCloseDialog = () => {
  //   setDelSelectedFile(null);
  //   setOpenDialog(false);
  // };

  // const handleConfirmDelete = (image, imageId) => {
  // handleDelete(image, imageId);
  // setDelSelectedFile(image)
  //   setOpenDialog(true);
  // };

  const handleDelete = (image, imageId) => {
    // Store the image and imageId in the state
    setDataToDelete({ image, imageId });
    // Show the dialog
    setOpen(true);
  };
  const handleDialogClose = () => {
    setOpen(false); // Close the dialog without deleting
  };

  const filteredData = images.filter((item) => item.id.toString().includes(searchId.toLowerCase()));

  useEffect(() => {
    fetchData();
    fetchFilesCount();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);


  const fetchData = async () => {
      try {
        setUploading(true);
        const response = await axios.get(import.meta.env.VITE_URL_IMAGES_API);
        const data = response.data;
        console.log(response.data);
        setImages(data);
        return  data;
      } catch (error) {
        console.error('Error fetching images:', error);
      } finally {
        setUploading(false)
      }
  };

  async function fetchFilesCount() {
    try {
      const { data } = await supabase.storage.from("avatars").list("", {
        limit: 500,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

      // Update the state with the list of files
      //Bug from supabase get ..emptyFolderPlaceholder we use pop()
      const newData = [...data];
      newData.pop();

      setFileCount(((newData.length / 6057) * 100).toFixed(2));
    } catch (error) {
      console.error("Error listing files:", error.message);
    }
  }

  const handleFileChange = (event) => {
      const file = event.target.files[0];
      setNewImage(file);
  };

  const createImageUrl = async (idInput, imageUrl, imageName) => {
    try {
      setUploading(true)
      const response = await fetch(import.meta.env.VITE_UPLOAD_URL_IMAGES + "create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: idInput , image_url: imageUrl , image_name: imageName }),
      });
      if (!response.ok) {
        throw new Error("Failed to post image URL to API");
      }
      return response; 
    } catch (error) {
      console.error("An error occurred while creating the image URL:", error.message);
      throw error;
    } finally {
      setUploading(false)
    }
   

  
  };

  const updateImageUrl = async (imageUrlUpdate, imageNamesUpdate, idInput) => {
    try {
      setUploading(true)
      const response = await fetch(import.meta.env.VITE_UPLOAD_URL_IMAGES + "update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({image_url: imageUrlUpdate , image_name: imageNamesUpdate,  id: idInput}),
      });
    
      if (!response.ok) {
        throw new Error("Failed to post image URL to API");
      }
      return response; 
    } catch (error) {
      console.error("An error occurred while updating the image URL:", error.message);
    } finally {
      setUploading(false)
    }
   
  };

  const deleteImageUrl = async (idInput) => {
    try {
      setUploading(true)
      const response = await fetch(import.meta.env.VITE_UPLOAD_URL_IMAGES + "delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({id: idInput}),
      });
      if (!response.ok) {
        throw new Error("Failed to post image URL to API");  
      }
      return response; 
    } catch (error) {
      console.error("An error occurred while deleting the image URL:", error.message);
    } finally {
   setUploading(false)
    }
  
  };

  const handleUpload = async () => {

    if (!newImage || newImage === 0) {
      alert("กรุณาใส่รูปภาพ!!!");
    }
    // if (!newImage.value) {
    //   alert("โปรดใส่ ID ของอุปกรณ์ด้วยค่ะ.");
    // }

    if (!newImage) return;
    const id = uuidv4();
    const fileExt = "jpg";
    const fileName = `${id}.${fileExt}`;

    try {
      setShowAlert(false)
      setUploading(true)

      // Get the image URL from Supabase after uploading
      const imageUrl = CDNURL + fileName;

      // Get images name for post creat database after uploading
      const imageNames = fileName;
     
      // Post the image URL to the API 
     const response  = await createImageUrl(selectedImageId ,imageUrl, imageNames)
      if (!response.ok) {
        throw new Error("Failed to post image URL to API");
      } else {
        const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, newImage);
      if (uploadError) throw uploadError;
      }
      // setIdInput('');
      setSelectedImageID('')
      setNewImage(null);
      setShowAlert(true)
      fetchData();
      
    } catch (error) {
      setShowAlertFail(true);
      console.error("Error uploading image:", error);
      alert(`ขออภัยค่ะ ID: ${selectedImageId} มีรูปภาพอยู่แล้ว`);
    } finally {
      setUploading(false)
      fetchFilesCount();
     
    }
    
  };

  const handleUpdate = async () => {
    if (!selectedImage || !newImage) return;

    //const id = selectedImage.name.split('.')[0];
    const newId = uuidv4();
    const fileExt = "jpg";
    const newFileName = `${newId}.${fileExt}`;

    try {
      setUploading(true)
      setShowAlert(false)

        // Get the image URL from Supabase after uploading
      const imageUrlUpdate = CDNURL + newFileName;

       // Get images name for post creat database after uploading
      const imageNamesUpdate = newFileName;

      // Post the image URL to the API
      const response = await updateImageUrl(imageUrlUpdate, imageNamesUpdate, selectedImageId);
      if (!response.ok) {
        throw new Error("Failed to post image URL to API");
      } else {
              // Remove the old image from Supabase storage
      await supabase.storage.from("avatars").remove([selectedImage.image_name]);

      // Upload the new image to Supabase storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(newFileName, newImage);
      if (uploadError) throw uploadError;

      // Update the image entry in the database with the new image name
      await supabase
        .from("images")
        .update({ name: newFileName })
        .eq("name", selectedImage.image_name);
        
      }


      // setIdInput('');
      setSelectedImageID('')
      setIsShowImageUpdate('')
      setNewImage(null);
      setSelectedImage(null);
      fetchData();
    } catch (error) {
      setShowAlertFail(true);
      console.error("Error updating image:", error);
    } finally{
      setUploading(false)
      setShowAlert(true)
      fetchFilesCount();
    }
  };

  const handleUpdateImage = (image) => {
    setIsShowImageUpdate(image.image_url);
    setIsUploadShow(!isUploadShow);
    setSelectedImage(image);
    // setSelectedImageName(image.image_name);
    setSelectedImageID(image.id);
  };


  // const handleDelete = async (image, imageId) => {
  //   try {
  //     setUploading(true)
  //     const response = await deleteImageUrl(imageId);
  //     if (!response.ok) {
  //       throw new Error("Failed to post image URL to API");
  //     } else {
  //       await supabase.storage.from("avatars").remove([image]);
  //     }

  //     fetchData();
  //   } catch (error) {
  //     setShowAlertFail(true);
  //     console.error("Error deleting image:", error);
  //   } finally {
  //     setUploading(false)
  //     fetchFilesCount();
  //   }
  // };
  const handleConfirmDelete = async () => {
    const { image, imageId } = dataToDelete;
    try {
      setUploading(true);
      // Call your deleteImageUrl function passing the imageId
      const response = await deleteImageUrl(imageId);
      if (!response.ok) {
        throw new Error("Failed to post image URL to API");
      } else {
        // Use Supabase to remove the image from storage
        await supabase.storage.from("avatars").remove([image]);
      }
      // Fetch the updated data after deletion
      fetchData();
    } catch (error) {
      setShowAlertFail(true);
      console.error("Error deleting image:", error);
    } finally {
      setUploading(false);
      // Fetch the updated files count after deletion
      fetchFilesCount();
    }
    setOpen(false); // Close the dialog after deletion
  };

  const handleImageClick = (id) => {
    setSearchId(id.toString());
  };

  // const isDataAlreadyExists = () => {
  //   return images.find((item) => item.id.toString().includes(selectedImageId));
  // };
 
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
          <div className="grid grid-cols-1 justify-center pt-0">
            <input
              type="search"
              id="default-search"
              value={selectedImageId}
              onChange={handleChangeStringVal}
              className="block p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="กรอกเลข ID ให้ตรงกับอุปกรณ์"
              required
            ></input>

            {isValid && (
              <div className="p-6" style={{ color: "#F61C04" }}>
                มีช่องว่างระหว่างตัวอักษรโปรดตรวจสอบด้วยค่ะ
              </div>
            )}
          </div>
        </div>
      </div>

  {/* Image upload */}
      <div className="grid grid-cols-1 justify-center pt-2 gap-3 pb-5">
        {/* <label className="button primary block" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label> */}
       อัพโหลดรูปภาพใหม่
       <div className="grid grid-cols-1 justify-center">
       <input
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={uploading}
        ></input>
         </div>

        <button
          type="button"
          onClick={handleUpload}
          className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
        >
          <p>
          {uploading ? "Uploading ..." : "Upload"}
            </p>
        </button>
      </div>
 
     
      {/* Image update */}
      {isUploadShow && (  <div className="grid grid-cols-1 justify-center gap-2">
     
     
    
      {selectedImage && (
        <>
           <div  className="grid grid-cols-1 justify-center gap-2">
        <h2>อัพเดทรูปภาพ</h2>
        <img className="h-auto max-w-lg rounded-lg" src={isShowImageUpdate} width={200} height={200} />
        </div>
          <input  
          className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
          id="file_input"
          type="file"
          accept="image/*" 
          onChange={handleFileChange} />
          <button className="text-black bg-gradient-to-r from-yellow-300 to-yellow-400 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
          onClick={handleUpdate}>Update</button>
        </>
      )}
     </div>)}

    
     

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
      </div>

      {/* Image list */}
      
      <div className="flex justify-center pt-10 gap-3 pb-5">
        <div>
          <label> ค้นหา </label>
        </div>

        <div>
          <input
            type="search"
            id="default-search"
            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="ป้อน ID ที่คุณค้นหา"
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
          ></input>

          {filteredData?.length === 0 ? (
            <div className="flex justify-center pt-8 gap-3">
              <p> {`ไม่พบรูปภาพที่ค้นหา "${searchId}"`}</p>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
      
     {/* Show data card filter */}

<Grid
        container
        spacing={{ xs: 2, md: 1 }}
        columns={{ xs: 4, sm: 8, md: 16 }}
        sx={{ flexGrow: 1 }}
      >
        {filteredData.map((image) => (
          <Grid xs={2} sm={4} md={4} key={image.id}>
            <Card sx={{ maxWidth: 345, m: 2 }}>
              {loading ? (
                <Skeleton
                  sx={{ height: 190 }}
                  animation="wave"
                  variant="rectangular"
                />
              ) : (
                <CardMedia
                  component="img"
                  sx={{height: 100, width: 100, margin: "auto" }}
                  style={{  }}
                  key={image.name}
                  image={CDNURL + image.image_name}
                  alt={image.image_name}
                  onClick={() => handleImageClick(image.id)}
                />
              )}

              <CardContentNoPadding>
                {loading ? (
                  <>
                    <Skeleton
                      animation="wave"
                      height={10}
                      style={{ marginBottom: 3 }}
                    />
                    <Skeleton animation="wave" height={10} width="80%" />
                  </>
                ) : (
                  <div className="p-3 pb-1">
                    <button
                      type="button"
                      className="ocus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-20 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                      // onClick={() => deleteImage(file.name)}
                      onClick={() => handleDelete(image.image_name, image.id)}
                    >
                      ลบ
                    </button>
                    <br />
                    <button
                      type="button"
                      className="ocus:outline-none text-black bg-yellow-300 hover:bg-yellow-500 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-md px-20 py-2.5 mr-2 mb-2 dark:bg-yellow-300 dark:hover:bg-yellow-400 dark:focus:ring-red-900"
                      // onClick={() => deleteImage(file.name)}
                      onClick={() => handleUpdateImage(image, image.id, image.image_url)}
                    >
                       อัพเดท
                    </button>
                  </div>
                )}
              </CardContentNoPadding>
            </Card>
          </Grid>
        ))}
      </Grid>

      <div>
      {/* Your UI and data display here */}
      <DeleteConfirmationDialog
        open={open}
        onClose={handleDialogClose}
        onDelete={handleConfirmDelete}
        data={dataToDelete} // Pass the image data to the dialog for display
      />
      {/* Show loading spinner or alert for failed deletion based on 'uploading' and 'showAlertFail' state */}
    </div>
      
{/* 
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Delete Image</DialogTitle>
        <DialogContent>คุณต้องการจะลบรูป: {delSelectedFile?.image_name}?</DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDelete()} color="secondary">
            Delete
          </Button>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog> */}


<Dialog open={uploading} onClose={uploading === false}>
        <DialogTitle>กำลังโหลดรูปภาพ...</DialogTitle>
        <DialogContent>
          <LinearProgress />
        </DialogContent>
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
        <Alert severity="error">
          <AlertTitle>เกิดข้อผิดพลาด</AlertTitle>
          แย่จัง!! เกิดข้อผิดพลาดในการอัพโหลดไฟล์ 🙏🏻 —{" "}
          <strong>กรุณาตรวจสอบ ID !</strong>
        </Alert>
      </Snackbar>
     
    </div>
  );
};

export default UploadImages;
