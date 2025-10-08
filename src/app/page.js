import Hero from "@/Component/Jewelry/Hero";
import LikeProd from "@/Component/Jewelry/Like";
import Product2 from "@/Component/Jewelry/OurProduct2";
import OurProductTitle from "@/Component/Jewelry/OurProductTitle";
import Shop from "@/Component/Jewelry/Shop";
import Image from "next/image";

export default function Home() {
  return (
    <>
    <div className="xl:hidden bg-black  text-white text-2xl text-center flex justify-center items-center h-screen">
      This webpage is only run on big screens more than 1024px
    </div>
   <div className='bg-black hidden xl:block'>
   
         <Hero/>
         <OurProductTitle/>
         {/* <Product/> */}
         <Product2/>
         <Shop/>
         <LikeProd/>
     
       </div>
       </>
  );
}
