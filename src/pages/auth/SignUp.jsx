import { Link, useNavigate } from "react-router";
import FilledBtn from "../../components/buttons/FilledBtn";
import InputBox from "../../components/inputs/InputBox";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import SocialLogin from "./SocialLogin";
import { ImSpinner9 } from "react-icons/im";
import useAuth from "../../hooks/useAuth";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import urlRecucer from "../../utils/urlReducer";
import uploadImg from "../../utils/uploadImg";
import { Helmet } from "react-helmet-async";
import BrandLogo1 from "../../components/BrandLogo1";

function SignUp() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isVisible, setIsVisible] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const { signUpWithEmailAndPassword } = useAuth();
  const [firebaseErr, setFirebaseErr] = useState("");
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const inputRef = useRef();
  const [selectedImg, setSelectedImg] = useState("Select An Image");

  const signUpSubmitHandler = async (userCredetial) => {
    const { password, conPass, email, fullName } = userCredetial;
    if (!password) return;
    if (password !== conPass) return setErr("Confirm password and try again!");
    setLoading(true);
    setFirebaseErr("");
    try {
      const res = await signUpWithEmailAndPassword(email, password);
      await updateProfile(res.user, { displayName: fullName, photoURL: "" });
      const img = inputRef.current.files[0];
      const upladedImage = await uploadImg(img);
      const user = {
        email: email,
        fullName: fullName,
        profilePhoto: upladedImage.url,
      };

      await axiosSecure.post("/api/users", user);
      reset();
      navigate("/");
      toast.success("SignUp Successfull!");
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          setFirebaseErr("The email address is already in use!");
          break;
        case "auth/invalid-credential":
          setFirebaseErr("The credetial is invalid.");
          break;
        case "auth/weak-password":
          setFirebaseErr("The password is too weak.");
          break;
        default:
          setFirebaseErr("An error occurred: " + error.message);
      }
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
    <div className="w-[450px]">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Nexus | Signin</title>
      </Helmet>
      <div className=" border sm:border-black dark:border-whiteGray/40 border-black/30 px-8 py-16 my-7">
        <div className="flex justify-center flex-col items-center mb-4">
          <BrandLogo1 />
          <h2 className="mt-2 text-3xl text-myGreen">Create an Account</h2>
        </div>
        {/* social login */}
        <SocialLogin label={"up"} />
        <div className="divider before:bg-whiteGray/20 after:bg-whiteGray/20 dark:text-whiteGray">
          OR
        </div>
        {/* email and pass login */}
        <form
          onSubmit={handleSubmit(signUpSubmitHandler)}
          className="flex flex-col gap-3"
        >
          <InputBox
            label={"FullName"}
            name={"name"}
            type={"text"}
            id={"name"}
            required={true}
            register={{ ...register("fullName") }}
          />
          <InputBox
            label={"Email"}
            name={"email"}
            required={true}
            type={"email"}
            id={"email"}
            register={{ ...register("email") }}
          >
            {" "}
            <p className="text-sm text-error mt-1">{firebaseErr} </p>
            <div
              className={`mt-4 flex items-center gap-3  py-3 text-xl px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner `}
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
                className="flex  items-center gap-2 bg-myGreen rounded-sm px-4 py-2 text-white  text-lg"
                onClick={handleUploadThumbnail}
              >
                Upload Photo
              </button>
              <p className="text-lg dark:text-whiteGray"> {selectedImg}</p>
            </div>
          </InputBox>
          <InputBox
            label={"Password"}
            name={"password"}
            type={isVisible ? "text " : "password"}
            id={"password"}
            register={{
              ...register("password", {
                pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%])(?=.*[0-9])/,
                require: true,
                minLength: 6,
              }),
            }}
          >
            <div className="mt-1 text-error text-sm">
              <p>
                {errors?.password?.type === "minLength" &&
                  "Password must be 6 or more charecter"}{" "}
              </p>
              <p>
                {errors?.password?.type === "require" &&
                  "You have must fillup this field!"}{" "}
              </p>
              <p>
                {errors?.password?.type === "pattern" &&
                  "The password must required at least one uppercase, one lowercase, one disit and a special charecter!"}{" "}
              </p>
            </div>
            <div
              className="text-lg absolute top-8 right-3 cursor-pointer select-none"
              onClick={() => setIsVisible((prev) => !prev)}
            >
              {isVisible ? (
                <span className="text-myGreen">Hide</span>
              ) : (
                <span className="text-yellow-600 dark:text-whiteGray">
                  Show
                </span>
              )}
            </div>
          </InputBox>

          <InputBox
            label={"Confirm Password"}
            name={"confirm password"}
            type={"password"}
            id={"conPass"}
            register={{ ...register("conPass") }}
          />
          <p className="-mt-2 text-error text-sm">{err} </p>
          {/* set up reChaptcha */}
          <div></div>
          <FilledBtn className="flex justify-center items-center bg-myGreen text-white py-1.5 mt-2 hover:bg-myGreen/80 active:bg-myGreen uppercase rounded-none">
            {loading ? (
              <span>
                <ImSpinner9 className="animate-spin duration-100 text-xl " />
              </span>
            ) : (
              "Resister"
            )}
          </FilledBtn>
        </form>
        <div className="flex gap-2 mt-3 justify-center dark:text-whiteGray">
          <p>Already have an account?</p>{" "}
          <Link to={"/auth/login"}>
            <span className="text-myGreen underline">Login</span>
          </Link>
        </div>
      </div>
      <p className="px-10 text-center -mt-4 text-sm dark:text-whiteGray">
        {" "}
        By proceeding, you agree to Terms of Use and Privacy Policy of{" "}
        <span className="font-bold text-myGreen">Nexus</span>
      </p>
    </div>
  );
}

export default SignUp;
