import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../../hooks/useAxiosPublic";
import FilledBtn from "../../../../components/buttons/FilledBtn";
import { Link } from "react-router";

function AncentSecretBorneo() {
  const axiosPublic = useAxiosPublic();
  const { data } = useQuery({
    queryKey: ["articleOfAncient"],
    queryFn: async () => {
      const { data } = await axiosPublic.get(
        `/api/articles/ancient-secret-borneo/67bda87bb9a0c11c41072949`
      );
      return data;
    },
  });

  return (
    <div className="grid md:grid-cols-2 gap-5  items-center">
      <div className="p-2 border-myGreen  border-2">
        <img src={data.thumbnail} alt="" />
      </div>
      <div>
        <h3 className="text-xl dark:text-whiteGray">Endless Experience</h3>
        <h2 className="text-3xl dark:text-darkHeading "> {data.title} </h2>
        <Link to={`all-articles/details/67bda87bb9a0c11c41072949`}>
          {" "}
          <FilledBtn className="bg-myGreen mt-5  text-white">
            Start here
          </FilledBtn>
        </Link>
      </div>
    </div>
  );
}

export default AncentSecretBorneo;
