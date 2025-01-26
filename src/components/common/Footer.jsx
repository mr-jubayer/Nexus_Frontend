import FilledBtn from "../buttons/FilledBtn";
import Input from "../inputs/Input";

function Footer() {
  return (
    <footer className="bg-[#0F0F11] py-8 text-gray-100">
      <div className="max-w-6xl  mx-auto px-4">
        {/* Upper Footer */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h5 className="text-lg font-semibold mb-4  border-b-4 border-myGreen pb-2 ">
              Trending News
            </h5>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 flex-shrink-0"></div>
                <div>
                  <h6 className="text-md font-medium ">
                    Frequent TV Series Cancellations Altering Viewer Behavior
                  </h6>
                  <p className="text-xs text-gray-400">
                    Sep 13, 2020 - 9,683 Views
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 flex-shrink-0"></div>
                <div>
                  <h6 className="text-md font-medium ">
                    The Top Three Scandinavian Home Décor Trends This Winter
                  </h6>
                  <p className="text-xs text-gray-400">
                    Sep 12, 2020 - 9,229 Views
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 flex-shrink-0"></div>
                <div>
                  <h6 className="text-md font-medium ">
                    Does Drinking Coffee Help Stave Off Diabetes?
                  </h6>
                  <p className="text-xs text-gray-400">
                    Sep 11, 2020 - 8,949 Views
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Section */}
          <div>
            <h5 className="text-lg font-semibold mb-4  border-b-4 border-myGreen pb-2 ">
              Top Publishers
            </h5>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 flex-shrink-0"></div>
                <div>
                  <h6 className="text-md font-medium ">Vision Media</h6>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-300 flex-shrink-0"></div>
                <div>
                  <h6 className="text-md font-medium ">Prime News Network</h6>
                </div>
              </div>
            </div>
          </div>
          {/* Newsletter Section */}
          <div className="col-span-1 bg-black shadow-xl px-3 py-6 rounded-md">
            <h5 className="text-lg font-semibold mb-4 ">
              Subscribe to Updates
            </h5>
            <p className="text-sm  mb-4 text-gray-300">
              Get the latest creative news from FooBar about art, design, and
              business.
            </p>
            <form className="space-y-4">
              <Input
                type="email"
                className="w-full p-2 bg-gray-500/30 border-gray-700 border-2 rounded-md "
                name="Your email address.."
              />
              <FilledBtn
                type="submit"
                className="w-full bg-myGreen text-white rounded hover:bg-myGreen/90 focus:outline-none focus:ring-2 focus:ring-myGreen/95"
              >
                Subscribe
              </FilledBtn>
              <div className="text-xs  text-gray-300">
                <input type="checkbox" required className="mr-2  bg-gray-500" />
                By signing up, you agree to our{" "}
                <span className="text-blue-500 underline">Privacy Policy</span>.
              </div>
            </form>
          </div>
        </div>

        {/* Lower Footer */}
        <div className="border-t border-gray-300/55   pt-4">
          <div className="flex flex-col md:flex-row justify-center items-center">
            <p className="text-sm ">
              © 2025 <span className="font-bold">Nexus</span>. All Rights
              Reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
