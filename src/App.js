import "./App.css";
import {
  LivepeerProvider,
  useCreateAsset,
  useLivepeerProvider,
} from "@livepeer/react";
import React, { useState } from "react";
import { Player } from "@livepeer/react";

import blenderPoster from "./assets/thumbnail.jpg";

function App() {
  const provider = useLivepeerProvider();
  const [video, setVideo] = useState(null);

  const {
    mutate: createAsset,
    data: assets,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [{ name: video.name, file: video }],
        }
      : null
  );
  return (
    <div className="App">
      <h2>Hello, {provider.getConfig().name}</h2>
      <input
        type={"file"}
        onChange={(e) => {
          setVideo(e.target.files[0]);
        }}
      />
      <button
        disabled={status === "loading" || !createAsset}
        onClick={() => {
          createAsset?.();
        }}
      >
        Create Asset
      </button>
      {assets?.map((asset) => (
        <div key={asset.id}>
          <div>
            <div>Asset Name: {asset?.name} </div>
            <div>Playback URL: {asset?.playbackUrl}</div>
            <div>IPFS CID: {asset?.storage?.ipfs?.cid ?? "None"}</div>
            <div>Player Back ID: {asset?.playbackId}</div>
          </div>
        </div>
      ))}

      {error && <div>{error.message}</div>}
      <div className="video-player">
        {assets ? (
          <Player
            title={assets[0]?.name}
            playbackId={assets[0]?.playbackId}
            loop
            poster={
              <img
                className="video"
                src={blenderPoster}
                layout="fill"
                objectFit="cover"
                priority
                placeholder="blur"
                alt="Random Thumbnail"
              />
            }
            showPipButton
            objectFit="cover"
          />
        ) : null}
        {/* <Player
          title="localhost_hack-on-chain_submission"
          playbackId={assets[0]?.playbackId}
          loop
          poster={
            <img
              className="video"
              src={blenderPoster}
              layout="fill"
              objectFit="cover"
              priority
              placeholder="blur"
              alt="Random Thumbnail"
            />
          }
          showPipButton
          objectFit="cover"
        /> */}
      </div>
    </div>
  );
}

export default App;
