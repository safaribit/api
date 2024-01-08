import ccxt from 'ccxt'
import { getExchangeRate } from '@tamtamchik/exchanger'

export default (fastify, opts, next) => {
  fastify.get('/price', async (req, res) => {
    const { crypto, fiat } = req.query

    const { BINANCE_API_KEY, BINANCE_API_SECRET } = process.env

    const code =
      crypto.toUpperCase() === 'SFX' ? 'ETHDOWN' : crypto.toUpperCase()
    const ExchangeClass = ccxt.binance
    const platform = new ExchangeClass({
      apiKey: BINANCE_API_KEY,
      secret: BINANCE_API_SECRET
    })

    const symbol = `${code.toUpperCase()}USDT`

    await platform.loadMarkets()
    const record = await platform.publicGetAvgPrice({
      symbol
    })

    const rate = await getExchangeRate('USD', fiat.toUpperCase(), {
      cacheDurationMs: 300000
    })

    record.price = record.price * rate
    return record
  })

  next()
}
