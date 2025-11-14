import Video from "@/components/molecules/Video/video";
import useFetchAllVideos from "@/hooks/apis/useFetchAllVideos";
import { useEffect, useState } from "react";
import './Reel.css';

export const Reel = () => {

  const [playing, setPlaying] = useState(1);
  const [videoDownloaded, setVideoDownloaded] = useState([]);

  const { isVideoFetching, isVideoError, isVideoFetched, videos} = useFetchAllVideos();

  useEffect(() => {
    if(isVideoFetched && videos)
      setVideoDownloaded(videos);
  }, [videos, isVideoFetched]);

  if(isVideoFetching) {
    return <div>Loading...</div>
  }

  if(isVideoError) {
    return <div>Error fetching videos.</div>
  }

    return (
        <div className='app'>
        <div className='container'> 
            {isVideoFetched && videoDownloaded.map((currentVideo) => (
            <Video
                key={currentVideo.id} 
                id={currentVideo.id} 
                url={currentVideo.url} 
                caption={currentVideo.caption}
                playing={playing}
                setPlaying={setPlaying}
            />
            ))}
        </div>
        </div>
    )
}