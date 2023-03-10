import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import NativeSelect from '@mui/material/NativeSelect';
import { useRouter } from 'next/router';
import path from 'path';
import React, { FC } from 'react';

import useHasFavorites from '../../hooks/useHasFavorites';
import type { PathParam } from '../../types';
import { rankIndicesObj, sliceByNumber } from '../../utils';

type Props = {
    param: PathParam;
};

const WorldSelect: FC<Props> = ({ param }) => {
    const { mode, rank, world } = param;
    const router = useRouter();
    const allIndices = sliceByNumber(
        rankIndicesObj.find((v) => {
            return v.rank === rank;
        })!.indices,
        100
    );
    const hasFavorite = useHasFavorites(rank);

    return (
        <div>
            <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        id
                    </InputLabel>
                    <NativeSelect
                        defaultValue={world}
                        value={world}
                        onChange={async (e) => {
                            const world = e.currentTarget.value;
                            if (world === 'favorites') {
                                await router.push({ pathname: `/${path.join(mode, rank, world)}` });
                                return;
                            }
                            await router.push({
                                pathname: `/${path.join(mode, rank, world, '0')}`,
                            });
                        }}
                    >
                        <option value="favorites" disabled={!hasFavorite}>
                            ★
                        </option>
                        {allIndices.map((indices, i) => (
                            <option key={i} value={String(i)}>
                                {`${indices[0]} ~ ${indices.at(-1)!}`}
                            </option>
                        ))}
                    </NativeSelect>
                </FormControl>
            </Box>
        </div>
    );
};

export default WorldSelect;
