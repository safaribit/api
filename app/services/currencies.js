import ccxt from 'ccxt'

export default (fastify, opts, next) => {
  fastify.get('/currencies', async () => {
    const { BINANCE_API_KEY, BINANCE_API_SECRET } = process.env
    const ExchangeClass = ccxt.binance
    const platform = new ExchangeClass({
      apiKey: BINANCE_API_KEY,
      secret: BINANCE_API_SECRET
    })

    const all = await platform.fetchCurrencies()

    const currencies = Object.values(all).filter(
      (currency) => currency.info.isLegalMoney
    )

    return currencies
  })

  next()
}
