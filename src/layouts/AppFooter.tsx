import { Footer } from "antd/es/layout/layout";
import { RiFacebookBoxLine, RiInstagramLine } from "react-icons/ri";

const AppFooter = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <>
      <Footer style={{ textAlign: "center" }}>
        <div className="bg-[#eee8e8] text-secondary p-20">
          <div className="flex justify-between">
            <div>
              <img
                className="h-16"
                src="https://img.icons8.com/external-flaticons-lineal-color-flat-icons/128/external-library-edutainment-flaticons-lineal-color-flat-icons.png"
                alt="FooterLogo"
              />
            </div>
            <div className="flex gap-20">
              <ul className="space-y-2">
                <li>Upcoming</li>
                <li>Shipping</li>
                <li>How it works</li>
              </ul>
              <ul className="space-y-2">
                <li>Support</li>
                <li>Careers</li>
              </ul>
              <ul className="space-y-2">
                <li>List your gear</li>
                <li>Contact team</li>
              </ul>
            </div>
            <div className="flex gap-2 text-2xl">
              <RiFacebookBoxLine />
              <RiInstagramLine />
            </div>
          </div>
          <div className="flex w-full mt-20 gap-5">
            <p>Privacy Policy</p>
            <p>Terms & Condition</p>
            <p className="ml-auto"> &#169; Book-Catalog {year}</p>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default AppFooter;
