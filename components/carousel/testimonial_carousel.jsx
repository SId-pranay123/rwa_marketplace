import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Scrollbar, Autoplay } from "swiper";
import "swiper/css";
import "swiper/css/pagination";
import { testimonial_data } from "../../data/testimonial_data";
import { useRouter } from "next/router";
import pathChecking from "../../utils/pathChecking";

const Testimonial_carousel = () => {
  const route = useRouter();

  return (
    <>
      <div>
        Hello
      </div>
    </>
  );
};

export default Testimonial_carousel;
