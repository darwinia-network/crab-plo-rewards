import { ApiPromise, WsProvider } from '@polkadot/api';
import { createContext, PropsWithChildren, useState, useEffect } from 'react';
import { from } from 'rxjs';
import { PageLoading } from '../component/PageLoading';

export type ApiCtx = {
  api: ApiPromise;
};

export const ApiContext = createContext<ApiCtx | undefined>(undefined);

export const ApiProvider = ({ children }: PropsWithChildren<unknown>) => {
  const [api, setApi] = useState<ApiPromise>();

  useEffect(() => {
    const provider = new WsProvider('wss://darwinia-crab.api.onfinality.io/public-ws');
    const sub$$ = from(ApiPromise.create({ provider })).subscribe(setApi);

    return () => sub$$.unsubscribe();
  }, []);

  if (!api) {
    return <PageLoading />;
  }

  return <ApiContext.Provider value={{ api }}>{children}</ApiContext.Provider>;
};
