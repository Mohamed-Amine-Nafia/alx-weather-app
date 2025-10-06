import { HashLoader } from "react-spinners";
function Loading() {
  return (
    <div className="w-fit h-fit absolute top-1/2 left-1/2 z-50 -translate-y-1/2 -translate-x-1/2">
      <HashLoader color="#ff6d00" size={60} speedMultiplier={1} />
    </div>
  );
}
export default Loading;
