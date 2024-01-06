import ccxt from 'ccxt'

export default (fastify, opts, next) => {
  fastify.get('/price', async (req, res) => {
    const { currency } = req.query

    const { BINANCE_API_KEY, BINANCE_API_SECRET } = process.env

    const code =
      currency.toUpperCase() === 'SFX' ? 'ETHDOWN' : currency.toUpperCase()
    const ExchangeClass = ccxt.binance
    const platform = new ExchangeClass({
      apiKey: BINANCE_API_KEY,
      secret: BINANCE_API_SECRET
    })

    const symbol = `${code.toUpperCase()}USDT`

    await platform.loadMarkets()
    const price = await platform.publicGetAvgPrice({
      symbol
    })

    return price
  })

  next()
}
