function Heading({ title = "Title", subTitle = "", className = "" }) {
  return (
    <div className="mx-auto max-w-4xl text-center">
      <p
        className={`mt-2 text-3xl font-semibold tracking-tight text-balance text-gray-900 sm:text-4xl ${className}`}
      >
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-center text-lg font-medium text-pretty text-gray-600 sm:text-xl/8">
        {subTitle}
      </p>
    </div>
  );
}

export default Heading;
