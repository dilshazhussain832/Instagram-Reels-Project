import { useEffect, useRef } from "react";
import "./video.css";
import { ReelFooter } from "@/components/atoms/ReelFooter/ReelFooter";

export default function Video({
    id,
    url,
    caption,
    playing,
    setPlaying
}) {
    const videoRef = useRef(null);

    function handleClick() {
        if(videoRef.current.paused) {
            videoRef.current.play();
            setPlaying(id);
        } else {
            videoRef.current.pause();
            setPlaying(null);
        }
    }

    useEffect(() => {
        if(playing !== id) {
            videoRef.current.pause();
        }
    }, [playing, id]);


    useEffect(() => {

        const observer = new IntersectionObserver((entries) => {
            
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    videoRef.current.play();
                    setPlaying(id);
                }
            })

        }, { threshold: 0.5 });

        if(videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if(videoRef.current) {
                observer.unobserve(videoRef.current);
            }
        }
    }, [id, setPlaying]);


    return (
        <div className="video-wrapper">
            <video className="video-player" loop onClick={handleClick} ref={videoRef} src={url}>

            </video>

            <div className="bottom">
                <ReelFooter channel={"dilshaz_hussain832"} caption={caption} />
            </div>

        </div>
    )
}