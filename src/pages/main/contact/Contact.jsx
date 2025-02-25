import { useState } from "react";
import FilledBtn from "../../../components/buttons/FilledBtn";
import Heading from "../../../components/Heading";
import Input from "../../../components/inputs/Input";

function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitted(true);
  };
  return (
    <div className="max-w-7xl mx-auto min-h-80 lg:px-20 md:px-10 px-3  my-24">
      {/* input fields */}
      {isSubmitted ? (
        <div className="h-80 flex justify-center items-center text-center md:text-2xl text-xl text-myGreen ">
          Thank Your For Submitting!
        </div>
      ) : (
        <div className="mx-auto max-w-[800px] ">
          <Heading title="Drop Out Your Thought Here! " />
          <form onSubmit={handleSubmit} className="space-y-3 mt-7">
            {/* title */}

            <Input
              className=" py-3 text-3xl px-6"
              name="FullName"
              required={true}
            />
            <textarea
              rows={5}
              role="Enter your thoughts"
              required={true}
              className={`overflow-y-auto  py-6 text-xl px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30  focus:ring-myGreen focus:shadow-inner  dark:bg-black2 dark:text-white`}
              placeholder="Enter your thoughts..."
            ></textarea>
            <FilledBtn
              className={`bg-myGreen cursor-pointer hover:bg-myGreen/90 active:bg-myGreen/80 transition-all duration-200  text-white  py-2  flex justify-center text-[22px] px-6   rounded-none w-full focus:outline-none ring-1 ring-black/30   `}
              type={"submit"}
            >
              Send
            </FilledBtn>
          </form>
        </div>
      )}
    </div>
  );
}

export default Contact;
