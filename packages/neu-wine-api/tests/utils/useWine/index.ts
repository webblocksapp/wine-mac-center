import { useWine as baseUseWine } from 'neu-wine-api';
import { useMemo } from 'react';

export const useWine = () => useMemo(() => baseUseWine(), []);