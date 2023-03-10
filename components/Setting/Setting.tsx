import React, { useContext } from 'react';

import { pronounceVolumeContext, setPronounceVolumeContext } from '../../Contexts/PronounceProvider';
import { setSoundEffectVolumeContext, soundEffectVolumeContext } from '../../Contexts/SoundEffectProvider';
import { setTypingVolumeContext, typingVolumeContext } from '../../Contexts/TypingVolumeProvider';
import { pronounce, sound, typeSound } from '../../utils';
import SettingSlider from './SettingSlider';
import SettingTextSize from './SettingTextSize';

export const Setting = () => {
    const pronounceVolume = useContext(pronounceVolumeContext);
    const setPronounceVolume = useContext(setPronounceVolumeContext);
    const soundEffectVolume = useContext(soundEffectVolumeContext);
    const setSoundEffectVolume = useContext(setSoundEffectVolumeContext);
    const typingVolume = useContext(typingVolumeContext);
    const setTypingVolume = useContext(setTypingVolumeContext);

    return (
        <div className="fit absolute top-16 right-2 z-10 flex w-60 flex-col items-center justify-center rounded-md border-2 border-solid border-black bg-white">
            <SettingSlider
                volume={pronounceVolume}
                setVolume={setPronounceVolume}
                item={'Pronounce'}
                check={(volume) => pronounce('check', volume / 100)}
            />
            <SettingSlider
                volume={soundEffectVolume}
                setVolume={setSoundEffectVolume}
                item={'Sound Effect'}
                check={(volume) => sound('sine', 0.1, volume / 100)}
            />
            <SettingSlider
                volume={typingVolume}
                setVolume={setTypingVolume}
                item={'Typing'}
                check={(volume) => typeSound(volume / 100)}
            />
            <SettingTextSize />
        </div>
    );
};
