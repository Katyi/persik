import Image from 'next/image';
import CatPic1 from '@/assets/Layer_1.svg';

const About = () => {
  return (
    <main
      className="
      flex 
      flex-col 
      lg:flex-row 
      items-center 
      lg:items-start 
      lg:justify-center 
      pt-10 
      h-[calc(100vh-84px-446px)]
      gap-[10px] 
      px-4"
    >
      <p className="text-[16px] sm:text-[24px] md:text-[30px] font-[500] lg:pt-16 text-center">
        This app about my lovely cat Persik.
        <br />
        My email: alex.frontender@gmail.com
      </p>
      <Image
        src="/CatPic2.svg"
        alt="cat img"
        width={150}
        height={150}
        className="z-40"
      />
    </main>
  );
};

export default About;
