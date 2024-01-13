import ccxt from 'ccxt'
import pkg from 'lodash'

const { uniqBy } = pkg

const safaricoin = {
  id: 'SFX',
  name: 'Safaricoin',
  code: 'SFX',
  precision: 8,
  info: {
    coin: 'SFX',
    depositAllEnable: true,
    withdrawAllEnable: true,
    name: 'Safaricoin',
    free: '0',
    locked: '0',
    freeze: '0',
    withdrawing: '0',
    ipoing: '0',
    ipoable: '0',
    storage: '0',
    isLegalMoney: false,
    trading: true,
    networkList: [
      {
        network: 'BSC',
        coin: 'ETH',
        withdrawIntegerMultiple: '0.00000001',
        isDefault: false,
        depositEnable: true,
        withdrawEnable: true,
        depositDesc: '',
        withdrawDesc: '',
        specialTips: '',
        specialWithdrawTips:
          'The network you have selected is BSC. Please ensure that the withdrawal address supports the BNB Smart Chain network. You will potentially lose your assets if the chosen platform does not support refunds of wrongfully deposited assets.',
        name: 'BNB Smart Chain (BEP20)',
        resetAddressStatus: false,
        addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
        memoRegex: '',
        withdrawFee: '0.00017',
        withdrawMin: '0.00034',
        withdrawMax: '10000000000',
        minConfirm: '15',
        unLockConfirm: '0',
        sameAddress: false,
        estimatedArrivalTime: '3',
        busy: false,
        contractAddressUrl: 'https://bscscan.com/token/',
        contractAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8'
      },
      {
        network: 'ETH',
        coin: 'ETH',
        withdrawIntegerMultiple: '0.00000001',
        isDefault: true,
        depositEnable: true,
        withdrawEnable: true,
        depositDesc: '',
        withdrawDesc: '',
        specialTips:
          'DO NOT define your Binance deposit address as the receiving address for validator rewards. Validator rewards sent from the node to Binance deposit address is not supported and will not be credited. This will lead to asset loss.',
        specialWithdrawTips: '',
        name: 'Ethereum (ERC20)',
        resetAddressStatus: false,
        addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
        memoRegex: '',
        withdrawFee: '0.0032',
        withdrawMin: '0.01',
        withdrawMax: '10000000000',
        minConfirm: '6',
        unLockConfirm: '64',
        sameAddress: false,
        estimatedArrivalTime: '4',
        busy: false,
        contractAddressUrl: 'https://etherscan.io/token/'
      }
    ]
  },
  active: true,
  deposit: true,
  withdraw: true,
  networks: [
    {
      network: 'BSC',
      coin: 'ETH',
      withdrawIntegerMultiple: '0.00000001',
      isDefault: false,
      depositEnable: true,
      withdrawEnable: true,
      depositDesc: '',
      withdrawDesc: '',
      specialTips: '',
      specialWithdrawTips:
        'The network you have selected is BSC. Please ensure that the withdrawal address supports the BNB Smart Chain network. You will potentially lose your assets if the chosen platform does not support refunds of wrongfully deposited assets.',
      name: 'BNB Smart Chain (BEP20)',
      resetAddressStatus: false,
      addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
      memoRegex: '',
      withdrawFee: '0.00017',
      withdrawMin: '0.00034',
      withdrawMax: '10000000000',
      minConfirm: '15',
      unLockConfirm: '0',
      sameAddress: false,
      estimatedArrivalTime: '3',
      busy: false,
      contractAddressUrl: 'https://bscscan.com/token/',
      contractAddress: '0x2170ed0880ac9a755fd29b2688956bd959f933f8'
    },
    {
      network: 'ETH',
      coin: 'ETH',
      withdrawIntegerMultiple: '0.00000001',
      isDefault: true,
      depositEnable: true,
      withdrawEnable: true,
      depositDesc: '',
      withdrawDesc: '',
      specialTips:
        'DO NOT define your Binance deposit address as the receiving address for validator rewards. Validator rewards sent from the node to Binance deposit address is not supported and will not be credited. This will lead to asset loss.',
      specialWithdrawTips: '',
      name: 'Ethereum (ERC20)',
      resetAddressStatus: false,
      addressRegex: '^(0x)[0-9A-Fa-f]{40}$',
      memoRegex: '',
      withdrawFee: '0.0032',
      withdrawMin: '0.01',
      withdrawMax: '10000000000',
      minConfirm: '6',
      unLockConfirm: '64',
      sameAddress: false,
      estimatedArrivalTime: '4',
      busy: false,
      contractAddressUrl: 'https://etherscan.io/token/'
    }
  ],
  fee: 0.0032,
  fees: {
    BSC: 0.00017,
    ETH: 0.0032
  },
  limits: {
    leverage: {},
    amount: {},
    price: {},
    cost: {}
  }
}

const networks = ['BTC', 'ETH']

export default (fastify, opts, next) => {
  fastify.get('/cryptos', async () => {
    const { BINANCE_API_KEY, BINANCE_API_SECRET } = process.env
    const ExchangeClass = ccxt.binance
    const platform = new ExchangeClass({
      apiKey: BINANCE_API_KEY,
      secret: BINANCE_API_SECRET
    })

    const all = await platform.fetchCurrencies()
    const cryptos = Object.values(all).filter((currency) => {
      const record = currency.networks.find((network) => network?.isDefault)
      return (
        !currency.info.isLegalMoney &&
        currency.info.trading &&
        networks.includes(record?.network)
      )
    })

    const btc = cryptos.find((crypto) => crypto.id === 'BTC')
    const eth = cryptos.find((crypto) => crypto.id === 'ETH')

    return uniqBy([btc, eth, safaricoin, ...cryptos], 'id')
  })

  next()
}
