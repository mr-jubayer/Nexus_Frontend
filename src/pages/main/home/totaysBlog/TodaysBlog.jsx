function TodaysBlog() {
  return (
    <div className="grid md:grid-cols-2 gap-5 items-center mb-14">
      <div>
        <h2 className="dark:text-darkHeading text-3xl font-medium md:w-4/6 mb-2">
          Access News Anytime, Anywhere!
        </h2>
        <p className="dark:text-whiteGray ">
          Never miss a story! With our mobile-friendly platform, you can explore
          the latest news, articles, and updates right from your phone. Whether
          you're commuting, traveling, or relaxing at home, stay informed with
          just a tap. Enjoy a seamless reading experience tailored for your
          device, ensuring you’re always connected to what matters most.
          Download our app or visit our website today and take your news with
          you wherever you go!
        </p>
      </div>
      <div className="flex justify-center items-center">
        <img
          src="https://i.ibb.co.com/Y7wX84Q9/unnamed.webp"
          alt=""
          className="md:h-[400px]  "
        />
      </div>
    </div>
  );
}

export default TodaysBlog;
