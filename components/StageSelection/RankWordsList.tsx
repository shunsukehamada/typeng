import React, { FC } from 'react';
import { Rank } from '../../types';
import useGetWords from '../../hooks/useGetWords';
import path from 'path';
import WordsList from './WordsList';

type Props = {
    rank: Rank;
    isOpen: boolean;
    close: () => void;
};

const RankWordsList: FC<Props> = ({ rank, isOpen, close }) => {
    const { words, isLoading } = useGetWords(isOpen, path.join('api', rank));
    return <WordsList isLoading={isLoading} isOpen={isLoading === 'done' && isOpen} words={words} close={close} />;
};

export default RankWordsList;
