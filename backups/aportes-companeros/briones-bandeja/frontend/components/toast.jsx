import { CheckCircle } from "lucide-react";

export default function Toast({
  message
}) {
  return (
    <div
      className="
      fixed
      top-5
      right-5
      z-50
      bg-green-600
      text-white
      px-5
      py-4
      rounded-xl
      shadow-xl
      flex
      items-center
      gap-3
      "
    >
      <CheckCircle size={22} />

      <span>
        {message}
      </span>

    </div>
  );
}