import { useNotFound } from "../store/useNotFound";
function NotFound() {
  const { setNotFound } = useNotFound();
  return (
    <div className="absolute bg-black/10 backdrop-blur-lg py-4 px-8 text-center">
      <h2 className="lg:text-md font-semibold">City Not Found &#9925;</h2>
      <p className="text-[14px] py-2">Try Again With a Valid City Name</p>
      <button
        className="bg-white my-4 w-52 p-1 font-medium hover:bg-white/85"
        onClick={() => setNotFound(false)}
      >
        Ok
      </button>
    </div>
  );
}
export default NotFound;
