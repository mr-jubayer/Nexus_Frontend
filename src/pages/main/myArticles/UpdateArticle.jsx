import { useForm } from "react-hook-form";
import { FaFileUpload } from "react-icons/fa";
import { useRef, useState, useEffect } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import CreatableSelect from "react-select/creatable";
import { ImSpinner9 } from "react-icons/im";
import { useNotifications } from "reapop";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Tags } from "../home/addArticle/tags";
import uploadImg from "../../../utils/uploadImg";
import urlReducer from "../../../utils/urlReducer";
import FilledBtn from "../../../components/buttons/FilledBtn";
import Heading from "../../../components/Heading";
import useUserInfo from "../../../hooks/useUserInfo";
import Spinner1 from "../../../components/spinners/Spinner1";
import { useNavigate, useParams } from "react-router";

const animatedComponents = makeAnimated();

function UpdateArticle() {
  const axiosSecure = useAxiosSecure();
  const param = useParams();

  const { data: publishers = [] } = useQuery({
    queryKey: ["publishers"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/api/publisher`);
      return data;
    },
  });

  const { data: article, isLoading } = useQuery({
    queryKey: ["updateArticle", param.id],
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/api/articles/article/${param.id}`
      );
      return data;
    },
  });

  const { register, reset, handleSubmit } = useForm();
  const inputRef = useRef();
  const [tags, setTags] = useState([]);
  const [publisher, setPublisher] = useState(null);
  const [selectedImg, setSelectedImg] = useState("(< click)");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { notify } = useNotifications();

  // Initialize form values when article data is available
  useEffect(() => {
    if (article) {
      const defaultPublisher = {
        label: article.publisher,
        value: article.publisher,
      };
      const defaultTags = article?.tags.map((tag) => ({
        label: tag,
        value: tag,
      }));

      setPublisher(defaultPublisher);
      setTags(defaultTags);
      setSelectedImg(
        article.thumbnail ? urlReducer(article.thumbnail) : "(< click)"
      );
      reset({
        title: article.title,
        description: article.description,
      });
    }
  }, [article, reset]);

  const submitPostHandler = async (postData) => {
    setLoading(true);
    try {
      const img = inputRef.current?.files[0];
      const uploadedImage = img
        ? await uploadImg(img)
        : { url: article.thumbnail };

      const updatedPost = {
        title: postData.title,
        description: postData.description,
        thumbnail: uploadedImage.url,
        tags: tags.map((tag) => tag.value),
        publisher: publisher.label,
      };

      await axiosSecure.patch(
        `/api/articles/user/update/${param.id}`,
        updatedPost
      );
      navigate(-1);

      notify("Article updated successfully.", "success");
    } catch (error) {
      console.error("Failed to update article", error);
    } finally {
      setLoading(false);
    }
  };

  const changeHandler = () => {
    const img = inputRef.current?.files[0];
    setSelectedImg(img ? urlReducer(img.name) : "(< click)");
  };

  const handleUploadThumbnail = () => {
    inputRef.current?.click();
  };
  console.log(article);

  if (isLoading) return <Spinner1 />;

  return (
    <div className="my-10">
      <Heading title="Update Article" />
      <div className="mt-12 mx-auto max-w-[800px]">
        <form onSubmit={handleSubmit(submitPostHandler)} className="space-y-3">
          <input
            className="md:h-20 h-16 text-3xl px-6 py-1 rounded-none w-full focus:outline-none ring-1 ring-black/30 focus:ring-myGreen focus:shadow-inner"
            placeholder="Title"
            {...register("title")}
            required
          />
          <textarea
            rows={5}
            role="description"
            {...register("description")}
            required
            className="overflow-y-auto py-6 text-xl px-6 rounded-none w-full focus:outline-none ring-1 ring-black/30 focus:ring-myGreen focus:shadow-inner"
            placeholder="Description..."
          ></textarea>
          <div className="flex items-center gap-3 py-3 text-xl px-6 rounded-none w-full focus:outline-none ring-1 ring-black/30 focus:ring-myGreen focus:shadow-inner">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              ref={inputRef}
              onChange={changeHandler}
            />
            <button
              type="button"
              className="flex items-center gap-2 bg-myGreen rounded-sm px-5 py-3 text-white"
              onClick={handleUploadThumbnail}
            >
              Upload Thumbnail <FaFileUpload className="text-3xl" />
            </button>
            {selectedImg}
          </div>
          <div>
            <div className="space-y-3 gap-3 py-4 text-xl px-6 rounded-none w-full focus:outline-none ring-1 ring-black/30 focus:ring-myGreen focus:shadow-inner">
              <Select
                closeMenuOnSelect={false}
                components={animatedComponents}
                value={tags}
                isMulti
                options={Tags}
                placeholder="Select Tags #"
                className="cursor-text w-full focus:outline-none ring-1 ring-black/30 focus:ring-myGreen focus:shadow-inner"
                onChange={(v) => setTags(v)}
              />
              <CreatableSelect
                placeholder="Publisher"
                isClearable
                options={publishers.map((pub) => ({
                  label: pub.name,
                  value: pub.name,
                }))}
                className="h-full cursor-text w-full focus:outline-none ring-1 ring-black/30 focus:ring-myGreen focus:shadow-inner"
                value={publisher}
                onChange={(v) => setPublisher(v)}
              />
            </div>
          </div>
          <FilledBtn
            className="bg-myGreen cursor-pointer hover:bg-myGreen/90 active:bg-myGreen/80 transition-all duration-200 text-white py-2 flex justify-center text-[22px] px-6 rounded-none w-full focus:outline-none ring-1 ring-black/30"
            type="submit"
          >
            {loading ? (
              <ImSpinner9 className="animate-spin duration-100 text-2xl" />
            ) : (
              "Update"
            )}
          </FilledBtn>
        </form>
      </div>
    </div>
  );
}

export default UpdateArticle;
