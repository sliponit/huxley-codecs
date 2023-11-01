import Moralis from "moralis";
import { EvmChain }  from "@moralisweb3/common-evm-utils";

const runApp = async () => {
  await Moralis.start({
    apiKey: "TODO",
    // ...and any other configuration
  });

  const address = "0xdc9d3b61969ddfc332a84522db83a56d67dc1613";

  const chain = EvmChain.ETHEREUM;

  const firstResponse = await Moralis.EvmApi.nft.getNFTOwners({
    address,
    chain
  });
  let owners = firstResponse.result;

  for (let i = 0; i < 2; i++) {
    const next = await firstResponse.next()
    if (!next.hasNext) break;

    owners = owners.concat(next.result);
    console.error(i, owners.length, next.pagination)
  }

  console.log(JSON.stringify(owners));
};

runApp();
