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
import uploadImg from "../../../../utils/uploadImg";
import urlRecucer from "../../../../utils/urlReducer";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { ImSpinner9 } from "react-icons/im";
import useUserInfo from "../../../../hooks/useUserInfo";
import { useNotifications } from "reapop";
import { useQuery } from "@tanstack/react-query";

const animatedComponents = makeAnimated();

function AddArticle() {
  const axiosSecure = useAxiosSecure();
  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/publisher`);
      return data;
    },
  });
  const { register, reset, handleSubmit } = useForm();
  const inputRef = useRef();
  const [tags, setTags] = useState([Tags[1]]);
  const [publisher, setPublisher] = useState(publishers[2]);
  const [selectedImg, setSelectedImg] = useState("(< click)");

  const [loading, setLoading] = useState(false);
  const { userInfo } = useUserInfo();
  const { notify } = useNotifications();
  const [postError, setPostError] = useState("");

  const submitPostHandler = async (postData) => {
    // Todo: get all data from 'form'
    // todo: set up img for upload cloudinay
    // todo: make object and put all data on it (like: title, desc, image, tags, userCredentials, etc)
    // todo: test it
    // then -> set up backend for it
    setLoading(true);
    try {
      let img = inputRef.current.files[0];
      const upladedImage = await uploadImg(img);

      let uploadPost = {
        title: postData.title,
        description: postData.description,
        thumbnail: upladedImage.url,
        tags: tags.map((tag) => tag.label),
        publisher: publisher.label,
        creationTime: Date.now(),
        authorInfo: {
          userId: userInfo?._id,
        },
      };

      await axiosSecure.post(`/api/articles`, uploadPost);

      notify(
        "You article has be requested! you will be notify when admin accept your request.",
        "info"
      );
      setSelectedImg("(< click)");
      uploadPost = {};
      img = "";
      reset();
    } catch (err) {
      console.log(err);
      setPostError(err?.response?.data?.message);
    } finally {
      setLoading(false);
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
          <p className="my-2 text-lg text-error">{postError}</p>
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
                "Publish"
              )}
            </FilledBtn>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddArticle;
