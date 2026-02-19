import Image from "next/image";

const Footer = () => {
  return (
    <div className="bg-foreground/95 relative pt-[80px] pb-[9px]">
      <div className="absolute opacity-5 top-0 left-0 right-0 bottom-0 bg-[url('/assets/images/footer-bg.svg')] bg-cover bg-center"></div>
      <div className="containers mx-auto">
        <div className="flex justify-between pb-[40px] font-serif leading-[25px]">
          <div className="logo w-2/12">
            <Image
              src="/assets/images/footer-logo.svg"
              alt="Logo"
              width={100}
              height={100}
            />
          </div>
          <div className="w-2/12 text-white">
            <p className="mb-[25px] text-white! text-[20px]"> Links</p>
            <ul className="flex flex-col gap-[20px]">
              <li className="text-[14px]">
                <a href="">Our Profile</a>
              </li>
              <li className="text-[14px]">
                <a href="">CSR</a>
              </li>
              <li className="text-[14px]">
                <a href="">Leadership</a>
              </li>
              <li className="text-[14px]">
                <a href="">Awards</a>
              </li>
              <li className="text-[14px]">
                <a href="">Partners</a>
              </li>
            </ul>
          </div>
          <div className="w-2/12 text-white">
            <p className="mb-[25px] text-white! text-[20px]">Featured</p>
            <ul className="flex flex-col gap-[20px]">
              <li className="text-[14px]">
                <a href="">Media Center</a>
              </li>
              <li className="text-[14px]">
                <a href="">Testimonial</a>
              </li>
              <li className="text-[14px]">
                <a href="">Gallery</a>
              </li>
            </ul>
          </div>
          <div className="w-2/12 text-white">
            <p className="mb-[25px] text-white! text-[20px]">Our Project</p>
            <ul className="flex flex-col gap-[20px]">
              <li className="text-[14px]">
                <a href="">Residential</a>
              </li>
              <li className="text-[14px]">
                <a href="">Commercial</a>
              </li>
              <li className="text-[14px]">
                <a href="">Educational</a>
              </li>
              <li className="text-[14px]">
                <a href="">Healthcare</a>
              </li>
            </ul>
          </div>
          <div className="w-2/12 text-white">
            <p className="mb-[25px] text-white! text-[20px]">Media Center</p>
            <ul className="flex flex-col gap-[20px]">
              <li className="text-[14px]">
                <a href="">News</a>
              </li>
              <li className="text-[14px]">
                <a href="">Blogs</a>
              </li>
              <li className="text-[14px]">
                <a href="">Press Releases</a>
              </li>
              <li className="text-[14px]">
                <a href="">FAQ&apos;s</a>
              </li>
            </ul>
          </div>
          <div className="w-2/12 text-white">
            <p className="mb-[25px] text-white! text-[20px]">Policies</p>
            <ul className="flex flex-col gap-[20px]">
              <li className="text-[14px]">
                <a href="">Disclaimer</a>
              </li>
              <li className="text-[14px]">
                <a href="">Privacy Policy</a>
              </li>
              <li className="text-[14px]">
                <a href="">Terms & Conditions</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex justify-between pb-[15px] border-b border-b-white/50 leading-[25px] font-serif">
          <div className="address flex flex-col gap-[16px] text-center w-4/12">
            <p className="text-[20px] text-white!">Address</p>
            <p className="text-[16px] text-white!">Delhi, India</p>
          </div>
          <div className="contact flex flex-col gap-[16px] text-center w-4/12">
            <p className="text-[20px] text-white!">Contact</p>
            <p className="text-[16px] text-white!">
              +1 234 567 890 — John smith{" "}
            </p>
          </div>
          <div className="socail flex flex-col gap-[16px] text-center w-4/12">
            <p className="text-[20px] text-white!">Social Media</p>
            <div className="text-[16px] flex justify-between items-center">
              <p className="mb-0 text-white!">Instagram</p>
              <p className="mb-0 text-white!">Facebook</p>
              <p className="mb-0 text-white!">Youtube</p>
              <p className="mb-0 text-white!">Linkedin</p>
            </div>
          </div>
        </div>
        <p className="text-[14px] text-white! leading-[25px] font-serif pt-[9px]">©2026 All rights reserved by gtf technologies</p>
      </div>
    </div>
  );
};

export default Footer;
