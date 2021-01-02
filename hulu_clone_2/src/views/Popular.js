import React, { useRef, useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import { navigate } from '@reach/router';
import './Popular.css'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Modal from './Modal';
import { GlobalStyle } from './globalStyle';
import { Link } from '@reach/router'
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    `;

const Popular = props => {
    const API_KEY = "968f2ba5042db8aad2b1f485eda6fcc7"
    const [popular_tv, setPopularTV] = useState([]);
    const [popularId, setPopularId] = useState()
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState("https://api.themoviedb.org/3/tv/popular?api_key=968f2ba5042db8aad2b1f485eda6fcc7&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null");
    const openModal = (show) => {
        console.log("icon clicked!")
        setPopularId(show)
        setShowModal(prev => !prev);
    };

    useEffect(() => {
        const fetchdata = async () => {
            const result = await Axios.get(url);
            setPopularTV(result.data.results);
        };
        fetchdata();
    }, [url]);

    const posterURL = "https://image.tmdb.org/t/p/original";
    const swiperItems = popular_tv.map((popular, i) => {
        return (
            <SwiperSlide key={i}>
                <PlayCircleFilledIcon className="play" 
                    onClick={() => openModal(popular)} 
                    style={{fontSize: "50px", color: "white", cursor: "pointer", position: "relative", top: "50%", left: "53%" }}   />
                <img src={posterURL + popular.backdrop_path} style={{ padding: "50px", paddingTop: "15px", width: "120%", height: "auto" }}>
                </img>
            </SwiperSlide>
        )
    })



    return (
        <div>
            <div className="popular_header">
                <h1>Popular</h1>
            </div>
            <div className="test">
                {
                    swiperItems.length > 0 ?
                        <Swiper
                            onSwiper={(swiper) => (window.swiper = swiper)}
                            slidesPerView={5}
                            spaceBetween={6}
                            slidesPerGroup={5}
                            navigation
                            pagination={{ clickable: true }}
                        >
                            {swiperItems}
                        </Swiper>
                        : null
                }
            </div>
            <div>
                {popularId ? 
                
                <Container>
                    <Modal showModal={showModal} setShowModal={setShowModal} showId={popularId} />
                    <GlobalStyle />
                </Container> :null }
            </div>
        </div>
    )
}
export default Popular
