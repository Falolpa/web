let provider;
const web3 = new Web3;
const bsc = new Web3;
const polygon = new Web3;
const fantom = new Web3;
const celo = new Web3;
bsc.setProvider("https://bsc-dataseed.binance.org/")
polygon.setProvider("https://polygon-rpc.com/")
fantom.setProvider("https://rpc.ftm.tools/")
celo.setProvider("https://forno.celo.org/")
let chainId;

window.onload = async () => {

  provider = await detectEthereumProvider()

  if (provider) {
    provider.on('chainChanged', () => location.reload())
    provider.on('accountsChanged', () => location.reload())
    provider.on('disconnect', () => location.reload())

    await provider.request({ method: 'eth_requestAccounts' })

    web3.setProvider(provider)

    chainId = await web3.eth.getChainId()

    switch (chainId) {
      case 1:
        chainId = 'Ethereum Mainnet'
        break
      case 56:
        chainId = 'Binance Smart Chain'
        break
      case 97:
        chainId = 'Binance Smart Chain (Testnet)'
        break
      case 250:
        chainId = 'Fantom Opera'
        break
      case 137:
        chainId = 'Polygon'
        break
      default:
        chainId = 'Alguna red'
    }

    document.getElementById("red").textContent = chainId;

    conectado()

  } else {
    console.error('Web3 provider not detected')
    //alert("Metamask no detectado, use un navegador dapp para ver más información")
  }
}


const conectado = async () => {

  let tuCuenta = await web3.eth.getAccounts();
  document.getElementById("add").textContent = `${String(tuCuenta).substring(1, 5)}...${String(tuCuenta).substring(38)} `;
  let tuBalance = await web3.eth.getBalance(tuCuenta[0]);
  tuBalance = Number(web3.utils.fromWei(tuBalance)).toFixed(3);
  document.getElementById("bal").textContent = tuBalance;

  if (chainId == 'Binance Smart Chain') {

  }


  const firma = async () => {
    try {
      let accounts = await web3.eth.getAccounts();

      const msg = "00";

      const firmado = await web3.eth.sign(msg, accounts[0]);

      console.log (firmado)

    } catch (error) {
      console.error(error);
    }
  };

  document.getElementById("signTypedDataV4Button").onclick = firma


}



