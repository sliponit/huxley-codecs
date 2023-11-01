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
  let cursor = firstResponse.pagination.cursor

  for (let i = 0; i < 5; i++) {
    const response = await Moralis.EvmApi.nft.getNFTOwners({
      address,
      chain,
      cursor
    });

    owners = owners.concat(response.result);
    cursor = response.pagination.cursor;
    console.error(i, owners.length, response.pagination)
    if (!cursor) break
  }

  console.log(JSON.stringify(owners));
};

runApp();
