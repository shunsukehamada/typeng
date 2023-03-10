import React, { FC, Fragment } from 'react';

import { Loading, Word } from '../../types';
import FavoriteStar from '../Favorites/FavoriteStar';
import Modal from './Modal';
import Spinner from './Spinner';

type Props = {
    isLoading: Loading;
    isOpen: boolean;
    words: Word[];
    close: () => void;
};

const WordsList: FC<Props> = ({ isLoading, isOpen, words, close }) => {
    return (
        <div>
            <Spinner isLoading={isLoading} />
            <Modal isOpen={isOpen} close={close}>
                <div className="h-full overflow-y-scroll">
                    {words.map((word, i) => {
                        return (
                            <Fragment key={i}>
                                <div className={`mx-2 flex items-center py-2 ${i % 2 === 0 && 'bg-gray-200'}`}>
                                    <div className="mr-4 ml-1">No.{word.id}</div>
                                    <div className="text-lg">{word.en}</div>
                                    <span className="ml-1 mr-2">:</span>
                                    <div className="overflow-x-hidden text-ellipsis whitespace-nowrap text-lg">
                                        {word.ja}
                                    </div>
                                    <div className="flex-1">
                                        <FavoriteStar word={word}></FavoriteStar>
                                    </div>
                                </div>
                            </Fragment>
                        );
                    })}
                </div>
            </Modal>
        </div>
    );
};

export default WordsList;
