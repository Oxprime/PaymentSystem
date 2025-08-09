import { http } from 'viem'
import { hardhat } from 'viem/chains' 
import { createConfig } from '@wagmi/core'

export const config = createConfig({ chains: [hardhat], transports:
   { [hardhat.id]: http('http://127.0.0.1:8545') }, ssr: false,
   })
