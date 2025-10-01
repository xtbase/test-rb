'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createConfig, http, WagmiProvider } from 'wagmi';
import { mainnet } from 'wagmi/chains';
import { connectorsForWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import {
  coinbaseWallet,
  metaMaskWallet,
  phantomWallet,
  rabbyWallet,
  rainbowWallet,
  uniswapWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { useEffect, useState } from 'react';

const connectors = connectorsForWallets(
  [
    {
      groupName: 'Recommended',
      wallets: [
        coinbaseWallet,
        metaMaskWallet,
        uniswapWallet,
        rainbowWallet,
        phantomWallet,
        walletConnectWallet,
        rabbyWallet,
      ],
    },
  ],
  {
    projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID ?? 'dummy-id',
    walletConnectParameters: {},
    appName: '',
    appDescription: '',
    appUrl: '',
    appIcon: '',
  },
);

const config = createConfig({
  connectors,
  chains: [mainnet],
  transports: {
    [mainnet.id]: http(),
  },
  ssr: true,
});
const queryClient = new QueryClient();

export default function CryptoProviders() {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    setCounter(counter + 1);
  }, []);


  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
          <RainbowKitProvider initialChain={mainnet} modalSize="compact">
            <div>Hello</div>
            <div>{counter}</div>
            <button onClick={() => setCounter(counter + 1)}>Increment</button>
          </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
