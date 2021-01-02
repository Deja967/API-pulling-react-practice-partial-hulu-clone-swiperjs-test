import React from 'react'
import {useRef, useState, useEffect, useCallback } from 'react';
import Axios from 'axios';
import './Airing.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import Modal from './Modal';
import { GlobalStyle } from './globalStyle';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import styled from 'styled-components';
import request from '../request'

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    top; 20px
    `;

function Airing(props) {
    const API_KEY = "968f2ba5042db8aad2b1f485eda6fcc7"
    const [airing_today, setAiringToday] = useState([]);
    const [airingId, setAiringId] = useState()
    const [showModal, setShowModal] = useState(false);
    const [url, setUrl] = useState("https://api.themoviedb.org/3/tv/airing_today?api_key=968f2ba5042db8aad2b1f485eda6fcc7&&language=en-US&append_to_response=credits,videos,images&include_image_language=en,null");
    const openModal = (show) => {
        console.log("icon clicked!")
        setAiringId(show)
        setShowModal(prev => !prev);
    };

    useEffect(() => {
        const fetchdata = async () => {
            const result = await Axios.get(url);
            setAiringToday(result.data.results);
        };
        fetchdata();
    }, [url]);

    const posterURL = "https://image.tmdb.org/t/p/original";
    const swiperItems = airing_today.map((airing, i) => {
        return (
            <SwiperSlide key={i}>
                <PlayCircleFilledIcon className="play" 
                    onClick={() => openModal(airing)} 
                    style={{fontSize: "50px", color: "white", cursor: "pointer", position: "relative", top: "50%", left: "55%" }} />
                <img src={posterURL + airing.backdrop_path} style={{ padding: "50px", paddingTop: "15px", width: "120%", height: "auto" }}>
                </img>
            </SwiperSlide>
        )
    })

    return (
        <div>
            <div className="airing_header">
                <h1>Airing Today</h1>
            </div>
            <div>
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
                {airingId ? 
                
                <Container>
                    <Modal showModal={showModal} setShowModal={setShowModal} showId={airingId} />
                    <GlobalStyle />
                </Container> :null }
            </div>
        </div>

    )
}


export default Airing

