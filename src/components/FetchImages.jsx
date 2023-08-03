import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  Card,
} from "@material-tailwind/react";

function FetchImage() {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);

  useEffect(() => {
    let abortController = new AbortController();
    const fetchImage = async () => {
      try {
        const response = await axios.get(
          import.meta.env.VITE_IMAGES_URL_V2 + `${id}`,
          // {
          //   responseType: "arraybuffer",
          //   signal: abortController.signal,
          // }
        );
        // const base64Image = Buffer.from(response.data.image_url, "binary").toString(
        //   "base64"
        // );
        // const dataURL = `data:${response.headers["content-type"]};base64,${base64Image}`;
        const dataURL = response.data[0].image_url;
        setData(dataURL);
        //console.log(data);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
    return () => abortController.abort();
  }, [id]);

  return (
    <div className="flex justify-center">
      {data?.length === 0 ? (
        <div className="justify-items-center">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            🤷🏼‍♂️ ไม่พบรูปภาพของอุปกรณ์!!! 🤷🏼‍♂️
          </h5>
          <div className="flex justify-center">
            <ReactLoading type="spin" color="red" />
          </div>
        </div>
      ) : (
        <div className="flex justify-center">
          <div className="py-5">
            <Card
              className="h-64 w-96 cursor-pointer overflow-hidden transition-opacity hover:opacity-90"
              onClick={handleOpen}
            >
              <img
                alt="nature"
                className="h-full w-full object-cover object-center"
                src={data}
              />
            </Card>
            <Dialog size="xl" open={open} handler={handleOpen}>
              <DialogHeader className="justify-end">
                <div className="flex items-center gap-2">
                  <Button color="green" size="sm" onClick={handleOpen}>
                    Close
                  </Button>
                </div>
              </DialogHeader>
              <DialogBody divider={true} className="p-0">
                <img
                  alt="nature"
                  className="object-cover object-center"
                  src={data}
                />
              </DialogBody>
            </Dialog>
          </div>
        </div>
      )}
    </div>
  );
}

export default FetchImage;
