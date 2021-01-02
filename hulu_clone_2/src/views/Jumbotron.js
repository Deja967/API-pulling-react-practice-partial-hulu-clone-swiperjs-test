import React from 'react';
import './Jumbotron.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import NavBar from './NavBar';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { useState, useEffect } from 'react';
import Axios from 'axios';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import request from'../request.js'



function Jumbotron(props) {
    const API_KEY = "968f2ba5042db8aad2b1f485eda6fcc7"
    const [trending, setTrending] = useState([]);
    const [url, setUrl] = useState("https://api.themoviedb.org/3/trending/tv/day?api_key=968f2ba5042db8aad2b1f485eda6fcc7")

    useEffect(() => {
        const fetchdata = async () => {
            const result = await Axios.get(request.fetchTrending);
            setTrending(
                result.data.results[
                Math.floor(Math.random() * result.data.results.length - 1)
                ]
            );
            return result
        }
        console.log("this is", trending)
        fetchdata();
        
    }, [])




    const posterURL = `https://image.tmdb.org/t/p/original/titles${trending.backdrop_path}`;

    return (
        <div className="wrapper">
            <div className="jumbo_header">
                <NavBar />
                <div className="details">
                    <div className="main_details">
                        <span className="content">
                            <div className="now_streaming">
                                <p>NOW STREAMING</p>
                                <h2>{trending.name}</h2>
                                <p>{trending.overview}</p>                             
                            </div>                          
                            <div className="NewButton">
                                <button className="NewButton NewButton--high-emphasis NewButton--medium"><PlayArrowIcon />Play</button>
                                <button className="NewButton NewButton--medium-emphasis NewButton--medium">Details</button>
                                <MoreVertIcon className="MenuButton-1" />
                            </div>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )

    // style={{
    //     position: "relative",
    //     backgroundImage: `url("https://image.tmdb.org/t/p/original/titles${trending.backdrop_path}")`,
    //     backgroundRepeat: "no-repeat, repeat",
    //     backgroundSize: "cover",
    //     backgroundPosition: "center center",
    //     width: "2560px",
    //     height: "1350px",
    //     objectFit: "contain",
    //     margin: "0%",
    //     padding:" 20px"
    // }}
}
export default Jumbotron
