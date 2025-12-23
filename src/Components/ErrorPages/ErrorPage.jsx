import { useRouteError, useNavigate } from "react-router";

const ErrorPage = () => {
  const error = useRouteError();
  const navigate = useNavigate();

//   console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="max-w-md w-full bg-base-100 shadow-xl rounded-2xl p-6 text-center space-y-4">

        {/* Error Code */}
        <h1 className="text-7xl font-extrabold text-error">
          {error?.status || 404}
        </h1>

        {/* Title */}
        <h2 className="text-2xl font-bold">
          {error?.status === 404
            ? "Page Not Found"
            : "Something Went Wrong"}
        </h2>

        {/* Message */}
        <p className="text-gray-500">
          {error?.statusText ||
            error?.message ||
            "Sorry, an unexpected error has occurred."}
        </p>

        {/* Actions */}
        <div className="flex gap-3 justify-center pt-4">
          <button
            onClick={() => navigate(-1)}
            className="btn btn-outline btn-sm"
          >
            Go Back
          </button>

          <button
            onClick={() => navigate("/")}
            className="btn btn-primary btn-sm"
          >
            Home
          </button>
        </div>

      </div>
    </div>
  );
};

export default ErrorPage;
