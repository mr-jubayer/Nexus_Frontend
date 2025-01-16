import { useForm } from "react-hook-form";
import Heading from "../../../../components/Heading";
import Input from "../../../../components/inputs/Input";
import { FaFileUpload } from "react-icons/fa";
import { useRef, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import { Tags } from "./tags";
import { publishers } from "./publishers";
import uploadImg from "../../../../utils/uploadImg";
import toast from "react-hot-toast";
import urlRecucer from "../../../../utils/urlReducer";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const animatedComponents = makeAnimated();

function AddArticle() {
  const { register, reset, handleSubmit } = useForm();
  const inputRef = useRef();
  const [tags, setTags] = useState([Tags[1]]);
  const [publisher, setPublisher] = useState(publishers[2]);
  const [selectedImg, setSelectedImg] = useState("(Optinal)");
  const axiosSecure = useAxiosSecure();

  const submitPostHandler = async (postData) => {
    // Todo: get all data from 'form'
    // todo: set up img for upload cloudinay
    // todo: make object and put all data on it (like: title, desc, image, tags, userCredentials, etc)
    // todo: test it
    // then -> set up backend for it

    try {
      const img = inputRef.current.files[0];
      const upladedImage = await uploadImg(img);

      const uploadPost = {
        title: postData.title,
        description: postData.description,
        thumbnail: upladedImage.url,
        tags: tags,
        publisher: publisher,
        creationTime: Date.now(),
        authorInfo: {
          name: "",
          profileProto: "",
        },
      };
      console.log(uploadPost);
      await axiosSecure.post(`/api/articles`, uploadPost);
      toast.success("article uploaded!");
    } catch (error) {
      console.log(error);
    }
  };

  const changeHandler = () => {
    const img = inputRef.current.files[0];
    // reducing the url - first check if its small ok if long slice it
    setSelectedImg(urlRecucer(img?.name));
  };

  const handleUploadThumbnail = () => {
    inputRef.current.click();
  };
  return (
    <div className="my-10">
      <Heading title="Create an Article" />
      {/* input fields */}
      <div className="mt-12 mx-auto max-w-[800px] ">
        <form onSubmit={handleSubmit(submitPostHandler)} className="space-y-3">
          {/* title */}
          <Input
            className="md:h-20 h-16 text-3xl px-6"
            name="Title"
            register={{ ...register("title") }}
            required={true}
          />
          {/* description */}
          <textarea
            rows={5}
            role="description"
            {...register("description")}
            required={true}
            className={`overflow-y-auto  py-6 text-xl px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
            placeholder="Description..."
          ></textarea>
          {/* image file uploader */}
          <div
            className={`flex items-center gap-3  py-3 text-xl px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
          >
            {/* hide it */}
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={changeHandler}
            />
            {/* on click button run input file */}
            <button
              type={"button"}
              className="flex  items-center gap-2 bg-myGreen rounded-sm px-5 py-3 text-white"
              onClick={handleUploadThumbnail}
            >
              Upload Thumbnail <FaFileUpload className="text-3xl" />
            </button>
            {selectedImg}
          </div>
          {/* tags and publishers */}
          <div>
            <div
              className={`space-y-3 gap-3  py-4 text-xl px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
            >
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={tags}
                isMulti
                options={Tags}
                placeholder={"Select Tags # "}
                className={`   cursor-text w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                onChange={(v) => {
                  setTags(v);
                }}
              />
              <CreatableSelect
                placeholder={"Publisher"}
                isClearable
                options={publishers}
                className={` h-full cursor-text w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
                value={publisher}
                onChange={(v) => {
                  setPublisher(v);
                }}
              />
            </div>
          </div>
          <div>
            <FilledBtn
              className={`bg-myGreen cursor-pointer hover:bg-myGreen/90 active:bg-myGreen/80 transition-all duration-200  text-white  py-2  flex justify-center text-[22px] px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30   `}
              type={"submit"}
            >
              Publish
            </FilledBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
