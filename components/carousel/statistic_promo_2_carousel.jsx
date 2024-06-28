import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import Image from 'next/image';
import 'tippy.js/dist/tippy.css';
import { bidsData } from '../../data/bids_data';
import Link from 'next/link';
import Tippy from '@tippyjs/react';
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from 'react-icons/md';
import { bidsModalShow } from '../../redux/counterSlice';
import { useDispatch } from 'react-redux';
import Likes from '../likes';
import { statistic_promo_2_data } from '../../data/statistic_promo_2_data';

const Statistic_promo_carousel = () => {
	const dispatch = useDispatch();

	return (
		<>
		<div>
			Hello
		</div>
		</>
	);
};

export default Statistic_promo_carousel;
