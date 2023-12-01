const path = require('path')

const resolvePath = (p) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      '@constants': resolvePath('./src/constants'),
      '@components': resolvePath('./src/components'),
      '@assets': resolvePath('./src/assets'),
      '@services': resolvePath('./src/services'),
      '@pages': resolvePath('./src/pages'),
      '@api': resolvePath('./src/API'),
      '@hooks': resolvePath('./src/hooks'),
      '@utils': resolvePath('./src/utils'),
    },
  },
}
