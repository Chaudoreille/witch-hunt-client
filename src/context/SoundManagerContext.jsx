import { createContext, useState, useEffect } from "react";
export const SoundManagerContext = createContext();

const gameSoundEffects = {
  messageSent: "pop-3.mp3",
  messageReceived: "pop-9.mp3",
  castVote: "pop-5.mp3",
  lockVote: "lock.mp3",
  error: "error.mp3",
};

const gameMusicTracks = {
  daytime: "Ambient 7.mp3",
  nighttime: "Action 5.mp3",
};

function SoundManagerContextWrapper(props) {
  const [soundEffects, setSoundEffects] = useState({});
  const [currentMusicTrack, setCurrentMusicTrack] = useState(new Audio());

  // initialize all of the sound effects
  useEffect(() => {
    // sound effects:
    const newSoundEffects = {};
    for (const sfxName in gameSoundEffects) {
      newSoundEffects[sfxName] = new Audio(
        "/audio/sound/" + gameSoundEffects[sfxName]
      );
    }

    setSoundEffects(newSoundEffects);
  }, []);

  function playSoundEffect(name) {
    if (soundEffects[name]) {
      // if sound effect is already playing, just rewind to 0 and let it continue playing, otherwise, hit play
      if (!soundEffects[name].paused) soundEffects[name].currentTime = 0;
      else soundEffects[name].play();
    }
  }

  function playMusicTrack(name) {
    if (!gameMusicTracks[name]) return;

    currentMusicTrack.pause();
    currentMusicTrack.src = `/audio/music/${gameMusicTracks[name]}`;
    currentMusicTrack.loop = true;
    currentMusicTrack.play();
  }

  function stopMusic() {
    currentMusicTrack.pause();
  }

  return (
    <SoundManagerContext.Provider
      value={{ playMusicTrack, playSoundEffect, stopMusic }}
    >
      {props.children}
    </SoundManagerContext.Provider>
  );
}

export default SoundManagerContextWrapper;
