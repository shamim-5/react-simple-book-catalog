/* eslint-disable @typescript-eslint/no-explicit-any */
import { WarningOutlined } from "@ant-design/icons";

interface IErrorUiProps{
   message: any;
}
const Error: React.FC<IErrorUiProps> = ({ message }) => {
  return (
    <div className="flex items-center">
      <div className="relative text-red-heavy max-w-xl px-4 py-2 text-red-800 rounded shadow w-full ">
        <div className="flex items-center justify-start space-x-2">
          <WarningOutlined />
          <span>Error: {message}</span>
        </div>
      </div>
    </div>
  );
};

export default Error;
