import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import type { ResultType } from '../../types';
import { pronounce } from '../../utils';
import { pronounceVolumeContext } from '../../Contexts/PronounceProvider';
import FavoriteStar from '../Favorites/FavoriteStar';
import FavoriteHeader from './FavoriteHeader';

type Props = {
    missCount: number;
    results: ResultType[];
    measure: PerformanceEntryList;
    back: () => void;
    retry: () => void;
};

const FavoriteResult: React.FC<Props> = ({ missCount, results, measure, back, retry }) => {
    const allWordCount = results.map<number>((result) => result.en.length).reduce((p, c) => p + c, 0);
    const correctTypeRate = Math.round(((allWordCount - missCount) / (allWordCount + missCount)) * 100);
    const pronounceVolume = useContext(pronounceVolumeContext);
    return (
        <div className="h-screen w-screen absolute top-0 left-0 bg-white z-50 flex flex-col items-center overflow-hidden">
            <FavoriteHeader text="ステージ選択に戻る" href="/scoring" mode="scoring"></FavoriteHeader>
            <div className="h-4/5 w-5/6 flex flex-1">
                <div className="h-full flex-1 m-1 overflow-hidden">
                    <div className="text-center text-xl font-bold">単語</div>
                    <div className="h-full overflow-y-scroll pb-6 scrollbar-hide">
                        {results.map((result) => {
                            return (
                                <React.Fragment key={result.id}>
                                    <div className="flex border-b-2 border-solid border-gray-300 p-1 my-2 items-end">
                                        <div
                                            className="w-fit h-fit flex items-center justify-center p-1 bg-green-400 rounded-md"
                                            onClick={() => {
                                                pronounce(result.en, pronounceVolume);
                                            }}
                                        >
                                            <VolumeUpIcon style={{ width: '2.5rem', height: '2.5rem' }} />
                                        </div>
                                        <div className="mx-2">
                                            <div className="text-sm whitespace-nowrap text-ellipsis overflow-hidden">
                                                {result.ja}
                                            </div>
                                            <div
                                                className={
                                                    result.correct
                                                        ? 'text-lg font-bold'
                                                        : 'text-red-500 font-bold text-lg'
                                                }
                                            >
                                                {result.en}
                                            </div>
                                        </div>
                                        <div className="flex-1 items-center">
                                            <div className="justify-self-end">
                                                <FavoriteStar word={{ id: result.id, ja: result.ja, en: result.en }} />
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            );
                        })}
                    </div>
                </div>
                <div className="flex-1 m-1 flex flex-col">
                    <div className="text-center text-xl font-bold">結果</div>
                    <div className="flex items-end justify-between border-b-2 border-solid border-gray-300 p-3">
                        <div className="text-lg font-bold">正答率</div>
                        <div className="text-5xl font-bold">
                            {results.filter((result) => result.correct).length} / {results.length}
                        </div>
                    </div>
                    <div className="flex items-end justify-between border-b-2 border-solid border-gray-300 p-3">
                        <div className="text-lg font-bold">タイム</div>
                        <div className="text-5xl font-bold">{Math.round(measure[0].duration) / 1000} 秒</div>
                    </div>
                    <div className="flex items-end justify-between border-b-2 border-solid border-gray-300 p-3">
                        <div className="text-lg font-bold">入力速度(文字/秒)</div>
                        <div className="text-5xl font-bold">
                            {Math.round((allWordCount / measure[0].duration) * 1000 * 100) / 100}
                        </div>
                    </div>
                    <div className="flex items-end justify-between border-b-2 border-solid border-gray-300 p-3">
                        <div className="text-lg font-bold">ミスタッチ</div>
                        <div className="text-5xl font-bold">{missCount}</div>
                    </div>
                    <div className="flex items-end justify-between border-b-2 border-solid border-gray-300 p-3">
                        <div className="text-lg font-bold">正確率</div>
                        <div className="text-5xl font-bold">{correctTypeRate} %</div>
                    </div>
                    <div className="flex justify-between">
                        <Button variant="outlined" onClick={retry} sx={{ margin: '20px 5px' }}>
                            retry
                        </Button>
                        <Button variant="outlined" onClick={back} sx={{ margin: '20px 5px' }}>
                            back
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FavoriteResult;