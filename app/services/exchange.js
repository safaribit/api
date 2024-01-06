import ccxt from 'ccxt'

export default (fastify, opts, next) => {
  fastify.get(
    '/exchange',
    {
      schema: {
        response: {
          200: {
            type: 'object'
          }
        }
      }
    },
    async (req, res) => {
      const { BINANCE_API_KEY, BINANCE_API_SECRET } = process.env

      const ExchangeClass = ccxt.binance
      const platform = new ExchangeClass({
        apiKey: BINANCE_API_KEY,
        secret: BINANCE_API_SECRET
      })
      const info = await platform.publicGetExchangeInfo()
      return info
    }
  )

  next()
}
