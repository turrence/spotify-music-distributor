import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { get_playlists } from './api';
import { PlaylistListContainer } from './Components/components'
import { useEffect, useState } from 'react';

const SAMPLE_DATA_DICT = [["songs i dont skip","5LdOcWPXDsqq45yjxZUubE"],["feelin' it","0Rv4mckw6BNFqIlofP9x4E"],["content happiness","1GpCw7CKFqJ8X3rYi56WUQ"],["vibin alone","6gwVqMVWl1OETGbhY9IfM7"],["new age angst","2vOme2jPBT4zagIWE3NawW"],["angst sorted by increasing valence","2ga2zE0Ajg1VNAVRCtsAdG"],["THROWBACK","2Bfg5GATRxtxskwokfNM0V"],["big sad","0MtrZDJvhrtw4tueKSy8cV"],["kick back","49cPgrQ91d7fyJnEWCw4G3"],["no words just vibes","1UzZh1IKwbq3Eusp8wbQrM"],["la vibe","5Ffbs9c0wsfj6Hamrp06XD"],["RAPGOD Pog","43seaQpgUt4OApR7Lb13PM"],["better nightcore xd","3YqslVWmv4OGMhDZmfv1Nq"],["not english","3qrSaw7tT51YJ0a23KN9NT"],["soft electric","28sywvUPTmlWGekebzF6xk"],["i'm scared of abgs","08M86YC5flQqXqQxaDO3a3"],["retro? lol","0SrC851cTx2WvyUNxu6LqV"],["imagine a lofi playlist","2XfPdYmhYFSAtXNlrKkfAG"],["purgatory music","7rpGjQLyLqDimbMBm1uIsT"],["summer 2021","2L7IVXVJqa2RAGav2Wo9Wq"],["spring 2021","543EjWL4Lopopg1KhCyJuv"],["winter 2021","2YjpjeFdwrqs1nh1T2Z7RC"],["fall 2020","3j8QOFlQe4rEgmGdg1mnal"],["summer 2020","2FRFMZEc1dFrlZjG6UgYUj"],["spring 2020","24hua5S9m0siGtrs0X9qE2"],["winter 2020","47VUTxHG3REzf7hhAYJUfK"],["summer 2019","1ctVyRY4JCqnlmuM5wBKby"],["simp jr","4wlac1Fy7it9B9CEAaF8xj"],["simp","2SQmcz2dUTKhxWsXiZMoQH"],["songs i dont skip og","7422LhXsE4bMMFXrGdjLIb"],["Timid","1dmyMFx4TL2nmQwambUeRI"],["CatchyStuff","6SqZUzEmSgeSHk18Qpqk9z"],["Liked from Radio","3hVCnSs6A5HcqBxhsgpMYX"],["Spotify.Me","4ZoDCn3VIZkxSng1Yq6PIr"],["Sing Along","5zwmBcywnytpJOUjJjgQOe"],["NotReallyMainstream","2mHa8P1Lh3kCFIMGHluzKe"],["MuchWow","6sDD2AzmTk20CNKLzKiTfn"],["Battle","2QEapA3sKNHVYypcF8ZyhK"],["Best of Owl City","2WkiMvrgzsv4GJ6WImNStX"],["OwlCity","2017Z4Nva0r2noswfILp09"],["Electronic (:","0N0ud7GSvPYE4Oipl9A0mf"],["HSM","7xFbq2B0cJzRbd8QXJHBNp"],["Classical","099vLi6HxDWmW3MYXWFGyF"],["2014 Musical","6QIgRRomuxqQ6HMh3IMmVf"],["OlderSongs:P","0XtiOxDXvNJgUBkfdc6FK6"]]

function App() {
  const [playlists , setPlaylists] = useState([]);

  useEffect(() => {

    const api_get_playlists = async () => {
      const data = await get_playlists()
      setPlaylists(data)
    }

    // --------------------ACTUAL API CALL------------------
    // api_get_playlists(playlists);
    // -------------------FOR DEVELOPMENT--------------------
    setPlaylists(SAMPLE_DATA_DICT)
  }, []);
  
  return (
    <div className="App">
      <PlaylistListContainer playlists={playlists}></PlaylistListContainer>
    </div>
  );
}

export default App;
