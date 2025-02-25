import Input from "../../../components/inputs/Input";
import FilledBtn from "../../../components/buttons/FilledBtn";
import { FaFileUpload } from "react-icons/fa";
import Heading from "../../../components/Heading";
import { useRef, useState } from "react";
import uploadImg from "../../../utils/uploadImg";
import { ImSpinner9 } from "react-icons/im";
import urlRecucer from "../../../utils/urlReducer";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useNotifications } from "reapop";
import { Helmet } from "react-helmet-async";

function AddPublisher() {
  const [publisherName, setPublisherName] = useState("");
  const inputRef = useRef();
  const [selectedImg, setSelectedImg] = useState("(< click)");
  const [loading, setLoading] = useState(false);
  const axiosSecure = useAxiosSecure();
  const { notify } = useNotifications();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const img = inputRef.current.files[0];
    try {
      const upladedImage = await uploadImg(img);

      const publisherInfo = {
        value: publisherName.toLocaleLowerCase().split(" ").join("_"),
        label: publisherName,
        logo: upladedImage.url,
      };

      const { data } = await axiosSecure.post(
        `/api/publisher/create`,
        publisherInfo
      );
      if (data.insertedId) {
        notify("Publisher Added Successfully.", "success");
        setSelectedImg("(< click)");
        setPublisherName("");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleUploadThumbnail = () => {
    inputRef.current.click();
  };

  const handleChange = () => {
    const img = inputRef.current.files[0];
    if (!img) return;
    setSelectedImg(urlRecucer(img.name));
  };

  return (
    <div className="max-w-[700px] mx-auto  p-8 border-2  border-myGreen ">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | Add pulisher</title>
      </Helmet>
      <Heading title="Add Publisher" />
      <form onSubmit={handleSubmit} className="space-y-3  mt-6">
        {/* title */}

        <input
          className={`md:h-16 h-12  text-2xl px-4 block   py-1 rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
          placeholder="Publisher Name..."
          required={true}
          value={publisherName}
          onChange={(e) => setPublisherName(e.target.value)}
        />
        <div
          className={`flex items-center gap-3  py-2 text-xl px-4   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
        >
          {/* hide it */}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={inputRef}
            onChange={handleChange}
          />
          <button
            type={"button"}
            className="flex  items-center gap-2 bg-myGreen rounded-sm px-5 py-3 text-white"
            onClick={handleUploadThumbnail}
          >
            Upload Logo <FaFileUpload className="text-3xl" />
          </button>
          {selectedImg}
        </div>

        <div>
          <FilledBtn
            className={`bg-myGreen cursor-pointer hover:bg-myGreen/90 active:bg-myGreen/80 transition-all duration-200  text-white  py-2  flex justify-center text-[22px] px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30   `}
            type={"submit"}
          >
            {loading ? (
              <span>
                <ImSpinner9 className="animate-spin duration-100 text-2xl " />
              </span>
            ) : (
              "Add"
            )}
          </FilledBtn>
        </div>
      </form>
    </div>
  );
}

export default AddPublisher;
