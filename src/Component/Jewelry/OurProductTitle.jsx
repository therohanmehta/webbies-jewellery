import React from 'react'

function OurProductTitle() {
  return (
    <div className="relative bg-[#C3C3C3]">
      {/* Main title */}
      <h2 className="font-[TitleJ] text-center text-[#DBDBDB] text-[150px] py-4">
        Our Jewellery
      </h2>

      {/* Overlay small text */}
      <div className="absolute inset-0 font-[SubtitleJ] text-[#525252] flex justify-center items-center">
        <h3 className=" leading-tight text-4xl">
          OUR <br /> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  PRODUCTS
        </h3>
      </div>
    </div>
  );
}

export default OurProductTitle;
