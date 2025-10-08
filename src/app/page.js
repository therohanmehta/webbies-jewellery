import Hero from "@/Component/Jewelry/Hero";
import LikeProd from "@/Component/Jewelry/Like";
import Product2 from "@/Component/Jewelry/OurProduct2";
import OurProductTitle from "@/Component/Jewelry/OurProductTitle";
import Shop from "@/Component/Jewelry/Shop";
import Image from "next/image";

export default function Home() {
  return (
   <div className='bg-black'>
   
         <Hero/>
         <OurProductTitle/>
         {/* <Product/> */}
         <Product2/>
         <Shop/>
         <LikeProd/>
     
       </div>
  );
}
