import ccxt from 'ccxt'

export default (fastify, opts, next) => {
  fastify.get(
    '/currencies',
    {
      schema: {
        response: {
          200: {
            type: 'array'
          }
        }
      }
    },
    async (req, res) => {
      const ExchangeClass = ccxt.binance
      const platform = new ExchangeClass({
        apiKey:
          'BxQ1hfNdSmOhqwDNo9eomtCd08zIuvRiHLooQbC0hCuAlMm3vsIX9RrPVfeOnwlA',
        secret:
          '5Hm0XHro7DiriCK7rVHyCeHD9g8DEtg5RxnXJXi1grRS9ETbDhxfTRvfOjUt1zN4'
      })

      const all = await platform.fetchCurrencies()

      const _currencies = Object.values(all).filter(
        (currency) => !currency.info.isLegalMoney
      )
      // const currencies = [safaricoin, ..._currencies]

      return _currencies
    }
  )

  next()
}
