import { useContext } from 'react';
import { ApiContext, ApiCtx } from '../provider';

export const useApi = () => useContext(ApiContext) as Exclude<ApiCtx, undefined>;
