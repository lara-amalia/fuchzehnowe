const { override } = require('customize-cra')
const { addReactRefresh } = require('customize-cra-react-refresh')

module.exports = override(
  ...[
    process.env.NODE_ENV === 'development'
      ? [addReactRefresh({ disableRefreshCheck: true })]
      : [],
  ],
)
