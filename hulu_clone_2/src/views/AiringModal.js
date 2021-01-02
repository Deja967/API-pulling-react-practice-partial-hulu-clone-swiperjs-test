import React, { useRef, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import styled from 'styled-components';
import { MdClose } from 'react-icons/md';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import { Link } from '@reach/router';


const ModalWrapper = styled.div`
    width: 800px;
    height: 700px;
    box-shadow: 0 5px 16px rgba(0, 0, 0, 0.4);
    background: #fff;
    color: #000;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    z-index: 10;
    border-radius: 10px;
    `;

const ModalImg = styled.img`
    width: 100%;
    height: 160.7%;
    border-radius: 10px 0 0 10px;
    object-fit: contain;
    background: #000;
    `;

const ModalContent = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 1.8;
    color: #141414;
    p {
        margin-bottom: 1rem;
    }
    button {
        padding: 10px 24px;
        background-image: linear-gradient(to right, #051421, #042727);
        color: #fff;
        border: none;
    }
`;

const CloseModalButton = styled(MdClose)`
    cursor: pointer;
    color: black;
    position: absolute;
    top: 20px;
    right: 20px;
    width: 32px;
    height: 32px;
    padding: 0;
    z-index: 10;
`;

export const Modal = ({ showModal, setShowModal, airingId }) => {
    console.log(airingId)
    const modalRef = useRef();
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? `translateY(0%)` : `translateY(-100%)`
    });

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    };

    const keyPress = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false);
                console.log('I pressed');
            }
        },
        [setShowModal, showModal]
    );

    useEffect(
        () => {
            document.addEventListener('keydown', keyPress);
            return () => document.removeEventListener('keydown', keyPress);
        },
        [keyPress]
    );
    const posterURL = "https://image.tmdb.org/t/p/original";

    return (
        <>
            {showModal ? (
                <div style={{
                    width: "100 %",
                    height: "100 %",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                }} onClick={closeModal} ref={modalRef}>
                    <animated.div style={animation}>
                        <ModalWrapper showModal={showModal}>
                            <ModalImg style={{
                                width: "100%",
                                height: "160.7%"
                            }} src={posterURL + airingId.poster_path} alt='camera' />
                            <ModalContent>
                                <div>
                                    <h1>{airingId.original_name}</h1>
                                    <h3 style={{ fontSize: "14px" }}>{airingId.overview}</h3>
                                    <h3 style={{ fontSize: "14px" }}>Rating: {airingId.vote_average}<FiberManualRecordIcon style={{ fontSize: "7px" }} />Date: {airingId.first_air_date}</h3>
                                    <button><PlayCircleFilledIcon style={{ fontSize: "25px" }} />Start Watching: S1 E1</button>
                                </div>
                            </ModalContent>
                            <Link to="/">
                                <CloseModalButton
                                    aria-label='Close modal'
                                    onClick={() => setShowModal(prev => !prev)}
                                />
                            </Link>
                        </ModalWrapper>
                    </animated.div>
                </div>
            ) : null
            }
        </>
    );
};
export default Modal