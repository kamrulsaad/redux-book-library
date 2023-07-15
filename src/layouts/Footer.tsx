import { RiFacebookBoxFill, RiInstagramLine } from 'react-icons/ri';
export default function Footer() {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <div className="bg-[#242630] text-secondary py-10 px-20">
      <div className="flex justify-between md:max-w-7xl">
        <div>
          <h1 className='text-white text-3xl font-bold'>BRITANIA</h1>
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
            <li>List your book</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="flex gap-2 text-2xl">
          <RiFacebookBoxFill />
          <RiInstagramLine />
        </div>
      </div>
      <div className="flex w-full mt-20 gap-5 md:max-w-7xl">
        <p>Privacy Policy</p>
        <p>Terms & Condition</p>
        <p className="ml-auto"> &#169; BRITANIA {year}</p>
      </div>
    </div>
  );
}
