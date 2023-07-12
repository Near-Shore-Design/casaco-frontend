import logo from "assets/images/logo.png";
import { socialLinks } from "utilities/data/socialLinks";

const Footer = () => {
  return (
    <div className=" bg-charcoal mt-10">
      <div className=" md:flex items-start text-white justify-between py-4 lg:py-10 px-4 lg:px-10">
        <div className="flex items-baseline gap-4 mb-5">
          <a href="#" className="flex">
            <img src={logo} alt="" className="w-[150px]" />
          </a>
          <p className="text-sm lg:text-base py-4">
            Colombia's Favorite Housing App
          </p>
        </div>
        <div className=" flex flex-wrap justify-evenly gap-3 lg:gap-24 text-sm lg:text-base">
          <div className="flex flex-col items-start gap-5">
            <h2 className="font-bold text-base">Product</h2>
            <p className="cursor-pointer text-sm hover:border-b border-violet-blue pb-2">
              Pricing
            </p>
            <p className="cursor-pointer text-sm hover:border-b border-violet-blue pb-2">
              FAQ
            </p>
          </div>

          <div className="flex flex-col items-start gap-5">
            <h2 className="font-bold text-base">Company</h2>
            <p className="cursor-pointer text-sm hover:border-b border-violet-blue pb-2">
              About Us
            </p>
            <p className="cursor-pointer text-sm hover:border-b border-violet-blue pb-2">
              Contact
            </p>
            <p className="cursor-pointer text-sm hover:border-b border-violet-blue pb-2">
              Blog
            </p>
          </div>

          <div className="flex flex-col items-start gap-5">
            <h2 className="font-bold text-base">Social</h2>
            <div className="flex flex-col lg:flex-row gap-5">
              {socialLinks?.map(({ icon, to }, idx) => (
                <a key={idx} href={to}>
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <p className="text-center text-sm lg:text-base py-2 text-white">
        ©Copyright All right reserved.
      </p>
    </div>
  );
};

export default Footer;
