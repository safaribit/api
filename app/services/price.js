import ccxt from 'ccxt'

export default (fastify, opts, next) => {
  fastify.get(
    '/price',
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
      const { currency } = req.query
      console.log(currency, '<<<<<<<<<<, currency')

      const ExchangeClass = ccxt.binance

      const platform = new ExchangeClass({
        apiKey:
          'BxQ1hfNdSmOhqwDNo9eomtCd08zIuvRiHLooQbC0hCuAlMm3vsIX9RrPVfeOnwlA',
        secret:
          '5Hm0XHro7DiriCK7rVHyCeHD9g8DEtg5RxnXJXi1grRS9ETbDhxfTRvfOjUt1zN4'
      })

      const symbol = `${currency.toUpperCase()}USDT`

      await platform.loadMarkets()
      const price = await platform.publicGetAvgPrice({
        symbol
      })

      return price
    }
  )

  next()
}
