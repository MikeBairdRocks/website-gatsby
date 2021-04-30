module.exports = {
  darkMode: 'class',
  purge: [
    './src/**/*.ts',
    './src/!**/!*.tsx'
  ],
  theme: {
    fontFamily: {
      sans: [
        'Rubik',
        'system-ui',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        '"Noto Sans"',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
        '"Noto Color Emoji"',
      ],
      serif: ['Georgia', 'Cambria', '"Times New Roman"', 'Times', 'serif'],
      mono: ['Menlo', 'Monaco', 'Consolas', '"Liberation Mono"', '"Courier New"', 'monospace']
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.900'),
            a: {
              color: theme('colors.blue.700'),
              '&:hover': {
                color: theme('colors.blue.700'),
              },
            },
            h1: {color: theme('colors.black')},
            h2: {color: theme('colors.black')},
            h3: {color: theme('colors.black')},
            h4: {color: theme('colors.black')},
            h5: {color: theme('colors.black')},
            h6: {color: theme('colors.black')},
            blockquote: {
              borderLeftColor: theme('colors.indigo.800'),
              color: theme('colors.gray.500'),
            },
    /*        ul: {
              listStyle: 'disc inside none'
            }*/
          }
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            a: {
              color: theme('colors.indigo.400'),
              '&:hover': {
                color: theme('colors.indigo.500')
              },
            },
            h1: {color: theme('colors.gray.100')},
            h2: {color: theme('colors.gray.100')},
            h3: {color: theme('colors.gray.100')},
            h4: {color: theme('colors.gray.100')},
            h5: {color: theme('colors.gray.100')},
            h6: {color: theme('colors.gray.100')},
            strong: {color: theme('colors.gray.300')},
            code: {color: theme('colors.gray.300')},
            blockquote: {
              borderLeftColor: theme('colors.indigo.800'),
              color: theme('colors.gray.500')
            },
            figcaption: {
              color: theme('colors.gray.500')
            },
            ul: {
              listStyle: 'none'
            },
          }
        }
      }),
    },
  },
  variants: {
    extend: {
      typography: ['dark']
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ]
}