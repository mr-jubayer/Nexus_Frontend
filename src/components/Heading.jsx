function Heading({ title = "Title", subTitle = "", className = "" }) {
  return (
    <div className="mx-auto max-w-4xl text-center ">
      <p
        className={`mt-2 text-xl font-semibold tracking-tight text-balance text-gray-900 sm:text-3xl ${className}`}
      >
        {title}
      </p>
      {subTitle && (
        <p className="mx-auto mt-2 max-w-2xl text-center text-base font-medium text-pretty text-gray-600 sm:text-lg">
          {subTitle}
        </p>
      )}
    </div>
  );
}

export default Heading;
