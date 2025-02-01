import {
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberWithError,
  type CountryCode,
} from 'libphonenumber-js'
import getUnicodeFlagIcon from 'country-flag-icons/unicode'
import zod from 'zod'

type CountryInfo = {
  code: CountryCode
  prefix: string
  icon: string
}

const getCountryInfoMap = () => {
  const countries = getCountries()
  const countryCodeInfoMap = new Map<string, CountryInfo>()

  for (let i = 0; i < countries.length; i++) {
    const countryInfo = {
      code: countries[i],
      prefix: '',
      icon: '',
    }

    const callingCode = getCountryCallingCode(countries[i])
    if (!callingCode) {
      continue
    }
    countryInfo.prefix = callingCode

    const flag = getUnicodeFlagIcon(countries[i])
    if (flag) {
      countryInfo.icon = flag
    }

    countryCodeInfoMap.set(countries[i], countryInfo)
  }
  return countryCodeInfoMap
}

const checkPhone = (phone: string, info: CountryInfo) => {
  try {
    const phoneNumber = parsePhoneNumberWithError(phone, {
      defaultCountry: info.code as CountryCode,
    })
    const valid = phoneNumber?.isValid()
    return valid
  } catch {
    return false
  }
}

const getZodPhoneCheck = (allowEmpty?: boolean) => {
  return zod
    .string()
    .optional()
    .refine(
      (phone) => {
        const countryCode = getCountryCode(phone, 'US')
        const number = getPhoneNumber(phone)
        if (allowEmpty && (number == '' || number == undefined)) {
          return true
        }

        let valid = false
        try {
          const phoneNumber = parsePhoneNumberWithError(number, {
            defaultCountry: countryCode as CountryCode,
          })
          valid = phoneNumber?.isValid()
        } catch {
          valid = false
        }
        return valid
      },
      {
        message: 'Проверьте номер телефона',
      },
    )
}

function withoutPrefix(input: string) {
  const match = input.match(/^\d*([A-Z]+\d+)$/)
  if (match) {
    return match[1]
  }
  return null // Return null if the input doesn't match the expected pattern
}

const getPhoneNumber = (v: string | undefined) => {
  if (!v) {
    return ''
  }
  const wP = withoutPrefix(v)
  if (!wP) {
    return ''
  }
  if (!firstTwoAreLetters(wP)) {
    return ''
  }
  return wP.slice(2)
}

function firstTwoAreLetters(str: string) {
  // Check if the string has at least two characters
  if (str.length < 2) return false

  // Use regex to check if the first two characters are letters
  return /^[a-zA-Z]{2}/.test(str)
}

const getCountryCode = (v: string | undefined, defaultCountry: CountryCode) => {
  if (!v) {
    return defaultCountry
  }
  const wP = withoutPrefix(v)
  if (!wP) {
    return defaultCountry
  }
  return wP.slice(0, 2)
}

export {
  getCountryInfoMap,
  checkPhone,
  getZodPhoneCheck,
  withoutPrefix,
  getPhoneNumber,
  getCountryCode,
  type CountryInfo,
}
